/**
 * Backend API Server
 * Node.js/Express server for managing SQLite database and serving API endpoints
 * Deploy this on your VPS
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, initializeDatabase, logActivity, getTimestamp } from './src/lib/db';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import type {
  Page,
  Opportunity,
  Partner,
  ContactSubmission,
  SiteSettings,
  AdminUser,
  APIResponse,
  PaginatedResponse,
} from './src/types';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper function to properly log errors
function logError(context: string, error: unknown) {
  if (error instanceof Error) {
    console.error(`${context}:`, error.message, error.stack);
  } else {
    console.error(`${context}:`, String(error));
  }
}

// Setup file upload directory
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Initialize database on startup
initializeDatabase();

// ============ AUTHENTICATION MIDDLEWARE ============

interface AuthRequest extends Request {
  user?: AdminUser;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(decoded.id) as AdminUser;
    if (!user || !user.active) {
      return res.status(401).json({ success: false, error: 'User not found or inactive' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// Super admin only middleware
const superAdminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Super admin access required' });
    }
    next();
  });
};

// ============ AUTH ENDPOINTS ============

app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, role = 'editor' } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    // Check if user exists
    const existing = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userId = uuidv4();
    const now = getTimestamp();
    db.prepare(`
      INSERT INTO admin_users (id, email, password_hash, role, active, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?)
    `).run(userId, email, passwordHash, role, now, now);

    // Generate token
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, data: { id: userId, email, role, token } });
  } catch (error) {
    logError('Registration error', error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email) as AdminUser;

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    if (!user.active) {
      return res.status(401).json({ success: false, error: 'User account inactive' });
    }

    // Update last login
    db.prepare('UPDATE admin_users SET last_login = ? WHERE id = ?').run(getTimestamp(), user.id);

    // Generate token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// ============ PAGES ENDPOINTS ============

app.get('/api/pages', (req: Request, res: Response) => {
  try {
    const published = req.query.published === 'true' ? 1 : undefined;
    const query = published !== undefined
      ? 'SELECT * FROM pages WHERE published = ? ORDER BY created_at DESC'
      : 'SELECT * FROM pages ORDER BY created_at DESC';

    const pages = db.prepare(query).all(...(published !== undefined ? [published] : [])) as Page[];

    res.json({ success: true, data: pages });
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pages' });
  }
});

app.get('/api/pages/:slug', (req: Request, res: Response) => {
  try {
    const page = db.prepare('SELECT * FROM pages WHERE slug = ?').get(req.params.slug) as Page;

    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found' });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch page' });
  }
});

app.post('/api/admin/pages', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { slug, title, content, meta_description, og_title, og_image } = req.body;

    if (!slug || !title || !content) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const id = uuidv4();
    const now = getTimestamp();

    db.prepare(`
      INSERT INTO pages (id, slug, title, content, meta_description, og_title, og_image, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, slug, title, content, meta_description, og_title, og_image, now, now);

    logActivity(req.user!.id, 'create', 'page', id);

    const page = db.prepare('SELECT * FROM pages WHERE id = ?').get(id) as Page;
    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ success: false, error: 'Failed to create page' });
  }
});

app.get('/api/admin/pages', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const pages = db.prepare('SELECT * FROM pages ORDER BY created_at DESC').all() as Page[];
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error('Error fetching admin pages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pages' });
  }
});

app.put('/api/admin/pages/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { slug, title, content, meta_description, og_title, og_image, published } = req.body;
    const now = getTimestamp();

    db.prepare(`
      UPDATE pages
      SET slug = COALESCE(?, slug),
          title = COALESCE(?, title),
          content = COALESCE(?, content),
          meta_description = COALESCE(?, meta_description),
          og_title = COALESCE(?, og_title),
          og_image = COALESCE(?, og_image),
          published = COALESCE(?, published),
          updated_at = ?
      WHERE id = ?
    `).run(slug, title, content, meta_description, og_title, og_image, published, now, req.params.id);

    logActivity(req.user!.id, 'update', 'page', req.params.id);

    const page = db.prepare('SELECT * FROM pages WHERE id = ?').get(req.params.id) as Page;
    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ success: false, error: 'Failed to update page' });
  }
});

app.delete('/api/admin/pages/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM pages WHERE id = ?').run(req.params.id);
    logActivity(req.user!.id, 'delete', 'page', req.params.id);
    res.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ success: false, error: 'Failed to delete page' });
  }
});

// ============ OPPORTUNITIES ENDPOINTS ============

app.get('/api/opportunities', (req: Request, res: Response) => {
  try {
    const published = req.query.published === 'true' ? 1 : undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM opportunities';
    const params: unknown[] = [];

    if (published !== undefined) {
      query += ' WHERE published = ?';
      params.push(published);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const opportunities = db.prepare(query).all(...params) as Opportunity[];

    const countQuery = published !== undefined
      ? 'SELECT COUNT(*) as total FROM opportunities WHERE published = ?'
      : 'SELECT COUNT(*) as total FROM opportunities';
    const countParams = published !== undefined ? [published] : [];
    const { total } = db.prepare(countQuery).get(...countParams) as { total: number };

    res.json({
      success: true,
      data: opportunities,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch opportunities' });
  }
});

app.get('/api/opportunities/featured', (req: Request, res: Response) => {
  try {
    const opportunities = db.prepare(
      'SELECT * FROM opportunities WHERE featured = 1 AND published = 1 ORDER BY created_at DESC LIMIT 3'
    ).all() as Opportunity[];

    res.json({ success: true, data: opportunities });
  } catch (error) {
    console.error('Error fetching featured opportunities:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch featured opportunities' });
  }
});

app.get('/api/opportunities/:slug', (req: Request, res: Response) => {
  try {
    const opportunity = db.prepare('SELECT * FROM opportunities WHERE slug = ?').get(
      req.params.slug
    ) as Opportunity;

    if (!opportunity) {
      return res.status(404).json({ success: false, error: 'Opportunity not found' });
    }

    res.json({ success: true, data: opportunity });
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch opportunity' });
  }
});

app.post('/api/admin/opportunities', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { title, slug, description, sector, province, min_investment, max_investment, highlights, featured, image_url } = req.body;

    if (!title || !slug || !description || !sector || !province) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const id = uuidv4();
    const now = getTimestamp();

    db.prepare(`
      INSERT INTO opportunities (id, title, slug, description, sector, province, min_investment, max_investment, highlights, featured, published, image_url, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
    `).run(id, title, slug, description, sector, province, min_investment, max_investment, JSON.stringify(highlights || []), featured ? 1 : 0, image_url, now, now);

    logActivity(req.user!.id, 'create', 'opportunity', id);

    const opportunity = db.prepare('SELECT * FROM opportunities WHERE id = ?').get(id) as Opportunity;
    res.json({ success: true, data: opportunity });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    res.status(500).json({ success: false, error: 'Failed to create opportunity' });
  }
});

app.put('/api/admin/opportunities/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { title, slug, description, sector, province, min_investment, max_investment, highlights, featured, published, image_url } = req.body;
    const now = getTimestamp();

    db.prepare(`
      UPDATE opportunities
      SET title = COALESCE(?, title),
          slug = COALESCE(?, slug),
          description = COALESCE(?, description),
          sector = COALESCE(?, sector),
          province = COALESCE(?, province),
          min_investment = COALESCE(?, min_investment),
          max_investment = COALESCE(?, max_investment),
          highlights = COALESCE(?, highlights),
          featured = COALESCE(?, featured),
          published = COALESCE(?, published),
          image_url = COALESCE(?, image_url),
          updated_at = ?
      WHERE id = ?
    `).run(title, slug, description, sector, province, min_investment, max_investment, highlights ? JSON.stringify(highlights) : null, featured !== undefined ? (featured ? 1 : 0) : null, published !== undefined ? (published ? 1 : 0) : null, image_url, now, req.params.id);

    logActivity(req.user!.id, 'update', 'opportunity', req.params.id);

    const opportunity = db.prepare('SELECT * FROM opportunities WHERE id = ?').get(req.params.id) as Opportunity;
    res.json({ success: true, data: opportunity });
  } catch (error) {
    console.error('Error updating opportunity:', error);
    res.status(500).json({ success: false, error: 'Failed to update opportunity' });
  }
});

app.delete('/api/admin/opportunities/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM opportunities WHERE id = ?').run(req.params.id);
    logActivity(req.user!.id, 'delete', 'opportunity', req.params.id);
    res.json({ success: true, message: 'Opportunity deleted' });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    res.status(500).json({ success: false, error: 'Failed to delete opportunity' });
  }
});

// ============ CONTACT SUBMISSIONS ENDPOINTS ============

app.post('/api/submissions', (req: Request, res: Response) => {
  try {
    const { name, email, phone, inquiry_type, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const id = uuidv4();
    const now = getTimestamp();

    db.prepare(`
      INSERT INTO contact_submissions (id, name, email, phone, inquiry_type, message, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?)
    `).run(id, name, email, phone || null, inquiry_type || 'general', message, now, now);

    const submission = db.prepare('SELECT * FROM contact_submissions WHERE id = ?').get(id) as ContactSubmission;

    res.json({ success: true, data: submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ success: false, error: 'Failed to create submission' });
  }
});

app.get('/api/admin/submissions', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;

    let query = 'SELECT * FROM contact_submissions';
    const params: unknown[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const submissions = db.prepare(query).all(...params) as ContactSubmission[];

    const countQuery = status
      ? 'SELECT COUNT(*) as total FROM contact_submissions WHERE status = ?'
      : 'SELECT COUNT(*) as total FROM contact_submissions';
    const countParams = status ? [status] : [];
    const { total } = db.prepare(countQuery).get(...countParams) as { total: number };

    res.json({
      success: true,
      data: submissions,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch submissions' });
  }
});

app.put('/api/admin/submissions/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const now = getTimestamp();

    db.prepare('UPDATE contact_submissions SET status = ?, updated_at = ? WHERE id = ?').run(status, now, req.params.id);

    logActivity(req.user!.id, 'update', 'submission', req.params.id);

    const submission = db.prepare('SELECT * FROM contact_submissions WHERE id = ?').get(req.params.id) as ContactSubmission;
    res.json({ success: true, data: submission });
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ success: false, error: 'Failed to update submission' });
  }
});

app.delete('/api/admin/submissions/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM contact_submissions WHERE id = ?').run(req.params.id);
    logActivity(req.user!.id, 'delete', 'submission', req.params.id);
    res.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ success: false, error: 'Failed to delete submission' });
  }
});

// ============ SETTINGS ENDPOINTS ============

app.get('/api/settings', (req: Request, res: Response) => {
  try {
    const settings = db.prepare('SELECT * FROM site_settings ORDER BY updated_at DESC LIMIT 1').get() as SiteSettings;

    if (!settings) {
      return res.status(404).json({ success: false, error: 'Settings not configured' });
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch settings' });
  }
});

// ============ ADMIN USER MANAGEMENT ENDPOINTS ============

app.get('/api/admin/users', superAdminMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const users = db.prepare(`
      SELECT id, email, role, active, last_login, created_at, updated_at
      FROM admin_users
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset) as Omit<AdminUser, 'password_hash'>[];

    const { total } = db.prepare('SELECT COUNT(*) as total FROM admin_users').get() as { total: number };

    res.json({
      success: true,
      data: users,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

app.post('/api/admin/users', superAdminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, role = 'editor' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    const existing = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const now = getTimestamp();

    db.prepare(`
      INSERT INTO admin_users (id, email, password_hash, role, active, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?)
    `).run(userId, email, passwordHash, role, now, now);

    logActivity(req.user!.id, 'create', 'admin_user', userId);

    res.json({ success: true, data: { id: userId, email, role, active: true } });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
});

app.put('/api/admin/users/:id', superAdminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { role, active, password } = req.body;
    const now = getTimestamp();

    let query = 'UPDATE admin_users SET updated_at = ?';
    const params: unknown[] = [now];

    if (role !== undefined) {
      query += ', role = ?';
      params.push(role);
    }

    if (active !== undefined) {
      query += ', active = ?';
      params.push(active ? 1 : 0);
    }

    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      query += ', password_hash = ?';
      params.push(passwordHash);
    }

    query += ' WHERE id = ?';
    params.push(req.params.id);

    db.prepare(query).run(...params);

    logActivity(req.user!.id, 'update', 'admin_user', req.params.id);

    const user = db.prepare('SELECT id, email, role, active, last_login, created_at, updated_at FROM admin_users WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating admin user:', error);
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
});

app.delete('/api/admin/users/:id', superAdminMiddleware, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM admin_users WHERE id = ?').run(req.params.id);
    logActivity(req.user!.id, 'delete', 'admin_user', req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
});

// ============ FILE UPLOAD ENDPOINTS ============

app.post('/api/admin/files', authMiddleware, upload.single('file'), (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    const fileId = uuidv4();
    const now = getTimestamp();
    const fileUrl = `/uploads/${req.file.filename}`;

    db.prepare(`
      INSERT INTO file_assets (id, name, url, file_type, file_size, uploaded_by, uploaded_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(fileId, req.file.originalname, fileUrl, req.file.mimetype, req.file.size, req.user!.id, now);

    logActivity(req.user!.id, 'create', 'file', fileId);

    res.json({ success: true, data: { id: fileId, name: req.file.originalname, url: fileUrl, size: req.file.size } });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, error: 'Failed to upload file' });
  }
});

app.get('/api/admin/files', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const files = db.prepare(`
      SELECT id, name, url, file_type, file_size, uploaded_by, uploaded_at
      FROM file_assets
      ORDER BY uploaded_at DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);

    const { total } = db.prepare('SELECT COUNT(*) as total FROM file_assets').get() as { total: number };

    res.json({
      success: true,
      data: files,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch files' });
  }
});

app.delete('/api/admin/files/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const file = db.prepare('SELECT * FROM file_assets WHERE id = ?').get(req.params.id) as any;

    if (!file) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    // Delete physical file
    const filePath = path.join(uploadsDir, path.basename(file.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    db.prepare('DELETE FROM file_assets WHERE id = ?').run(req.params.id);
    logActivity(req.user!.id, 'delete', 'file', req.params.id);

    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ success: false, error: 'Failed to delete file' });
  }
});

// ============ ACTIVITY LOG ENDPOINTS ============

app.get('/api/admin/activity', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const logs = db.prepare(`
      SELECT * FROM activity_logs
      ORDER BY timestamp DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);

    const { total } = db.prepare('SELECT COUNT(*) as total FROM activity_logs').get() as { total: number };

    res.json({
      success: true,
      data: logs,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch activity logs' });
  }
});

// ============ SEO ENDPOINTS ============

app.get('/api/seo/:slug', (req: Request, res: Response) => {
  try {
    const seo = db.prepare('SELECT * FROM seo_metadata WHERE page_slug = ?').get(req.params.slug);

    if (!seo) {
      return res.status(404).json({ success: false, error: 'SEO metadata not found' });
    }

    res.json({ success: true, data: seo });
  } catch (error) {
    console.error('Error fetching SEO:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch SEO metadata' });
  }
});

app.put('/api/admin/seo/:slug', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { title, description, keywords, og_image, og_title, og_description, canonical_url } = req.body;
    const now = getTimestamp();

    const existing = db.prepare('SELECT id FROM seo_metadata WHERE page_slug = ?').get(req.params.slug) as any;

    if (existing) {
      db.prepare(`
        UPDATE seo_metadata
        SET title = COALESCE(?, title),
            description = COALESCE(?, description),
            keywords = COALESCE(?, keywords),
            og_image = COALESCE(?, og_image),
            og_title = COALESCE(?, og_title),
            og_description = COALESCE(?, og_description),
            canonical_url = COALESCE(?, canonical_url),
            updated_at = ?
        WHERE page_slug = ?
      `).run(title, description, keywords, og_image, og_title, og_description, canonical_url, now, req.params.slug);
    } else {
      const id = uuidv4();
      db.prepare(`
        INSERT INTO seo_metadata (id, page_slug, title, description, keywords, og_image, og_title, og_description, canonical_url, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, req.params.slug, title, description, keywords, og_image, og_title, og_description, canonical_url, now);
    }

    logActivity(req.user!.id, 'update', 'seo', req.params.slug);

    const seo = db.prepare('SELECT * FROM seo_metadata WHERE page_slug = ?').get(req.params.slug);
    res.json({ success: true, data: seo });
  } catch (error) {
    console.error('Error updating SEO:', error);
    res.status(500).json({ success: false, error: 'Failed to update SEO metadata' });
  }
});

// ============ CANADIAN INVESTORS ENDPOINTS ============

app.get('/api/canadian-investors', (req: Request, res: Response) => {
  try {
    const entries = db.prepare(`
      SELECT * FROM canadian_investors_entries
      ORDER BY display_order ASC, created_at DESC
    `).all();

    res.json({ success: true, data: entries });
  } catch (error) {
    console.error('Error fetching canadian investors:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch canadian investors' });
  }
});

app.post('/api/admin/canadian-investors', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { title, slug, description, asset_types, attachments, display_order } = req.body;

    if (!title || !slug || !description) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const id = uuidv4();
    const now = getTimestamp();

    db.prepare(`
      INSERT INTO canadian_investors_entries (id, title, slug, description, asset_types, attachments, display_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, title, slug, description, JSON.stringify(asset_types || []), JSON.stringify(attachments || []), display_order || 0, now, now);

    logActivity(req.user!.id, 'create', 'canadian_investor', id);

    const entry = db.prepare('SELECT * FROM canadian_investors_entries WHERE id = ?').get(id);
    res.json({ success: true, data: entry });
  } catch (error) {
    console.error('Error creating canadian investor entry:', error);
    res.status(500).json({ success: false, error: 'Failed to create entry' });
  }
});

app.put('/api/admin/canadian-investors/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { title, slug, description, asset_types, attachments, display_order } = req.body;
    const now = getTimestamp();

    db.prepare(`
      UPDATE canadian_investors_entries
      SET title = COALESCE(?, title),
          slug = COALESCE(?, slug),
          description = COALESCE(?, description),
          asset_types = COALESCE(?, asset_types),
          attachments = COALESCE(?, attachments),
          display_order = COALESCE(?, display_order),
          updated_at = ?
      WHERE id = ?
    `).run(title, slug, description, asset_types ? JSON.stringify(asset_types) : null, attachments ? JSON.stringify(attachments) : null, display_order, now, req.params.id);

    logActivity(req.user!.id, 'update', 'canadian_investor', req.params.id);

    const entry = db.prepare('SELECT * FROM canadian_investors_entries WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: entry });
  } catch (error) {
    console.error('Error updating canadian investor entry:', error);
    res.status(500).json({ success: false, error: 'Failed to update entry' });
  }
});

app.delete('/api/admin/canadian-investors/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM canadian_investors_entries WHERE id = ?').run(req.params.id);
    logActivity(req.user!.id, 'delete', 'canadian_investor', req.params.id);
    res.json({ success: true, message: 'Entry deleted' });
  } catch (error) {
    console.error('Error deleting canadian investor entry:', error);
    res.status(500).json({ success: false, error: 'Failed to delete entry' });
  }
});

// ============ INTERNATIONAL INVESTORS ENDPOINTS ============

app.get('/api/international-investors', (req: Request, res: Response) => {
  try {
    const tracks = db.prepare(`
      SELECT * FROM international_investors_tracks
      ORDER BY display_order ASC, created_at DESC
    `).all();

    res.json({ success: true, data: tracks });
  } catch (error) {
    console.error('Error fetching international investors:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch international investors' });
  }
});

app.post('/api/admin/international-investors', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { name, slug, description, countries, attachments, display_order } = req.body;

    if (!name || !slug || !description) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const id = uuidv4();
    const now = getTimestamp();

    db.prepare(`
      INSERT INTO international_investors_tracks (id, name, slug, description, countries, attachments, display_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, slug, description, JSON.stringify(countries || []), JSON.stringify(attachments || []), display_order || 0, now, now);

    logActivity(req.user!.id, 'create', 'international_track', id);

    const track = db.prepare('SELECT * FROM international_investors_tracks WHERE id = ?').get(id);
    res.json({ success: true, data: track });
  } catch (error) {
    console.error('Error creating international investor track:', error);
    res.status(500).json({ success: false, error: 'Failed to create track' });
  }
});

app.put('/api/admin/international-investors/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { name, slug, description, countries, attachments, display_order } = req.body;
    const now = getTimestamp();

    db.prepare(`
      UPDATE international_investors_tracks
      SET name = COALESCE(?, name),
          slug = COALESCE(?, slug),
          description = COALESCE(?, description),
          countries = COALESCE(?, countries),
          attachments = COALESCE(?, attachments),
          display_order = COALESCE(?, display_order),
          updated_at = ?
      WHERE id = ?
    `).run(name, slug, description, countries ? JSON.stringify(countries) : null, attachments ? JSON.stringify(attachments) : null, display_order, now, req.params.id);

    logActivity(req.user!.id, 'update', 'international_track', req.params.id);

    const track = db.prepare('SELECT * FROM international_investors_tracks WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: track });
  } catch (error) {
    console.error('Error updating international investor track:', error);
    res.status(500).json({ success: false, error: 'Failed to update track' });
  }
});

app.delete('/api/admin/international-investors/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM international_investors_tracks WHERE id = ?').run(req.params.id);
    logActivity(req.user!.id, 'delete', 'international_track', req.params.id);
    res.json({ success: true, message: 'Track deleted' });
  } catch (error) {
    console.error('Error deleting international investor track:', error);
    res.status(500).json({ success: false, error: 'Failed to delete track' });
  }
});

// ============ SERVICES ENDPOINTS ============

app.get('/api/services', (req: Request, res: Response) => {
  try {
    const audience = req.query.audience as string;
    let query = 'SELECT * FROM services_entries';
    const params: unknown[] = [];

    if (audience && audience !== 'all') {
      query += ' WHERE audience = ? OR audience = ?';
      params.push(audience, 'both');
    }

    query += ' ORDER BY display_order ASC, created_at DESC';

    const services = db.prepare(query).all(...params);

    res.json({ success: true, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch services' });
  }
});

app.post('/api/admin/services', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { title, slug, description, details, audience, attachments, display_order } = req.body;

    if (!title || !slug || !description) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const id = uuidv4();
    const now = getTimestamp();

    db.prepare(`
      INSERT INTO services_entries (id, title, slug, description, details, audience, attachments, display_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, title, slug, description, details, audience || 'both', JSON.stringify(attachments || []), display_order || 0, now, now);

    logActivity(req.user!.id, 'create', 'service', id);

    const service = db.prepare('SELECT * FROM services_entries WHERE id = ?').get(id);
    res.json({ success: true, data: service });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ success: false, error: 'Failed to create service' });
  }
});

app.put('/api/admin/services/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { title, slug, description, details, audience, attachments, display_order } = req.body;
    const now = getTimestamp();

    db.prepare(`
      UPDATE services_entries
      SET title = COALESCE(?, title),
          slug = COALESCE(?, slug),
          description = COALESCE(?, description),
          details = COALESCE(?, details),
          audience = COALESCE(?, audience),
          attachments = COALESCE(?, attachments),
          display_order = COALESCE(?, display_order),
          updated_at = ?
      WHERE id = ?
    `).run(title, slug, description, details, audience, attachments ? JSON.stringify(attachments) : null, display_order, now, req.params.id);

    logActivity(req.user!.id, 'update', 'service', req.params.id);

    const service = db.prepare('SELECT * FROM services_entries WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: service });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, error: 'Failed to update service' });
  }
});

app.delete('/api/admin/services/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM services_entries WHERE id = ?').run(req.params.id);
    logActivity(req.user!.id, 'delete', 'service', req.params.id);
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, error: 'Failed to delete service' });
  }
});

// ============ HEALTH CHECK ============

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
});

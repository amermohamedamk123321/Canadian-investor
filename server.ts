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

// Middleware
app.use(cors());
app.use(express.json());

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
    console.error('Registration error:', error);
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

// ============ HEALTH CHECK ============

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
});

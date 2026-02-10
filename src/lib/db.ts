/**
 * SQLite Database Setup and Schema
 * Initializes the database with all required tables
 */

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

// Initialize database file
const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'app.db');

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

/**
 * Initialize all database tables
 */
export function initializeDatabase() {
  // Pages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      meta_description TEXT,
      og_title TEXT,
      og_image TEXT,
      published INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Opportunities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS opportunities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      sector TEXT NOT NULL,
      province TEXT NOT NULL,
      min_investment REAL NOT NULL,
      max_investment REAL NOT NULL,
      highlights TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 0,
      image_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Partners table
  db.exec(`
    CREATE TABLE IF NOT EXISTS partners (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      logo_url TEXT,
      website_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Contact Submissions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      inquiry_type TEXT NOT NULL DEFAULT 'general',
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Site Settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY,
      site_name TEXT NOT NULL,
      contact_email TEXT NOT NULL,
      contact_phone TEXT,
      company_address TEXT,
      company_tagline TEXT,
      social_links TEXT,
      updated_at TEXT NOT NULL
    );
  `);

  // SEO Metadata table
  db.exec(`
    CREATE TABLE IF NOT EXISTS seo_metadata (
      id TEXT PRIMARY KEY,
      page_id TEXT,
      page_slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      keywords TEXT,
      og_image TEXT,
      og_title TEXT,
      og_description TEXT,
      canonical_url TEXT,
      updated_at TEXT NOT NULL
    );
  `);

  // Files/Assets table
  db.exec(`
    CREATE TABLE IF NOT EXISTS file_assets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER,
      uploaded_by TEXT,
      uploaded_at TEXT NOT NULL
    );
  `);

  // Activity Log table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      changes TEXT,
      timestamp TEXT NOT NULL
    );
  `);

  // Admin Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      active INTEGER DEFAULT 1,
      last_login TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Canadian Investors Entries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS canadian_investors_entries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      asset_types TEXT,
      attachments TEXT,
      display_order INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // International Investors Tracks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS international_investors_tracks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      countries TEXT,
      attachments TEXT,
      display_order INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Services Entries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS services_entries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      details TEXT,
      audience TEXT DEFAULT 'both',
      attachments TEXT,
      display_order INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Create indexes for better query performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
    CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(published);
    CREATE INDEX IF NOT EXISTS idx_opportunities_slug ON opportunities(slug);
    CREATE INDEX IF NOT EXISTS idx_opportunities_sector ON opportunities(sector);
    CREATE INDEX IF NOT EXISTS idx_opportunities_province ON opportunities(province);
    CREATE INDEX IF NOT EXISTS idx_opportunities_featured ON opportunities(featured);
    CREATE INDEX IF NOT EXISTS idx_opportunities_published ON opportunities(published);
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
    CREATE INDEX IF NOT EXISTS idx_seo_metadata_page_slug ON seo_metadata(page_slug);
    CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
    CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
    CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);
    CREATE INDEX IF NOT EXISTS idx_canadian_investors_slug ON canadian_investors_entries(slug);
    CREATE INDEX IF NOT EXISTS idx_canadian_investors_order ON canadian_investors_entries(display_order);
    CREATE INDEX IF NOT EXISTS idx_international_investors_slug ON international_investors_tracks(slug);
    CREATE INDEX IF NOT EXISTS idx_international_investors_order ON international_investors_tracks(display_order);
    CREATE INDEX IF NOT EXISTS idx_services_slug ON services_entries(slug);
    CREATE INDEX IF NOT EXISTS idx_services_audience ON services_entries(audience);
    CREATE INDEX IF NOT EXISTS idx_services_order ON services_entries(display_order);
  `);

  // Seed default pages if they don't exist
  seedDefaultPages();

  console.log('✅ Database initialized successfully');
}

/**
 * Seed default pages into the database
 */
function seedDefaultPages() {
  const pages = [
    {
      slug: 'home',
      title: 'Home',
      content: '<h1>Welcome to Alpha Partners Investment</h1><p>This is the homepage. Content is managed via the admin dashboard.</p>',
      meta_description: 'Alpha Partners Investment - Investment Opportunities for Canadian and International Investors',
      og_title: 'Alpha Partners Investment',
    },
    {
      slug: 'about',
      title: 'About Us',
      content: '<h1>About Alpha Partners</h1><p>Our company profile and mission. Content is managed via the admin dashboard.</p>',
      meta_description: 'Learn about Alpha Partners Investment - Our mission and approach',
      og_title: 'About Alpha Partners Investment',
    },
    {
      slug: 'canadian-investors',
      title: 'Canadian Investors',
      content: '<h1>Investment Opportunities for Canadian Investors</h1><p>Explore investment opportunities tailored for Canadian investors. Dynamic content managed via admin dashboard.</p>',
      meta_description: 'Investment opportunities for Canadian investors',
      og_title: 'Canadian Investors - Alpha Partners',
    },
    {
      slug: 'international-investors',
      title: 'International Investors',
      content: '<h1>International Investment Opportunities</h1><p>Discover investment tracks designed for international investors. Dynamic content managed via admin dashboard.</p>',
      meta_description: 'International investment opportunities and tracks',
      og_title: 'International Investors - Alpha Partners',
    },
    {
      slug: 'investment-opportunities',
      title: 'Investment Opportunities',
      content: '<h1>Our Investment Opportunities</h1><p>Browse our curated selection of investment opportunities. Manage opportunities via the admin dashboard.</p>',
      meta_description: 'Browse investment opportunities with Alpha Partners',
      og_title: 'Investment Opportunities - Alpha Partners',
    },
    {
      slug: 'services',
      title: 'Services',
      content: '<h1>Our Services</h1><p>Advisory and coordination services for investors. Manage services via the admin dashboard.</p>',
      meta_description: 'Investment advisory and coordination services',
      og_title: 'Services - Alpha Partners',
    },
    {
      slug: 'contact',
      title: 'Contact Us',
      content: '<h1>Contact Alpha Partners</h1><p>Get in touch with our team. Use the contact form to submit inquiries.</p>',
      meta_description: 'Contact Alpha Partners Investment - Reach out to our team',
      og_title: 'Contact - Alpha Partners',
    },
    {
      slug: 'how-it-works',
      title: 'How It Works',
      content: '<h1>How Alpha Partners Works</h1><p>Learn about our investment process and how we connect investors with opportunities.</p>',
      meta_description: 'How Alpha Partners Investment Works',
      og_title: 'How It Works - Alpha Partners',
    },
    {
      slug: 'network',
      title: 'Our Network',
      content: '<h1>Our Network</h1><p>Discover our network of partners and advisors.</p>',
      meta_description: 'Alpha Partners Network',
      og_title: 'Network - Alpha Partners',
    },
    {
      slug: 'privacy',
      title: 'Privacy & Legal',
      content: '<h1>Privacy Policy & Legal</h1><p>Our privacy policy and legal information.</p>',
      meta_description: 'Privacy Policy - Alpha Partners Investment',
      og_title: 'Privacy Policy - Alpha Partners',
    },
  ];

  try {
    pages.forEach((page) => {
      const existing = db.prepare('SELECT id FROM pages WHERE slug = ?').get(page.slug);
      if (!existing) {
        const id = uuidv4();
        const now = getTimestamp();
        db.prepare(`
          INSERT INTO pages (id, slug, title, content, meta_description, og_title, og_image, published, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
        `).run(id, page.slug, page.title, page.content, page.meta_description, page.og_title, null, now, now);
      }
    });
  } catch (error) {
    console.error('Error seeding default pages:', error);
  }
}

/**
 * Close database connection
 */
export function closeDatabase() {
  db.close();
  console.log('✅ Database connection closed');
}

/**
 * Helper function to log activity
 */
export function logActivity(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  changes?: Record<string, unknown>
) {
  const stmt = db.prepare(`
    INSERT INTO activity_logs (id, user_id, action, entity_type, entity_id, changes, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    stmt.run(
      uuidv4(),
      userId,
      action,
      entityType,
      entityId,
      changes ? JSON.stringify(changes) : null,
      new Date().toISOString()
    );
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

/**
 * Helper function to get timestamp
 */
export function getTimestamp(): string {
  return new Date().toISOString();
}

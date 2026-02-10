/**
 * SQLite Database Setup and Schema
 * Initializes the database with all required tables
 */

import Database from 'better-sqlite3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Initialize database file
const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'app.db');
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

  console.log('✅ Database initialized successfully');
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

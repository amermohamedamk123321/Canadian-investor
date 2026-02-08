/**
 * Database Entity Types
 * These types define the structure of all entities in the SQLite database
 */

// Pages Table - Static pages content
export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string; // Rich text HTML content
  meta_description: string;
  og_title: string;
  og_image: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Opportunities Table - Investment opportunities
export interface Opportunity {
  id: string;
  title: string;
  slug: string;
  description: string; // Rich text HTML
  sector: string;
  province: string;
  min_investment: number;
  max_investment: number;
  highlights: string; // JSON stringified array of highlights
  featured: boolean;
  published: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Partners/Network Table
export interface Partner {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

// Contact Submissions Table
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiry_type: 'investment' | 'partnership' | 'general' | 'other';
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
}

// Site Settings Table - Global config
export interface SiteSettings {
  id: string;
  site_name: string;
  contact_email: string;
  contact_phone: string;
  company_address: string;
  company_tagline: string;
  social_links: string; // JSON stringified object
  updated_at: string;
}

// SEO Metadata Table
export interface SEOMetadata {
  id: string;
  page_id: string; // References Pages.id
  page_slug: string;
  title: string;
  description: string;
  keywords: string; // Comma-separated
  og_image: string;
  og_title: string;
  og_description: string;
  canonical_url: string;
  updated_at: string;
}

// Files/Assets Table
export interface FileAsset {
  id: string;
  name: string;
  url: string;
  file_type: string; // 'image', 'pdf', 'document', etc.
  file_size: number; // in bytes
  uploaded_by: string; // user id
  uploaded_at: string;
}

// Activity Log Table - Audit trail
export interface ActivityLog {
  id: string;
  user_id: string;
  action: string; // 'create', 'update', 'delete', 'publish', etc.
  entity_type: string; // 'page', 'opportunity', 'partner', etc.
  entity_id: string;
  changes: string; // JSON stringified object
  timestamp: string;
}

// Admin User Table
export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'editor';
  active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Form Input Types
export interface CreateOpportunityInput {
  title: string;
  slug: string;
  description: string;
  sector: string;
  province: string;
  min_investment: number;
  max_investment: number;
  highlights: string[];
  featured?: boolean;
  image_url?: string;
}

export interface CreatePageInput {
  slug: string;
  title: string;
  content: string;
  meta_description: string;
  og_title: string;
  og_image?: string;
}

export interface CreateContactSubmissionInput {
  name: string;
  email: string;
  phone: string;
  inquiry_type: 'investment' | 'partnership' | 'general' | 'other';
  message: string;
}

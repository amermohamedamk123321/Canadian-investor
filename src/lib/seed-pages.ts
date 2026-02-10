/**
 * Database Seeding Script
 * Initializes the database with 7 primary pages
 * Run this ONCE after initial database setup
 */

import { db, getTimestamp } from './db';
import { v4 as uuidv4 } from 'uuid';

export function seedPages() {
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
  ];

  pages.forEach((page) => {
    try {
      // Check if page already exists
      const existing = db.prepare('SELECT id FROM pages WHERE slug = ?').get(page.slug);

      if (!existing) {
        const id = uuidv4();
        const now = getTimestamp();

        db.prepare(`
          INSERT INTO pages (id, slug, title, content, meta_description, og_title, og_image, published, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
        `).run(id, page.slug, page.title, page.content, page.meta_description, page.og_title, null, now, now);

        console.log(`✅ Created page: ${page.slug}`);
      } else {
        console.log(`⏭️  Page already exists: ${page.slug}`);
      }
    } catch (error) {
      console.error(`❌ Error creating page ${page.slug}:`, error);
    }
  });

  console.log('✅ Page seeding complete');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPages();
}

# Admin Dashboard User Guide - Alpha Partners Investment

**Version**: 1.0  
**Last Updated**: February 2026  
**Audience**: Admin Users & Super Admins

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Pages](#managing-pages)
4. [Managing Investment Opportunities](#managing-opportunities)
5. [Managing Dynamic Content](#managing-dynamic-content)
6. [Managing Contact Submissions](#managing-submissions)
7. [Managing Admin Users (Super Admin)](#managing-users)
8. [Managing Security PDF](#managing-security-pdf)
9. [Viewing Activity Logs](#viewing-activity)
10. [SEO Management](#seo-management)
11. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing the Admin Dashboard

1. Navigate to: `http://yoursite.com/admin/login`
2. Enter your email address and password
3. Click **Login**
4. You'll be redirected to the **Admin Dashboard**

### First Time Setup

**Super Admin Only:**
- Create additional admin user accounts from **Admin Users** section
- Assign roles: Super Admin or Editor
- Super Admins have full control; Editors manage content only

---

## Dashboard Overview

The admin dashboard contains the following main sections (visible in the left sidebar):

| Section | Purpose | Access Level |
|---------|---------|---|
| **Dashboard** | Overview & quick stats | All |
| **Pages** | Edit page content (Home, About, Services, etc.) | All |
| **Opportunities** | Create/edit investment opportunities | All |
| **Canadian Investors** | Manage province-based investment entries | All |
| **International** | Manage international investment tracks | All |
| **Services** | Manage service offerings | All |
| **Security PDF** | Upload & manage security guidelines PDF | All |
| **Submissions** | View & manage contact form submissions | All |
| **Admin Users** | Create/edit/delete admin accounts | Super Admin Only |
| **Activity Log** | View audit trail of all changes | All |
| **Settings** | Site configuration & metadata | All |

---

## Managing Pages

### Overview
The **Pages** section lets you edit content for static pages like Home, About, Services, etc.

### How to Edit a Page

**Step 1: Open Pages**
- Click **Pages** in the left sidebar

**Step 2: Select Page**
- A list of pages appears on the left
- Click the page you want to edit (e.g., "About Us")

**Step 3: Edit Content**
- Enter the **Page Title**
- Add **Page Content** using HTML tags:
  - `<h1>`, `<h2>`, `<h3>` for headings
  - `<p>` for paragraphs
  - `<ul>`, `<li>` for lists
  - `<strong>` for bold, `<em>` for italic

**Step 4: Add SEO Info** (Optional)
- Click the **SEO** tab
- Fill in:
  - **Meta Description** (appears in Google search results)
  - **OG Title** (title for social media sharing)
  - **OG Image URL** (image for social media preview)

**Step 5: Save**
- Click **Save Changes** button

### Example HTML Content
```html
<h1>Investment Opportunities</h1>

<h2>Why Invest in Canada?</h2>
<p>Canada offers stable growth, strong regulations, and diverse sectors.</p>

<ul>
  <li>Real Estate Development</li>
  <li>Technology Startups</li>
  <li>Resource Extraction</li>
</ul>
```

---

## Managing Opportunities

### Overview
The **Opportunities** section lets you create and manage investment opportunities displayed on the public site.

### How to Create an Opportunity

**Step 1: Open Opportunities**
- Click **Opportunities** in the left sidebar

**Step 2: Click "Create Opportunity"**
- A form dialog appears

**Step 3: Fill in Details**
- **Title**: Name of the opportunity (e.g., "Downtown Toronto Office Complex")
- **Slug**: URL-friendly name (e.g., "toronto-office-complex") - use lowercase, hyphens
- **Description**: Short summary (2-3 sentences)
- **Sector**: Type of investment (e.g., Real Estate, Technology, etc.)
- **Province**: Where it's located
- **Min/Max Investment**: Price range in dollars
- **Highlights**: Key selling points (comma-separated)
- **Featured**: Toggle to show on homepage
- **Image URL**: Link to property/project photo

**Step 4: Save**
- Click **Create Opportunity**
- The opportunity appears in the list

### How to Edit an Opportunity
1. Click the **Edit** (pencil) icon next to the opportunity
2. Update fields as needed
3. Click **Update Opportunity**

### How to Delete an Opportunity
1. Click the **Delete** (trash) icon
2. Confirm deletion
3. The opportunity is removed from the site

### Managing Displays
- **Featured**: Up to 3 featured opportunities show on the homepage
- **Order**: Use the up/down arrows to reorder in the list

---

## Managing Dynamic Content

### Canadian Investors Section

#### How to Add a Province Entry

**Step 1: Navigate**
- Click **Canadian Investors** in the sidebar

**Step 2: Click "Add Province"**
- A form appears

**Step 3: Fill In Details**
- **Province Name**: e.g., "Ontario"
- **Slug**: e.g., "ontario"
- **Description**: Key investment info for this province
- **Asset Types**: (optional) Residential, Commercial, Land, etc.

**Step 4: Save**
- Click **Create Entry**

**Tip**: Use the up/down arrow buttons to reorder provinces. The top province appears first on the public page.

---

### International Investors Section

#### How to Add an Investment Track

**Step 1: Navigate**
- Click **International** in the sidebar

**Step 2: Click "Add Track"**

**Step 3: Fill In Details**
- **Track Name**: e.g., "Commercial Real Estate"
- **Slug**: e.g., "commercial-realestate"
- **Description**: What this track offers
- **Countries**: e.g., "USA, UK, Germany" (comma-separated)

**Step 4: Save**
- Click **Create Track**

---

### Services Section

#### How to Add a Service

**Step 1: Navigate**
- Click **Services** in the sidebar

**Step 2: Click "Add Service"**

**Step 3: Fill In Details**
- **Service Title**: e.g., "Legal Advisory"
- **Slug**: e.g., "legal-advisory"
- **Short Description**: 1-2 sentence summary
- **Detailed Description**: Full explanation (can include HTML)
- **Audience**: Who this service is for
  - Both (Canadian & International)
  - Canadian Investors Only
  - International Investors Only

**Step 4: Save**
- Click **Create Service**

---

## Managing Submissions

### Overview
The **Submissions** section shows all contact form inquiries from the public site.

### How to View Submissions

**Step 1: Open Submissions**
- Click **Submissions** in the sidebar

**Step 2: View List**
- All submissions appear in a table
- Newest submissions are at the top

### Filtering Submissions
- **Status**: Filter by "New", "Contacted", or "Closed"
- **Search**: Search by name or email

### How to Update a Submission Status

**Step 1: Find the submission**

**Step 2: Click the submission row**
- A detail view opens (or use a status dropdown in the table)

**Step 3: Change Status**
- Click the status dropdown
- Select: New → Contacted → Closed

**Step 4: Save**

### How to Delete a Submission
1. Click the **Delete** icon
2. Confirm deletion
3. The submission is permanently removed

---

## Managing Users (Super Admin Only)

### Overview
Only Super Admins can manage other admin users.

### How to Create a New Admin User

**Step 1: Open Admin Users**
- Click **Admin Users** in the sidebar

**Step 2: Click "Create User"**
- A form appears

**Step 3: Fill In Details**
- **Email**: User's email address
- **Password**: Strong password (share securely with user)
- **Role**: 
  - Super Admin: Full control, can manage users
  - Editor: Can manage content only

**Step 4: Save**
- Click **Create User**

### How to Edit a User

**Step 1: Find the user** in the list

**Step 2: Click the **Edit** (pencil) icon**

**Step 3: Make Changes**
- Change role or toggle active status
- Optionally set a new password (leave blank to keep current)

**Step 4: Save**

### How to Deactivate a User
1. Click **Edit** next to the user
2. Toggle **Status** to "Inactive"
3. Click **Update User**
- The user can no longer log in

### How to Delete a User
1. Click the **Delete** (trash) icon
2. Confirm deletion
3. The user account is permanently removed

---

## Managing Security PDF

### Overview
The **Security PDF** section manages the downloadable security guidelines document shown on the homepage.

### How to Upload a New PDF

**Method 1: Drag & Drop**
1. Click **Security PDF** in the sidebar
2. Drag a PDF file onto the upload area
3. The file uploads automatically

**Method 2: Click to Select**
1. Click inside the upload box
2. Select a PDF from your computer
3. Click Open

### After Upload
- The new PDF appears in the "Current PDF" section on the right
- It immediately becomes available for download on the homepage
- Previous versions are kept in "Version History"

### How to Download the Current PDF
1. Click **Download** button in the "Current PDF" card
2. The file downloads to your computer

### How to Delete a PDF
1. Find the PDF in the list
2. Click **Delete**
3. Confirm deletion
4. The PDF is removed (cannot be undone)

### Adding a Summary
1. Fill in the "Short Summary" text area
2. This text appears on the homepage alongside the download button
3. Click **Save Summary**

---

## Viewing Activity Logs

### Overview
The **Activity Log** section shows a history of all changes made by admin users (audit trail).

### How to View Activity

**Step 1: Open Activity Log**
- Click **Activity Log** in the sidebar

**Step 2: View Recent Actions**
- A table shows recent changes
- Most recent first
- Displays: Date, User, Action (Create/Update/Delete), Entity Type, Details

### Using Activity Logs for Compliance
- View who made changes and when
- Track all content updates
- Ensure accountability

---

## SEO Management

### Overview
SEO (Search Engine Optimization) fields help your pages rank better in Google.

### Key SEO Fields
- **Meta Title**: What appears in browser tab (50-60 characters)
- **Meta Description**: What appears in search results (150-160 characters)
- **OG Image**: Preview image for social media
- **Canonical URL**: Preferred URL for the page

### Best Practices
- **Meta Title**: Include main keyword, be descriptive
  - ✅ Good: "Investment Opportunities | Alpha Partners"
  - ❌ Bad: "Page" or "Home"

- **Meta Description**: Call to action, mention benefits
  - ✅ Good: "Explore vetted investment opportunities with Alpha Partners. Connecting investors with Canadian businesses."
  - ❌ Bad: "This is a page"

- **OG Image**: High quality, clear, relevant image
  - Use 1200x630px JPG/PNG images
  - Include company branding

---

## Troubleshooting

### I forgot my password
- Contact your Super Admin to reset it
- Super Admins can reset from the Admin Users page

### Changes aren't showing on the website
- Click **Refresh** button to reload data
- Wait 5-10 seconds for browser cache to update
- Clear browser cache (Ctrl+Shift+Delete on Windows, Cmd+Shift+Delete on Mac)

### Upload failed error
- Check file format (must be PDF for security PDF)
- Verify file size is under 50MB
- Ensure filename has no special characters

### I don't have permission to access something
- This is a role restriction
- Ask your Super Admin for higher permissions
- Editors can only manage content, not users

### Page content not displaying correctly
- Check HTML syntax in page content
- Common issues:
  - Missing closing tags: `</p>`, `</div>`
  - Unclosed quotes: `<a href="link">` vs `<a href=link>`
  - Invalid tags: Only use standard HTML tags

### Performance is slow
- Wait for server response
- Try refreshing the page
- Contact support if issues persist

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Move between fields |
| `Enter` | Submit form |
| `Escape` | Close dialog |

---

## Security Best Practices

1. **Never share your password** - Each user has unique login
2. **Log out when done** - Click Logout button before closing
3. **Use strong passwords** - Mix of letters, numbers, symbols
4. **Report suspicious activity** - Alert your Super Admin
5. **Don't store sensitive info** in descriptions

---

## Support

For technical support:
- Check the **Activity Log** to see what changed
- Review this guide for step-by-step instructions
- Contact your system administrator

---

**Questions?** Refer to the Quick Start Card or contact your Super Admin.

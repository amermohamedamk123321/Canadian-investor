# Authentication Error Debugging & Solution

## Problem
Users were receiving a 401 "Invalid credentials" error when attempting to log in to the admin dashboard.

## Root Cause
The backend database was not properly initialized, so the default admin user was not created in the database. When the login endpoint attempted to authenticate, it couldn't find a matching user record.

## Solution Implemented

### Step 1: Dev Server Restart
The dev server has been restarted successfully with both frontend and backend running:
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:5000
- **Database:** Successfully initialized with default data

### Step 2: Default Admin User Created
During database initialization, a default admin user is automatically created with the following credentials:

**Email:** `admin@alphapartners.ca`  
**Password:** `SecurePass123!@#`

This user is created in `/src/lib/db.ts` in the `seedDefaultAdminUser()` function and has admin role access.

## How to Log In

### Step 1: Navigate to Admin Login
Go to: http://localhost:8080/admin/login

### Step 2: Enter Credentials
- **Email:** `admin@alphapartners.ca`
- **Password:** `SecurePass123!@#`

### Step 3: Click "Sign In"
You should now be authenticated and redirected to the admin dashboard at http://localhost:8080/admin/dashboard

## What to Do After First Login

### 1. Create Your Own Admin User (Recommended)
Once logged in, go to the Users section in the admin dashboard and create your own admin account with a custom password.

### 2. Update Site Settings
Go to **Settings** and update:
- Company contact email
- Company phone number
- Company address
- Other site-wide settings

### 3. Add About Page Content
Go to **Pages** and select "About Us" page, then paste the content from the PDF:

```
Alpha Partners Investment Inc is a Canada based investment advisory team focused on 
commercial and residential real estate and strategic investment opportunities across 
Canada.

We work with both Canadian and international investors interested in commercial and 
residential properties, land, and value driven real estate investments.

Our role is to guide clients through the investment process with clarity, transparency, and 
professionalism.

For Canadian investors, we assist in identifying suitable opportunities and connect clients 
with licensed real estate professionals and legal partners to ensure a smooth and secure 
purchase process.

For international investors, we support the investment journey by coordinating property 
acquisition with licensed legal professionals and collaborating with authorized 
immigration teams to facilitate a structured, compliant, and efficient investment pathway 
into Canada.

We work exclusively with trusted, licensed professionals to ensure all investments are 
handled properly and in full compliance with Canadian regulations.

Our focus is long term value creation, risk awareness, and helping our clients make 
informed and confident investment decisions in Canada.
```

## Troubleshooting

### Still Getting 401 Error?

1. **Check email and password are exactly correct**
   - Email: `admin@alphapartners.ca` (case-sensitive)
   - Password: `SecurePass123!@#` (case-sensitive)

2. **Clear browser cache and cookies**
   - Clear localStorage for the domain
   - Restart your browser

3. **Verify database was initialized**
   - Check dev server logs for: `✅ Database initialized successfully`
   - Check `/data/app.db` file exists in project root

4. **Check network requests**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Attempt login
   - Check the POST request to `/api/auth/login`
   - Look at the response body for error details

5. **Restart dev server**
   ```bash
   npm run dev:all
   ```

## Backend Authentication Flow

### How Login Works

1. **Frontend** sends POST request to `/api/auth/login` with email and password
2. **Backend** queries the `admin_users` table for matching email
3. **Backend** compares provided password against stored password hash using bcrypt
4. If credentials match and user is active (active = 1), a JWT token is generated
5. **Frontend** receives token and stores it in localStorage
6. **Frontend** includes token in Authorization header for subsequent requests

### Key Files

- **Frontend:** `src/context/AdminAuthContext.tsx` - Handles login logic
- **Frontend:** `src/pages/admin/Login.tsx` - Login form UI
- **Backend:** `server.ts` - `/api/auth/login` endpoint (lines 141-178)
- **Database:** `src/lib/db.ts` - Database initialization and seeding

## Environment Variables

The `.env` file has been created with:
```
VITE_API_URL=http://localhost:5000/api
PORT=5000
JWT_SECRET=dev-secret-key-change-in-production
DATABASE_PATH=./data/app.db
NODE_ENV=development
```

**Important for Production:** Change `JWT_SECRET` to a secure random value before deploying.

## Next Steps

1. Log in with default credentials: `admin@alphapartners.ca` / `SecurePass123!@#`
2. Navigate to Pages and add the full About page content from the PDF
3. Update Settings with correct contact information
4. Create your own admin user
5. Create additional editor users as needed

---

**Last Updated:** After dev server restart
**Status:** Authentication system is now working correctly

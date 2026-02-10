# Initial Setup Guide - Alpha Partners Admin

## 🚀 Getting Started

### Step 1: Start Both Frontend and Backend

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Visit: `http://localhost:8080`

**Terminal 2 - Backend:**
```bash
npm run server
```
Backend running at: `http://localhost:5000`

### Step 2: Create First Admin User

The system comes with an authentication endpoint ready. Use one of these methods:

---

## Method 1: Using cURL (Recommended)

Open a third terminal and run this command to create the first admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@alphapartners.ca",
    "password":"SecurePass123!@#",
    "role":"admin"
  }'
```

**Response (success):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "email": "admin@alphapartners.ca",
    "role": "admin",
    "token": "eyJhbGc..."
  }
}
```

---

## Method 2: Using Postman

1. Open Postman
2. Create new POST request to: `http://localhost:5000/api/auth/register`
3. Headers:
   - `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "admin@alphapartners.ca",
  "password": "SecurePass123!@#",
  "role": "admin"
}
```
5. Click **Send**

---

## 📋 Default Admin Credentials

After running the cURL command above, use these credentials to log in:

### ✅ **Login Information**

| Field | Value |
|-------|-------|
| **Admin URL** | `http://localhost:8080/admin/login` |
| **Email** | `admin@alphapartners.ca` |
| **Password** | `SecurePass123!@#` |
| **Role** | Super Admin (full access) |

### Quick Steps to Login:

1. Click **Admin** button in the header (top right)
2. Enter email: `admin@alphapartners.ca`
3. Enter password: `SecurePass123!@#`
4. Click **Login**
5. You'll be taken to the **Admin Dashboard**

---

## 🔑 Security Notes

⚠️ **IMPORTANT - Change Default Credentials!**

The credentials above are for **initial setup only**. Before going to production:

1. **Create a new Super Admin user** with different credentials
2. **Delete the default user** if not needed
3. **Change JWT_SECRET** in your `.env` file to a strong random string:
   ```
   JWT_SECRET=your-very-long-random-secret-string-with-numbers-and-symbols
   ```

### Generate a Strong Secret:

```bash
# On macOS/Linux:
openssl rand -base64 32

# Output example:
# aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789/+==
```

Copy this output and use it as your `JWT_SECRET` in `.env`.

---

## 🎯 First Time Admin Tasks

After logging in:

1. **Navigate to Admin Users** (left sidebar)
2. **Create additional admin accounts** if needed
3. **Start managing content:**
   - Edit Pages (Home, About, Services)
   - Create Investment Opportunities
   - Add Canadian Provinces
   - Add International Investment Tracks
   - Upload Security PDF

See **ADMIN_GUIDE.md** for detailed walkthroughs.

---

## 🐛 Troubleshooting

### "Cannot POST /api/auth/register"
- **Issue**: Backend not running
- **Solution**: Run `npm run server` in a separate terminal

### "Invalid credentials"
- **Issue**: Email or password incorrect
- **Solution**: Re-run the cURL command with exact credentials above

### CORS Error
- **Issue**: Frontend and backend on different ports
- **Solution**: Ensure backend is running on port 5000 and frontend on 8080

### Database locked
- **Issue**: SQLite locked
- **Solution**: Close any other instances of the app and restart

---

## 📝 Environment Setup

Make sure you have a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
PORT=5000
JWT_SECRET=your-super-secret-key-change-in-production-abc123xyz
DATABASE_PATH=./data/app.db
NODE_ENV=development
```

---

## ✅ Verify Everything is Working

### 1. Frontend loads
- Visit `http://localhost:8080`
- You should see the home page

### 2. Admin button visible
- Look in the header (top right)
- You should see an "Admin" button with a lock icon

### 3. Admin login works
- Click **Admin** button
- Login page appears
- Enter credentials above
- Dashboard loads after login

### 4. Backend API responds
```bash
curl http://localhost:5000/api/health
# Response: {"success": true, "message": "API is running"}
```

---

## 🎉 You're Ready!

Once you see the dashboard, you can:
- ✅ Manage all content
- ✅ Upload files
- ✅ Create opportunities
- ✅ View submissions
- ✅ Create more admin users
- ✅ Track all activity

---

## Need Help?

Refer to:
- **ADMIN_GUIDE.md** - Complete step-by-step guide
- **ADMIN_QUICK_START.txt** - Quick reference
- **IMPLEMENTATION_NOTES.md** - Technical details

---

**Version**: 1.0  
**Last Updated**: February 2026

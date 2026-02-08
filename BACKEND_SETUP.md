# Backend Setup Guide

This guide explains how to set up and deploy the Node.js backend API on your VPS.

## Prerequisites

- Node.js 16+ installed on your VPS
- npm or yarn package manager
- SQLite3 (usually comes pre-installed on Linux)
- Basic understanding of terminal commands

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your settings:

```env
PORT=5000
NODE_ENV=development
DATABASE_PATH=./data/app.db
JWT_SECRET=your-super-secret-key-change-in-production
```

### 3. Run the Backend Server

```bash
npm run server
```

The API will be available at `http://localhost:5000/api`

### 4. Frontend Development Server

In another terminal, run:

```bash
npm run dev
```

## VPS Deployment

### 1. SSH into Your VPS

```bash
ssh username@your-vps-ip
```

### 2. Clone Your Repository

```bash
cd /var/www
git clone your-repo-url alpha-partners
cd alpha-partners
```

### 3. Install Dependencies

```bash
npm install
npm run build
```

### 4. Configure Environment Variables

Create `.env` file on your VPS:

```bash
nano .env
```

Set production values:

```env
PORT=5000
NODE_ENV=production
DATABASE_PATH=/var/www/alpha-partners/data/app.db
JWT_SECRET=your-production-secret-key-change-this
VITE_APP_API_URL=https://your-domain.com/api
```

### 5. Create Data Directory

```bash
mkdir -p data
chmod 755 data
```

### 6. Initialize Database

On first run, the database will be automatically created and initialized with the schema.

### 7. Create First Admin User

You can create the first admin user by sending a POST request to the registration endpoint:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "secure-password",
    "role": "admin"
  }'
```

Or use the Admin Dashboard UI at `/admin/login` if you have another way to access it.

### 8. Run with PM2 (Recommended for Production)

Install PM2 globally:

```bash
npm install -g pm2
```

Create an ecosystem config file `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'alpha-partners-api',
      script: './server.ts',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      instances: 'max',
      exec_mode: 'cluster',
      restart_delay: 4000,
      max_memory_restart: '1G',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
```

Start the application:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 9. Configure Nginx as Reverse Proxy

Create `/etc/nginx/sites-available/alpha-partners`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Frontend
    location / {
        root /var/www/alpha-partners/dist;
        try_files $uri $uri/ /index.html;
    }

    # API Backend
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Block admin paths from direct access (use reverse proxy)
    location /admin/ {
        proxy_pass http://localhost:3000/admin/;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/alpha-partners /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 10. Set Up SSL Certificate (Let's Encrypt)

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

### 11. Set Up Automated Backups

Create a backup script `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/alpha-partners"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

cp /var/www/alpha-partners/data/app.db $BACKUP_DIR/app.db.backup_$TIMESTAMP

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.backup_*" -mtime +7 -delete
```

Add to crontab:

```bash
0 2 * * * /var/www/alpha-partners/backup.sh
```

## Database Management

### View Database Schema

```bash
sqlite3 data/app.db ".schema"
```

### Backup Database

```bash
cp data/app.db data/app.db.backup
```

### Restore Database

```bash
cp data/app.db.backup data/app.db
```

### Reset Database (Development Only)

```bash
rm data/app.db
# Restart server - it will auto-initialize
```

## Monitoring & Logs

### View PM2 Logs

```bash
pm2 logs alpha-partners-api
pm2 monit
```

### View Application Logs

```bash
tail -f logs/out.log
tail -f logs/err.log
```

### Monitor Disk Usage

```bash
du -sh /var/www/alpha-partners
du -sh /var/www/alpha-partners/data
```

## Troubleshooting

### Port Already in Use

```bash
lsof -i :5000
kill -9 <PID>
```

### Database Locked Error

This usually means the server is still running. Kill the process and restart.

### CORS Issues

Make sure `VITE_APP_API_URL` is set correctly in the frontend `.env` file.

### API Not Responding

Check if the backend server is running:

```bash
curl http://localhost:5000/api/health
```

## Production Checklist

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure automated backups
- [ ] Set up monitoring/alerting
- [ ] Review security headers in Nginx
- [ ] Test database backups
- [ ] Document admin credentials securely
- [ ] Set up error logging (Sentry, etc.)
- [ ] Configure rate limiting

## Security Best Practices

1. **Environment Variables**: Never commit `.env` file to git
2. **Database**: Keep regular backups in a secure location
3. **JWT Secret**: Use a strong, random secret (32+ characters)
4. **HTTPS**: Always use SSL/TLS in production
5. **CORS**: Configure appropriately for your domain
6. **Rate Limiting**: Consider adding rate limiting to API endpoints
7. **Input Validation**: All inputs are validated with Zod
8. **SQL Injection**: Using parameterized queries prevents SQL injection
9. **Admin Panel**: Protected with JWT authentication
10. **Robots.txt**: Admin paths are blocked from search engines

## Support

For issues or questions, please refer to the main README.md or contact support.

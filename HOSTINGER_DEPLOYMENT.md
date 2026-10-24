# Hostinger Deployment Guide for Tide Physics Academy (Next.js)

Tide Physics Academy is built with Next.js 16 and configured with `output: 'standalone'`.

---

## What Files to Upload

The production-ready standalone application is located in:
```
.next/standalone/
```

When prepared (via `npm run build:standalone`), this directory contains **everything** needed:
1. `server.js` (The Node.js entry point)
2. `package.json`
3. `node_modules/` (Only the minimal bundled production dependencies)
4. `.next/` (Including pre-rendered pages, `.next/server/`, and `.next/static/`)
5. `public/` (Static assets like logos, images, icons)

> **No `npm install` needed on the server!** All required dependencies are already inside `node_modules`.

---

## Method 1: Hostinger Web / Cloud Hosting (hPanel Node.js Application)

If your Hostinger plan includes the **Node.js** feature in hPanel:

### Step 1: Prepare the Files Locally
Run in your terminal:
```bash
npm run build:standalone
```
This generates and populates `.next/standalone`.

### Step 2: Zip the Standalone Folder
1. Go into `.next/standalone/`.
2. Select all files and folders inside:
   - `server.js`
   - `package.json`
   - `node_modules`
   - `.next`
   - `public`
3. Right-click and compress to a zip file (e.g. `standalone.zip`).

### Step 3: Upload in Hostinger hPanel File Manager
1. Log in to your Hostinger hPanel.
2. Go to **Files** -> **File Manager** -> Open your website's folder (e.g. `public_html` or a dedicated app folder like `tide-web`).
3. Upload `standalone.zip` and **Extract** it directly into that directory.

### Step 4: Configure Node.js in Hostinger hPanel
1. In hPanel, search for **Node.js** (under Advanced or Applications).
2. Click **Create Application** (or Edit existing):
   - **Node.js version**: Select `20.x` or `18.x`
   - **Application root**: Select the folder where you extracted the files (e.g., `public_html`)
   - **Application startup file**: Enter `server.js`
   - **Environment variables** (Optional):
     - `PORT`: `3000` (or leave default assigned by Hostinger)
     - `NODE_ENV`: `production`
3. Click **Save** and then click **Start / Restart Application**.
4. Your website is now live!

---

## Method 2: Hostinger VPS (Ubuntu / Debian)

If you are using a **Hostinger VPS**:

### Step 1: Connect to your VPS
```bash
ssh root@your-vps-ip
```

### Step 2: Clone the Repository
```bash
cd /var/www
git clone https://github.com/Harish8334/tide-web.git
cd tide-web
```

### Step 3: Install & Build
```bash
npm install
npm run build:standalone
```

### Step 4: Run with PM2 Process Manager
```bash
# Install PM2 if not installed
npm install -g pm2

# Start the standalone server
pm2 start .next/standalone/server.js --name "tide-web" --env PORT=3000

# Save PM2 process list to start automatically on system reboot
pm2 save
pm2 startup
```

### Step 5: Configure Nginx (Reverse Proxy to Port 3000)
Add to your `/etc/nginx/sites-available/yourdomain.com`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Reload Nginx:
```bash
nginx -t && systemctl reload nginx
```
Enable free SSL with Certbot:
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

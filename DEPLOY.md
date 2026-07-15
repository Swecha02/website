# Deploying yourswecha.com to your Hostinger KVM 2 VPS

This replaces Supabase entirely with a self-hosted setup:
- **Postgres** for the database (5 tables + 1 admin_users table)
- **Node/Express API** (`backend/`) for forms, tracking, and the admin login
- **React static build** (`frontend/`) served by Nginx

Do this in order. Everything below assumes you're SSH'd into the fresh
Ubuntu VPS as a sudo-capable user.

---

## 1. Base packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx postgresql postgresql-contrib ufw curl git

# Node 22 (matches .nvmrc)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

npm install -g pm2

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 2. Create the Postgres database

```bash
sudo -u postgres psql
```
Inside the `psql` prompt:
```sql
CREATE DATABASE swecha_website;
CREATE USER swecha_app WITH ENCRYPTED PASSWORD 'pick-a-strong-password';
GRANT ALL PRIVILEGES ON DATABASE swecha_website TO swecha_app;
\q
```

Upload the `backend/` folder to the VPS (scp, git, or however you like), then:
```bash
cd backend
psql -U swecha_app -d swecha_website -h localhost -f schema.sql
```

## 3. Configure and start the backend API

```bash
cd backend
cp .env.example .env
nano .env
```
Fill in:
- `PGUSER` / `PGPASSWORD` / `PGDATABASE` — from step 2
- `JWT_SECRET` — generate with `openssl rand -base64 48`
- `SMTP_*` — your email provider's SMTP details (Hostinger email works fine)
- `CORS_ORIGIN` — set to `https://yourswecha.com` once DNS is pointed here

Install and create your admin login:
```bash
npm install
node scripts/hash-password.js "YourNewAdminPassword!"
```
This prints an `INSERT ... admin_users` SQL statement — copy it and run it:
```bash
psql -U swecha_app -d swecha_website -h localhost -c "INSERT INTO admin_users (email, password_hash) VALUES ('admin@swecha.com', 'PASTE_HASH_HERE');"
```

Start the API with PM2:
```bash
pm2 start server.js --name swecha-api
pm2 save
pm2 startup   # run the command it prints, once
```
The API now runs on `http://localhost:4000` (internal only — not exposed yet).

## 4. Build and deploy the frontend

```bash
cd ../frontend
cp .env.example .env
nano .env   # set VITE_API_URL=https://yourswecha.com (Nginx will route /api to the backend)
npm install
npm run build
```
This produces a `dist/` folder — that's your entire static site.

## 5. Nginx: one config, two jobs (static files + API proxy)

```bash
sudo nano /etc/nginx/sites-available/yourswecha.com
```
```nginx
server {
    listen 80;
    server_name yourswecha.com www.yourswecha.com;

    root /home/YOURUSER/frontend/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
Replace `YOURUSER` with your actual VPS username, then:
```bash
sudo ln -s /etc/nginx/sites-available/yourswecha.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 6. Point your domain and get SSL

In Hostinger's DNS panel, make sure `yourswecha.com` (and `www`) A-records
point at your VPS's IP. Once that's propagated:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourswecha.com -d www.yourswecha.com
```
Certbot edits the Nginx config for HTTPS and sets up auto-renewal.

## 7. Verify

- `https://yourswecha.com` loads the site
- Submit the contact form → check `psql` for a new row in `contact_submissions`, and check your inbox for the notification email
- `https://yourswecha.com/admin` → log in with the admin email/password you created in step 3
- Dashboard charts load without errors (open browser devtools → Network tab if anything looks empty)

---

## What changed from the original Horizons build

- `customSupabaseClient.js` and the unused `SupabaseAuthContext.jsx` are gone.
- `src/lib/api.js` is the new single point of contact with your backend.
- The admin login used to check a password shipped in the built JS bundle
  (visible to anyone via browser devtools) — it's now checked server-side
  with a bcrypt hash and a JWT, same as any real login system.
- The two Supabase Edge Functions (`send-contact-email`,
  `send-catalogue-notification`) are now one `mailer.js` helper called
  directly from the Express routes.

## Adding Physio Nudge alongside this later

Same VPS, same pattern: another folder, another PM2 process on its own
port, another `server_name` block in Nginx (or a subdomain), another
`certbot --nginx -d` call. Nothing about this setup needs to change to make
room for it — just say the word when you're ready and I'll walk through it.

# Hostinger VPS Setup — astroaniljoshi.tech

End result: `https://astroaniljoshi.tech` live, HTTPS auto-renewed, redeploy in one command.

---

## Step 1 — Buy the VPS on Hostinger

1. Log in to **hPanel → VPS → Buy**
2. Pick **KVM 1** (1 vCPU / 4 GB RAM — enough for Phase 1)
3. **OS template** → select **"Docker"** (Ubuntu 22.04 + Docker pre-installed)
4. Set a strong root password **or** add your SSH public key
5. Wait ~2 min → copy the **public IPv4** from the VPS panel

---

## Step 2 — Point your domain at the VPS

In **hPanel → Domains → astroaniljoshi.tech → DNS Zone**, add:

| Type | Name  | Value          | TTL |
|------|-------|----------------|-----|
| `A`  | `@`   | `YOUR_VPS_IP`  | 300 |
| `A`  | `www` | `YOUR_VPS_IP`  | 300 |

Verify propagation (wait up to 10 min, usually faster):
```bash
dig +short astroaniljoshi.tech
# should return your VPS IP
```

Caddy cannot get an SSL certificate until DNS resolves correctly.

---

## Step 3 — First SSH login & server setup

```bash
ssh root@YOUR_VPS_IP
```

### Create a non-root deploy user
```bash
adduser deploy
usermod -aG sudo,docker deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys
```

### Open the firewall
```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp    # HTTP/3
ufw enable
ufw status
```

Also confirm in **hPanel → VPS → Firewall** that 80 (TCP), 443 (TCP+UDP) are open.

### If Docker is NOT pre-installed
```bash
curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy
# log out and back in as deploy
```

From now on, SSH as `deploy@YOUR_VPS_IP`.

---

## Step 4 — Clone the repo on the VPS

```bash
ssh deploy@YOUR_VPS_IP
cd ~
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git anil-astro
cd anil-astro
```

> **Private repo?** Create a deploy key first:
> ```bash
> ssh-keygen -t ed25519 -f ~/.ssh/deploy_key -N ""
> cat ~/.ssh/deploy_key.pub   # paste into GitHub → Repo → Settings → Deploy keys
> ```
> Then clone with: `git clone git@github.com:YOU/REPO.git anil-astro`

---

## Step 5 — Create the .env file

```bash
cp .env.example .env
nano .env
```

Fill in the values:

```env
DOMAIN=astroaniljoshi.tech
ACME_EMAIL=hello@astroaniljoshi.tech   # your actual email for SSL renewal notices

NEXT_PUBLIC_SITE_URL=https://astroaniljoshi.tech
NEXT_PUBLIC_SITE_NAME=Anil Astro
NEXT_PUBLIC_CONTACT_EMAIL=hello@astroaniljoshi.tech
NEXT_PUBLIC_CONTACT_PHONE=+91 00000 00000   # update when you have a number

FLAG_SALT=anil_astro+1115
```

Save: `Ctrl+O → Enter → Ctrl+X`

---

## Step 6 — Build and launch

```bash
docker compose up -d --build
```

This will:
- Build the Next.js app inside Docker (~3–4 min first time, cached after)
- Start Caddy, which contacts Let's Encrypt and gets a TLS cert automatically
- Serve the site at `https://astroaniljoshi.tech`

Watch logs:
```bash
docker compose logs -f
```

Check the containers are healthy:
```bash
docker compose ps
# Both web and caddy should show "healthy" / "running"
```

---

## Step 7 — Verify the site is live

Open `https://astroaniljoshi.tech` in your browser.

Quick checklist:
- [ ] Site loads over HTTPS (green padlock)
- [ ] `https://astroaniljoshi.tech/sitemap.xml` returns XML
- [ ] `https://astroaniljoshi.tech/robots.txt` lists the sitemap URL
- [ ] `https://www.astroaniljoshi.tech` redirects to the apex domain

---

## Step 8 — Submit to Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property** → choose **Domain** type → enter `astroaniljoshi.tech`
3. Verify via **DNS TXT record** (Hostinger DNS Zone → add TXT record Google gives you)
4. Once verified → **Sitemaps** → add `https://astroaniljoshi.tech/sitemap.xml`
5. Request indexing on your homepage: **URL Inspection** → enter `/` → **Request Indexing**

---

## Redeploying after code changes

```bash
ssh deploy@YOUR_VPS_IP
cd ~/anil-astro
./deploy.sh
```

Or manually:
```bash
git pull
docker compose up -d --build web
docker compose logs -f web
```

---

## Enabling n8n (later — when you're ready)

1. Add to your `.env`:
   ```env
   N8N_BASIC_AUTH_USER=admin
   N8N_BASIC_AUTH_PASSWORD=your-strong-password
   ```
2. Add a DNS A record: `n8n` → `YOUR_VPS_IP`
3. Append to `Caddyfile`:
   ```
   n8n.astroaniljoshi.tech {
     reverse_proxy n8n:5678
   }
   ```
4. Start n8n:
   ```bash
   docker compose --profile automation up -d
   docker compose restart caddy
   ```
5. Access at `https://n8n.astroaniljoshi.tech`

---

## Useful commands

| Task | Command |
|------|---------|
| View all logs | `docker compose logs -f` |
| Restart web only | `docker compose restart web` |
| Shell into web container | `docker compose exec web sh` |
| Check disk usage | `docker system df` |
| Clean dangling images | `docker image prune -f` |
| Update base images | `docker compose pull && docker compose up -d` |
| Stop everything | `docker compose down` |

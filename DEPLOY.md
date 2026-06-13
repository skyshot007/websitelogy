# Deploying to Hostinger (VPS + Docker)

This guide ships the marketing site (Next.js 15, standalone output) to a **Hostinger VPS** behind **Caddy** with automatic HTTPS. End result: `https://yourdomain.com` serves the site, auto-renews certificates, and redeploys with a single `./deploy.sh`.

> **Why a VPS?** Hostinger's shared / cloud / premium plans don't run Docker. You need a **KVM VPS plan** (KVM 1 or higher — 1 vCPU / 4 GB RAM is plenty for Phase 1). All KVM tiers include full root + Docker.

---

## 0. What's in this repo for deployment

| File | Purpose |
| ---- | ------- |
| `Dockerfile` | Multi-stage build → small `node:20-alpine` runtime with Next.js standalone output |
| `.dockerignore` | Keeps the build context tiny (no `node_modules`, `.next`, `.git`, env files) |
| `docker-compose.yml` | Two services: `web` (the app) + `caddy` (reverse proxy). `db` + `minio` are scaffolded under the `selfhost` profile for Phase 1.5 |
| `Caddyfile` | Auto-HTTPS via Let's Encrypt, security headers, gzip/zstd, long-cache for static assets, SSE-friendly `flush_interval -1` |
| `.env.example` | Copy → `.env` on the VPS, fill values |
| `deploy.sh` | One-command redeploy on the VPS (git pull → rebuild → restart → logs) |
| `next.config.ts` | `output: 'standalone'` enables the slim Docker runtime |

---

## 1. Provision the Hostinger VPS

1. **hPanel → VPS → Buy** the **KVM 1** plan. It's the right size for Phase 1 (1 vCPU / 4 GB RAM / 50 GB NVMe; the Next.js build peaks around ~1.2 GB RAM, so you have headroom). You can resize up to KVM 2 later from hPanel with a short reboot if/when you turn on Phase 1.5 (Postgres + MinIO + chat).
2. **OS template** — pick **"Docker"** from the OS list. Even though it's labeled "Docker" and not "Ubuntu", **the underlying OS is Ubuntu 22.04 LTS** with Docker Engine + docker-compose pre-installed (confirm later with `cat /etc/os-release`). This saves you the manual Docker install. KVM 1 may not surface a separate plain-Ubuntu option — that's fine, the Docker template is what we want here. If you go KVM 2 or higher and prefer plain Ubuntu, the script below installs Docker for you.
3. Set a strong root password (or upload your SSH key — recommended).
4. Wait ~2 minutes. Copy the **public IPv4** from the VPS panel.

### First SSH in

```bash
ssh root@YOUR_VPS_IP
```

(Accept the host key.)

### Create a non-root deploy user (recommended)

```bash
adduser deploy
usermod -aG sudo,docker deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

From now on, SSH in as `deploy@YOUR_VPS_IP`.

### If Docker is *not* pre-installed

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker  # or log out and back in
docker --version
docker compose version
```

### Open the firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 443/udp   # HTTP/3
sudo ufw enable
```

Also confirm in the **Hostinger hPanel → VPS → Firewall** that ports 80, 443 (TCP) and 443 (UDP) are allowed.

---

## 2. Point your domain at the VPS

In your domain registrar (Hostinger Domains or otherwise) create:

| Type  | Name | Value                | TTL  |
| ----- | ---- | -------------------- | ---- |
| `A`   | `@`  | YOUR_VPS_IPv4        | 300  |
| `A`   | `www`| YOUR_VPS_IPv4        | 300  |
| `AAAA`| `@`  | YOUR_VPS_IPv6 *(if any)* | 300  |

Wait until `dig +short yourdomain.com` returns the VPS IP. Caddy won't be able to issue a certificate until DNS propagates.

---

## 3. Clone the repo

```bash
cd ~
git clone https://github.com/<you>/<this-repo>.git anil-astro
cd anil-astro
```

(If the repo is private: add a deploy key first — GitHub → Repo → Settings → Deploy keys.)

---

## 4. Configure environment

```bash
cp .env.example .env
nano .env
```

Set at minimum:

```env
DOMAIN=yourdomain.com
ACME_EMAIL=you@yourdomain.com
FLAG_SALT=anil_astro+1115     # leave default or rotate now (see below)
```

If you rotate `FLAG_SALT`, regenerate the hashes for any flags you want ON:

```bash
# locally (or anywhere with the repo + pnpm):
FLAG_SALT=<your-new-salt> pnpm flags:set marketing.testimonials true
FLAG_SALT=<your-new-salt> pnpm flags:set marketing.stats true
# ...etc. Commit & push. Then re-pull on the VPS.
```

Make `deploy.sh` executable:

```bash
chmod +x deploy.sh
```

---

## 5. First deploy

```bash
docker compose up -d --build
```

That:
- builds the Next.js standalone image (~150 MB),
- starts the `web` container on the internal Docker network,
- starts Caddy, which fetches a Let's Encrypt cert for `yourdomain.com` and `www.yourdomain.com`,
- exposes 80 and 443 on the host.

Watch the logs while certs issue (~30 s):

```bash
docker compose logs -f caddy
```

You should see lines like `certificate obtained successfully` and then `serving HTTPS`. Hit `https://yourdomain.com` — the site should load.

> **If cert issuance fails** with `no such host` or rate-limit messages: DNS hasn't propagated yet. Wait, then `docker compose restart caddy`. While debugging you can switch Caddy to Let's Encrypt **staging** by uncommenting the `acme_ca` line in `Caddyfile` (staging certs aren't trusted by browsers but won't burn your prod rate limit).

---

## 6. Subsequent deploys

Locally:

```bash
git add -A && git commit -m "..." && git push
```

On the VPS:

```bash
ssh deploy@YOUR_VPS_IP "cd ~/anil-astro && ./deploy.sh"
```

`deploy.sh` does: `git pull` → `docker compose pull` → `docker compose build web` → `docker compose up -d` → image prune → health-check wait → tail logs.

You can also call it from your laptop via the `pnpm deploy` script if you put the project on a shared SSH path (or wire it into a GitHub Action — see §10).

---

## 7. Useful day-to-day commands

```bash
# View live logs
docker compose logs -f web
docker compose logs -f caddy

# Restart just the web container after editing flags / env
docker compose up -d --build web

# See container status + health
docker compose ps

# Exec into the container (Alpine, so use sh)
docker exec -it anil-astro-web sh

# Free space (Docker can hoard build layers)
docker system df
docker system prune -f       # safe: removes dangling stuff only
docker builder prune -af     # aggressive: clears build cache
```

---

## 8. Updating Node / Next.js versions

The Node base image is pinned to `node:20-alpine` in the `Dockerfile`. Bump it there + bump `pnpm@11.1.2` to match `packageManager` in `package.json`, then redeploy.

---

## 9. Backups (Phase 1.5)

When you turn on the `selfhost` profile (Postgres + MinIO in Docker):

```bash
# Nightly Postgres dump (add to crontab on the VPS):
0 3 * * * cd /home/deploy/anil-astro && docker compose exec -T db \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > backups/pg_$(date +\%F).sql.gz
```

For Phase 1 (no DB yet) you only need to back up `.env` and `Caddyfile` — both are tiny and rebuild from the repo otherwise.

---

## 10. (Optional) GitHub Actions auto-deploy

Add this to `.github/workflows/deploy.yml` once you're ready:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: deploy
          key: ${{ secrets.VPS_SSH_KEY }}
          script: cd ~/anil-astro && ./deploy.sh
```

Add `VPS_HOST` and `VPS_SSH_KEY` as repo secrets.

---

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `502 Bad Gateway` after deploy | `web` container died / crash on boot | `docker compose logs --tail=200 web` — fix the error, rebuild |
| Caddy stuck obtaining cert | DNS not propagated / firewall closed | `dig +short yourdomain.com`; verify hPanel firewall has 80/443 open |
| `pnpm install` fails in build | Lockfile drift | Run `pnpm install` locally, commit `pnpm-lock.yaml`, redeploy |
| Site loads but flags don't toggle | Forgot to restart after editing `feature-flags.json` | `docker compose up -d --build web` |
| Build OOMs on a <2 GB VPS | Next compile peak (~1.2 GB) | KVM 1 (4 GB) is fine. If you somehow run on a smaller box: build locally with `docker build -t anil-astro/web:latest .`, push to GHCR, then `docker compose pull && up -d` on the VPS |
| Want HTTP/3 working | Make sure UDP/443 is open on both ufw and Hostinger panel firewall | done in §1 |

---

## 12. What ships in Phase 1 vs later

- **Now**: `web` + `caddy` only. Everything in the marketing site (home, about, services, contact, book form shell, blog stub, legal) renders. All Phase 1.5 features are flag-OFF.
- **Phase 1.5**: enable `--profile selfhost` to bring up Postgres + MinIO. Add Resend/Telegram/CRM env vars. Flip flags one at a time after testing each in staging.
- **Phase 2**: tools (kundli, panchang, etc), shop, payments — pre-scaffolded route folders, ungated when ready.

---

Once `https://yourdomain.com` loads, the deployment loop is just **edit → commit → push → `./deploy.sh`**. Average redeploy time on KVM 1 is ~60 s, of which ~45 s is the Next.js build.

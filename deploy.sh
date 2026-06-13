#!/usr/bin/env bash
# deploy.sh — one-command deploy on the VPS.
#
# Run from the project root after committing & pushing your changes:
#   ssh user@vps "cd ~/anil-astro && ./deploy.sh"
#
# Or as a pnpm script:
#   pnpm deploy
#
# It pulls the latest code, rebuilds the web image, restarts only what changed,
# and shows the tail of the logs so you can verify the new container is healthy.

set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -f .env ]]; then
  echo "Missing .env — copy .env.example to .env and fill values first." >&2
  exit 1
fi

echo "==> Pulling latest code"
if git rev-parse --abbrev-ref '@{u}' >/dev/null 2>&1; then
  git fetch --all --prune
  git reset --hard '@{u}'
else
  git pull --ff-only
fi

echo "==> Pulling base images"
docker compose pull --ignore-pull-failures || true

echo "==> Rebuilding web image"
docker compose build web

echo "==> Bringing the stack up"
docker compose up -d --remove-orphans

echo "==> Pruning dangling images"
docker image prune -f >/dev/null

echo "==> Waiting for web to become healthy"
for i in {1..30}; do
  status=$(docker inspect -f '{{.State.Health.Status}}' anil-astro-web 2>/dev/null || echo "starting")
  if [[ "$status" == "healthy" ]]; then
    echo "    web: healthy"
    break
  fi
  sleep 2
done

echo "==> Recent logs"
docker compose logs --tail=50 web

echo
echo "Deployed. Visit: https://$(grep -E '^DOMAIN=' .env | cut -d= -f2)"

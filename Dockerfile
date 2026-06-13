# syntax=docker/dockerfile:1.7

# ---------- Stage 1: deps -----------------------------------------------------
# Install full dependencies once. This layer is cached until lockfile changes.
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    CI=true \
    HUSKY=0

RUN corepack enable && corepack prepare pnpm@11.1.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

# ---------- Stage 2: builder --------------------------------------------------
# Build the Next.js app into the standalone output.
FROM node:22-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH

RUN corepack enable && corepack prepare pnpm@11.1.2 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args become baked-in NEXT_PUBLIC_* values at build time.
ARG FLAG_SALT
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_CONTACT_PHONE
ENV FLAG_SALT=${FLAG_SALT} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_SITE_NAME=${NEXT_PUBLIC_SITE_NAME} \
    NEXT_PUBLIC_CONTACT_EMAIL=${NEXT_PUBLIC_CONTACT_EMAIL} \
    NEXT_PUBLIC_CONTACT_PHONE=${NEXT_PUBLIC_CONTACT_PHONE}

RUN pnpm build

# ---------- Stage 3: runner ---------------------------------------------------
# Minimal runtime image — only the standalone server + static + public assets.
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone server bundle (includes the minimal node_modules it actually needs).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static chunks (CSS, JS, fonts) emitted by `next build`.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Anything you ship in /public (images, OG, robots, favicons).
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]

# Astrologer Premium Website

A premium, minimal, peace-evoking website for a Vedic astrologer. Built as a Phase 1 marketing site on Next.js 15, with the design system and architecture in place to bolt on Phase 1.5 backend modules (Postgres + Auth + in-app chat + Telegram-bot notifications + admin dashboard) and Phase 2 platform features (calculators, Panchang, shop, payments).

**Visual direction:** "Temple at twilight" — luxury wellness × sacred minimalism. Ivory + parchment surfaces, midnight-navy hero, soft-gold accents, Fraunces display serif with Inter body. No glitter, no purple gradients, no zodiac-wheel clichés.

---

## Stack

- **Next.js 15 / 16** (App Router, RSC, Turbopack), TypeScript strict
- **Tailwind CSS v4** with custom design tokens (`@theme` in `app/globals.css`)
- **shadcn-style primitives** (Button, Sheet, Accordion) over Radix UI
- **Framer Motion** + **Lenis** for motion (honors `prefers-reduced-motion`)
- **Lucide** icons + custom SVG glyphs in `components/brand/`
- **Fraunces** (display) + **Inter** (body) + **Tiro Devanagari Hindi** (Sanskrit) via `next/font`
- **Sonner** for toasts
- **React Hook Form + Zod** ready for forms

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve production build

pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm format       # prettier --write
```

---

## Feature flag system (developer-only, code-gated rollout)

Every gated feature in the site is controlled by `config/feature-flags.json`. There is **no UI** to toggle flags — that's intentional. You ship the code first, then enable features one at a time after testing.

### How values work

Each flag's value is `md5('<true|false>+<FLAG_SALT>')` in hex. Default salt is `anil_astro+1115`.

```
TRUE_HASH  = a48ccad200fcaffa0ca222468b556be3
FALSE_HASH = 36ede23c387aae466dc8d532ca88cfa4
```

Any value that doesn't match the TRUE_HASH for the current salt is treated as **disabled** — typos, tampering, and stale hashes all stay safely off.

The runtime check (`lib/flags.ts`) is `server-only` so flag values and hashes never reach the browser.

### CLI

```bash
pnpm flags:hash                          # print the TRUE_HASH and FALSE_HASH for the current salt
pnpm flags:init                          # (re)write every flag to FALSE_HASH (safe reset)
pnpm flags:list                          # show decoded ON/off state of every flag (dev only)
pnpm flags:set chat.widget true          # enable a flag
pnpm flags:set chat.widget false         # disable a flag
```

After flipping a flag you must restart the server (`pnpm dev` is auto, prod needs a redeploy). Next.js caches module imports — a flag flip without restart won't take effect.

### Salt override

For strict deployments where you don't want the default salt in source code:

```bash
# .env.local
FLAG_SALT=your-private-salt
```

Then run `pnpm flags:hash` and `pnpm flags:set <name> true` for each flag you want enabled. Old hashes silently become disabled.

### Optional env override (for tests)

`FLAG_OVERRIDE_chat_widget=true` forces a flag regardless of file content. Useful in CI / staging. Remove from prod environments.

### Where flags gate

- **UI sections** — `<FeatureGate flag="chat.widget"><ChatWidget /></FeatureGate>`
- **Routes** — `if (!getFlag('admin.dashboard')) notFound()` in the page or layout
- **API handlers** — `if (!getFlag('booking.create')) return new Response(...404)` at the top of the route

### Current flag taxonomy (33 flags)

```
marketing.blog, marketing.signIn, marketing.stickyBookButton,
marketing.stats, marketing.testimonials, marketing.languageToggle

auth.magicLink, auth.phoneOtp

booking.create, booking.payment, booking.calendarInvite, booking.reminders

chat.widget, chat.attachments, chat.typing, chat.readReceipts

notifications.telegram, notifications.email,
notifications.crmWebhook, notifications.sms

admin.dashboard, admin.inbox, admin.bookings, admin.users
account.dashboard

tools.kundli, tools.matching, tools.numerology, tools.moonSign, tools.nakshatra
panchang.widget, shop, astrologers.directory, payments.razorpay
```

After Phase 1.5 / Phase 2 modules are built, they'll be activated one at a time via these flags.

---

## Project structure

```
app/                          App Router pages
  layout.tsx                  Fonts, metadata, navbar, footer, providers
  page.tsx                    Home (composed of section components)
  about/  services/  book/    Page routes
  contact/  blog/             More page routes
  privacy/  terms/  refund/   Legal stubs

components/
  ui/                         shadcn-style primitives (Button, Sheet, Accordion)
  layout/                     Navbar, MobileMenu, Footer, StickyBookButton
  brand/                      Custom glyphs (LotusGlyph, MoonGlyph, YantraGlyph, Wordmark)
  sections/                   Hero, Services, Testimonials, Stats, FAQ, CTA, etc.
  motion/                     LenisProvider, Reveal animation helpers
  feature-gate.tsx            <FeatureGate flag="..."> wrapper

content/                      Typed TS content (CMS-swappable)
  services.ts  testimonials.ts  faqs.ts  pillars.ts  stats.ts  how-it-works.ts

lib/
  flags.ts                    server-only runtime check
  flag-types.ts               type-only export (safe in client)
  fonts.ts                    next/font loaders
  utils.ts                    cn() helper + SITE constants

config/
  feature-flags.json          The flag registry (md5-hashed values)

scripts/
  flags.ts                    Dev CLI (hash, init, list, set)
```

---

## Design tokens

All tokens live in `app/globals.css` under the `@theme {}` block. Colors are referenced via CSS variables (`var(--color-gold)` etc) so they work in inline styles, Tailwind arbitrary values, and SVG `fill="currentColor"` patterns.

| Token              | Hex        | Usage                                  |
| ------------------ | ---------- | -------------------------------------- |
| `--color-ivory`    | `#FAF6EE`  | Primary background (warm white)        |
| `--color-parchment`| `#F1E9D7`  | Alt surfaces / soft sections           |
| `--color-sand`     | `#E8DEC6`  | Borders / dividers                     |
| `--color-midnight` | `#0B1437`  | Hero / footer / CTA band               |
| `--color-astral`   | `#171B3D`  | Secondary deep surface                 |
| `--color-gold`     | `#C9A55C`  | Signature accent (used sparingly)      |
| `--color-gold-soft`| `#E7CF9B`  | Hover/glow gold                        |
| `--color-vermillion`| `#B8423A` | Sacred red (rare highlight only)       |
| `--color-lotus`    | `#E9CFC8`  | Warmth in cards                        |
| `--color-sage`     | `#7C8C7A`  | Calm green                             |
| `--color-ink`      | `#1A1A1A`  | Primary text on light                  |
| `--color-muted`    | `#5B5B5B`  | Secondary text                         |
| `--color-cream`    | `#F4ECDB`  | Primary text on dark                   |

Guardrails: no more than 2 accent colors visible per viewport; gold is reserved for legacy/trust signals.

---

## What's already built (Phase 1.0 + 1.1 partial)

- Full design system + fluid typography
- Sticky navbar with scroll-aware backdrop
- Mobile menu (Radix Sheet)
- Hero with constellation parallax + moon
- Trust strip
- 6-service grid + dynamic `/services/[slug]` pages
- About section with yantra mandala
- "How it works" 3-step
- "Why choose us" 4 pillars
- Testimonials carousel (gated)
- Animated stats counter (gated)
- Journal teaser (gated, blog content placeholder)
- FAQ accordion
- CTA band with breathing lotus
- Footer with social, navigation, Sanskrit blessing
- Sticky mobile-only "Book a consultation" button (gated)
- `/about`, `/services`, `/services/[slug]`, `/book`, `/contact`, `/blog`, `/privacy`, `/terms`, `/refund`
- Booking form shell (currently posts to a local handler; Phase 1.5 wires to DB/Resend/Telegram/CRM)

---

## What's next (Phase 1.5 — backend)

These are designed but not yet built:

1. **PostgreSQL + Prisma** (User, Service, Booking, ChatThread, Message, Notification, WebhookOutbox)
2. **Auth.js v5** with email magic link (Resend)
3. **Booking flow** end-to-end — `/api/book` writes to DB, fans out to email + Telegram + CRM webhook
4. **Telegram bot** (grammY) with inline Confirm/Reschedule/Decline buttons
5. **In-app chat** — floating widget, Postgres `LISTEN/NOTIFY` + SSE, MinIO attachments
6. **Admin dashboard** at `/admin/*` (role-gated)
7. **Outbound CRM webhook** (HubSpot/Salesforce/Zoho/Sheets — provider-agnostic)
8. **Docker compose** with web + db + minio + caddy + backup sidecar

---

## Deploy options

**Hostinger VPS (recommended for this project):** Docker + Caddy with automatic HTTPS. Full walkthrough in [`DEPLOY.md`](./DEPLOY.md).

```bash
# On the VPS (first time):
cp .env.example .env   # fill DOMAIN, ACME_EMAIL, contact details
chmod +x deploy.sh
docker compose up -d --build

# After every code push:
./deploy.sh
```

**Important:** Hostinger shared/cloud hosting does **not** run Docker. You need a **KVM VPS** plan (KVM 1 is enough for Phase 1).

The site can also run on Vercel (`pnpm build` + deploy), but the repo is set up for VPS self-hosting with Phase 1.5 services (Postgres, MinIO) ready behind a Docker profile.

---

## Conventions

- Server Components by default; `'use client'` only when needed (state, effects, browser APIs)
- Content lives in `content/*.ts` as typed objects, ready to move to a CMS later
- All animations honor `prefers-reduced-motion`
- WCAG 2.1 AA contrast on every token pairing
- File paths use the `@/` alias rooted at the project

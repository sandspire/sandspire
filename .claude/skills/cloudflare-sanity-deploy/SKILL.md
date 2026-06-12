---
name: cloudflare-sanity-deploy
description: >-
  Deploy Next.js + Sanity sites to Cloudflare Workers under size limits. Covers
  client-only Studio, OpenNext bundle size, ISR, SSG, Sanity CDN images, mobile
  patterns, and pre-deploy checklists. Use when deploying to Cloudflare, fixing
  Worker size errors, optimizing CMS sites, or starting a new Ship Studio project
  with Sanity.
user_invocable: true
---

# Cloudflare + Sanity Deploy Skill

Battle-tested patterns from production Ship Studio sites (La Torta, Sandspire). Apply whenever deploying Next.js + Sanity to Cloudflare Workers or optimizing a CMS-driven marketing site.

## When to Trigger

- Cloudflare deploy fails with Worker script size / bundle too large
- User asks to deploy to Cloudflare with Sanity CMS
- Setting up `/studio` or Sanity editing workflow
- Performance tuning for CMS-driven pages (ISR, SSG, images)
- Starting a new Next.js + Sanity + Cloudflare project
- User mentions OpenNext, wrangler, or Worker 3–10 MB limits

---

## 1. Stay Under Cloudflare Worker Size Limits

Cloudflare caps the **server Worker bundle** (~3 MB gzip on free, ~10 MB on paid). Sanity Studio bundled into the server is often **~18 MB** — it breaks deploys.

### What counts toward the limit

| Counts (server bundle) | Does NOT count |
|------------------------|----------------|
| Server components, API routes, OpenNext handler | Sanity images (`cdn.sanity.io`) |
| Imports pulled into server layouts/pages | Static files in `public/` |
| Heavy libs (Studio, OG image, Sentry in prod) | Client JS chunks loaded after hydration |

### Fix A: Keep Sanity Studio out of the server bundle

**Preferred for sites that need `/studio` in production:**

1. **`studio.tsx`** — load Studio with `next/dynamic` and `{ ssr: false }`
2. **`studio-client.tsx`** — actual `NextStudio` component lives here only
3. **`page.tsx`** — hand-write `metadata` / `viewport`; **never** re-export from `next-sanity/studio` (that pulls Studio into the server bundle)

**Rule:** Treat the CMS editor as a **client-only app**. Never import Studio code in server components or shared layouts.

**Alternative (Sandspire pattern):** Replace embedded Studio with a lightweight `/studio` **help page** that links to [Sanity Manage](https://www.sanity.io/manage) and documents `npx sanity dev` for local editing. Smallest Worker bundle; no in-browser Studio on production.

### Fix B: Match Worker name to the project

OpenNext/Wrangler derive the Worker name from `package.json` `"name"` and/or `wrangler.jsonc` `"name"`. Mismatch → “Worker not found” on deploy.

**Rule:** `package.json` `"name"` and `wrangler.jsonc` `"name"` (and `services[].service` self-reference) must all match the deployed Cloudflare worker/project name.

### Additional bundle trims (Sandspire)

- Webpack `NormalModuleReplacementPlugin` to stub `@vercel/og` / resvg if unused
- Disable `@sentry/nextjs` `withSentryConfig` in production unless `OPENNEXT_WITH_SENTRY=1`
- Prefer `@sanity/client` over heavy `next-sanity` where Studio isn’t embedded
- Run `opennextjs-cloudflare build` locally and inspect bundle if size errors persist

---

## 2. Performance — Fast Loads

### Pre-render slug pages (SSG)

Use `generateStaticParams()` for every route with a known slug list (products, blog posts, work projects, locations).

```
/menu/[slug]  →  ● SSG (all slugs pre-built)
/work/[slug]  →  ● SSG where slugs are known
/             →  ○ Static
/about        →  ○ Static
```

First visit is instant HTML; no per-request server work for pre-built paths.

### Revalidate CMS fetches (ISR-lite)

Every Sanity fetch should use:

```ts
{ next: { revalidate: 300 } }  // 5 minutes — adjust 60/600 as needed
```

- Edits show up within ~5 minutes without redeploy
- Pages stay cached and fast between updates
- Avoid `cache: 'no-store'` unless live data is required

Sandspire work pages use `revalidate = 60`; either is fine — pick one per project and stay consistent.

### Images from Sanity CDN

- Store product/event/portfolio photos as Sanity assets
- Build URLs with `urlFor(image).width(w).height(h).fit('crop')`
- Keep `public/` for logo, icons, hero animation frames only
- Tiny `IMAGE_PLACEHOLDER` SVG data URI when an asset is missing

Sanity CDN handles resize, WebP, and global caching — the Worker does not serve images.

### Lazy-load below the fold

- Default: `loading="lazy"` on images
- Exceptions: first 1–2 above-fold cards → `loading="eager"`
- Map iframes: often `loading="eager"` + preconnect (users scroll to maps)

### Preconnect in `app/layout.tsx`

```tsx
<link rel="preconnect" href="https://cdn.sanity.io" />
{/* Add maps, video CDNs, analytics as needed */}
<link rel="preconnect" href="https://maps.google.com" />
<link rel="preconnect" href="https://maps.gstatic.com" />
```

### Fonts

Use `next/font` with `display: 'swap'` — text shows immediately with fallback, then swaps.

### Static fallbacks when Sanity is down

Ship fallback catalogs in `lib/` (e.g. `workProjectDefaults.ts`, `menu.ts`, `site-settings.ts`). If Sanity fails or env vars are missing, the site still renders.

Add a fetch timeout (Sandspire: ~12s) then fall back — log a dev warning.

### Baked-in Sanity project ID for production

```ts
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
```

Project ID is public (in every image URL). A safe default lets Cloudflare builds work without dashboard env vars for **reads**. Still set write tokens in Cloudflare for seed scripts.

---

## 3. Mobile & Accessibility

### Viewport

```ts
export const viewport: Viewport = {
  themeColor: "#fff4ec",       // match site background / status bar
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",        // notched iPhones
};
```

### Hero / heavy animations on mobile

- Frame scrubbing on touch feels clunky → auto-play on first swipe, then unlock scroll
- Desktop can keep wheel scrubbing
- Lock `body` scroll until animation completes if needed

### Navigation

- Desktop: dropdowns with clear hover/focus states
- Mobile: hamburger → expandable sub-lists with chevron toggle
- Touch targets ≥ 44px; icon buttons need `aria-label`

### Dense mobile layouts (tune by section)

| Pattern | Mobile fix |
|---------|------------|
| Product cards | Price **under** title, not beside it |
| Tall cards | `h-auto`, not fixed `72vh` |
| Grids | Sticky filter bars; titles above filters |
| Reviews | Smaller type; no clipped quotes (`line-clamp` sparingly) |

Test at **390×844** (iPhone).

### SEO / a11y basics

- `alt` on all images (from Sanity or content title)
- Heading hierarchy `h1 → h2 → h3`
- `/studio`: `robots: { index: false }`
- Semantic landmarks; form labels and error text

---

## 4. Sanity CMS Architecture

### Content model (typical marketing site)

| Document | Purpose |
|----------|---------|
| `product` / `workProject` | Slugged items with image, copy, metadata |
| `siteSettings` | Singleton — URLs, map embed, section headings |
| `landingPage`, `aboutPage`, … | One document per major page |
| `location`, `faq`, `event` | Structured sections |

Almost everything editable except hero animation frames and purely decorative assets.

### Image strategy

1. **Seed script** (`npm run seed:sanity*`) — upload initial images; dedupe by `originalFilename`
2. **Frontend** — always read via `urlFor()` from Sanity CDN
3. **No local product images** in `public/` after migration

### Data flow

```
Sanity (source of truth)
    ↓ fetch with { next: { revalidate: 300 } }
Server Component (page.tsx)
    ↓ props
Client Components (grids, carousels, filters)
    ↓ if fetch fails
Static catalogs in lib/ (backup only)
```

### Editing workflow

1. Open `/studio` (client-only) or Sanity Manage / `npx sanity dev`
2. Edit → Publish
3. Live site updates within revalidate window — no redeploy

**New slugs:** On-demand render on first visit; add to `generateStaticParams` list on next deploy.

---

## 5. Pre-Deploy Checklist

Copy when starting or auditing a Ship Studio + Sanity + Cloudflare project.

### Deploy (Cloudflare)

- [ ] `package.json` `"name"` matches `wrangler.jsonc` worker name
- [ ] Sanity Studio is client-only (`dynamic` + `ssr: false`) OR replaced with help page
- [ ] Never re-export Studio metadata from server files
- [ ] Sanity project ID has safe default in `sanity/env.ts`
- [ ] `NEXT_PUBLIC_SANITY_*` set in Cloudflare dashboard anyway
- [ ] `wrangler.jsonc` `build.command` runs OpenNext build (or CI runs `npm run deploy`)
- [ ] Worker self-reference service name matches worker name

### Performance

- [ ] `generateStaticParams()` for all slug-based pages
- [ ] `{ next: { revalidate: 300 } }` on every Sanity fetch
- [ ] Images in Sanity CDN, not `public/` (except logo, icons, animations)
- [ ] `urlFor()` with explicit width/height + `fit('crop')`
- [ ] `loading="lazy"` on below-fold images
- [ ] `preconnect` to `cdn.sanity.io` and slow embeds
- [ ] `next/font` with `display: 'swap'`
- [ ] Static fallback data if CMS is down

### Mobile

- [ ] `themeColor` + `viewportFit: 'cover'`
- [ ] Test 390×844
- [ ] No fixed viewport-height cards unless content fills them
- [ ] Prices under titles in narrow grids
- [ ] Touch-friendly nav and CTAs
- [ ] Hero animations simplified or auto-play on mobile

### Sanity

- [ ] One document per page + `siteSettings` singleton
- [ ] Seed script for initial content + images
- [ ] `imageWithAlt` (or equivalent) for all photos
- [ ] Section titles / CTAs editable, not hardcoded
- [ ] `/studio` excluded from SEO (`robots: noindex`)

---

## 6. Intentionally Defer (Don’t Over-Engineer)

| OK to skip initially | Why |
|----------------------|-----|
| Hero frame WebP / video | Large JPG sequence in `public/` is fine as static assets |
| Sanity Visual Editing | Studio-only edits are enough for most clients |
| Fully static listing pages with search/filters | Dynamic SSR for filter pages is acceptable |
| Responsive `srcset` | Single Sanity URL size per breakpoint is often enough |
| Paid Workers plan | Free tier may require extra bundle trimming or another host |

---

## 7. Sandspire-Specific Notes

This repo already implements many patterns:

- `/studio` is a **help page**, not embedded Studio (smallest bundle)
- Worker name: **`sandspire`** in `wrangler.jsonc` (ensure `package.json` name aligns)
- Work projects: Sanity + `lib/workProjectDefaults.ts`, ISR **60s**, **12s** fetch timeout
- Sentry: optional in prod bundle; `@sentry/cloudflare` on worker entry
- OpenNext build via `scripts/wrangler-opennext-build.cjs`

When adding new slug routes or CMS types here, follow sections 2–5 above.

---

## Workflow for Agents

1. Read `SITE.md` and `wrangler.jsonc` / `package.json` for project-specific names
2. If deploy fails on size → apply section 1 before adding features
3. For new CMS pages → section 2 (SSG + revalidate) + section 4 (schema + seed)
4. After changes → update `SITE.md` (documentation-writer skill)
5. Verify mobile at 390px width for any new grid or card layout

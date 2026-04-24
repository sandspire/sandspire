# Sandspire

Sandspire is a custom marketing website for a creative studio focused on brand strategy, web design, social media, and AI automation. The site presents the studio's positioning, services, selected work, about page, and contact flow in a polished editorial-style layout.

## What the Site Includes

- A full-screen homepage hero with motion background and service overview
- A services section covering brand strategy, web design, social media marketing, and AI automation
- A selected work page with portfolio cards and work previews
- Dedicated `About` and `Contact` pages
- A contact section with FAQ content and a styled inquiry form

## Routes

- `/` - Homepage
- `/work` - Portfolio overview
- `/work/[slug]` - Work project pages (e.g. `/work/slrp`, `/work/3-fils`) — see `lib/workProjectDefaults.ts`
- `/about` - Studio overview
- `/contact` - Contact page and FAQ

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion
- OpenNext for Cloudflare deployment
- Sentry for errors and performance: **`@sentry/nextjs`** in the app (set `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_DSN` — see [Next.js on Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/)) and **`@sentry/cloudflare`** in **`cf-worker-sentry.ts`** (Worker env: same DSN; see [Sentry for Cloudflare Workers](https://docs.sentry.io/platforms/javascript/guides/cloudflare/))

## Cloudflare (Workers Builds / `wrangler deploy`)

If the deploy log says *Could not find compiled Open Next config, did you run the build command?* the build step was skipped. **`opennextjs-cloudflare deploy` only uploads a *built* app**; it does not run the OpenNext build for you in CI the way a full `npm run deploy` would imply when split across phases.

- **If your host has separate “Build” and “Deploy” steps:** set **Build** to `npm run build` and **Deploy** to `npx wrangler deploy` (or to `npx opennextjs-cloudflare deploy` after the same build).
- **If you only have one deploy command:** set it to **`npm run deploy`** (same as **`npm run cf:workers`**) so OpenNext build runs before deploy.

**Sentry on the Worker:** `wrangler.jsonc` **`main`** is **`cf-worker-sentry.ts`**, which wraps OpenNext’s **`.open-next/worker.js`** with **`@sentry/cloudflare` `withSentry`**. Set **`SENTRY_DSN`** or **`NEXT_PUBLIC_SENTRY_DSN`** on the Worker in the Cloudflare dashboard. **`nodejs_compat`** is already in **`compatibility_flags`** (needed for `AsyncLocalStorage`).

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js dev server |
| `npm run build` | Build the app for Cloudflare via OpenNext |
| `npm run start` | Run the production Next.js server locally |
| `npm run preview` | Build and preview the Cloudflare worker locally |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run cf-typegen` | Generate Cloudflare environment types |

## Project Structure

```text
app/
  layout.tsx        # Global layout, fonts, metadata
  page.tsx          # Homepage
  about/page.tsx    # About page
  contact/page.tsx  # Contact page
  work/             # Portfolio pages

components/sandspire/
  Hero.tsx
  ServicesBento.tsx
  CaseStudies.tsx
  ContactFAQ.tsx
  SiteFooter.tsx
  ...               # Reusable Sandspire sections

public/
  images/           # Project imagery and section assets
  logos/            # Brand logos
  videos/           # Hero and social proof motion assets
```

## Notes

- The contact form is currently presentational. Submitting it updates UI state, but it does not send data to a backend or email provider yet.
- `Agentation` only renders in development.
- Deployment is configured for Cloudflare using `@opennextjs/cloudflare` and `wrangler`.

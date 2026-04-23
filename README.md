# Sandspire

Sandspire is a custom marketing website for a creative studio focused on brand strategy, web design, social media, and AI automation. The site presents the studio's positioning, services, selected work, about page, and contact flow in a polished editorial-style layout.

## What the Site Includes

- A full-screen homepage hero with motion background and service overview
- A services section covering brand strategy, web design, social media marketing, and AI automation
- A selected work page with portfolio cards and case study previews
- Dedicated `About` and `Contact` pages
- A contact section with FAQ content and a styled inquiry form

## Routes

- `/` - Homepage
- `/work` - Portfolio overview
- `/work/[slug]` - Case study pages (e.g. `/work/slrp`, `/work/3-fils`) — see `lib/caseStudyProjectDefaults.ts`
- `/about` - Studio overview
- `/contact` - Contact page and FAQ

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion
- OpenNext for Cloudflare deployment

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

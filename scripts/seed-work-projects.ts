/**
 * Creates or replaces all work project documents from lib/workProjectDefaults.ts.
 *
 * Usage (from repo root):
 *   export SANITY_API_WRITE_TOKEN="your_token_with_editor_rights"
 *   npx tsx scripts/seed-work-projects.ts
 *
 * Token: https://www.sanity.io/manage → Project → API → Tokens (Editor).
 * Also load NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET
 * (e.g. `export $(grep -v '^#' .env.local | xargs)`).
 */

import { createClient } from "@sanity/client";

import { WORK_PROJECTS } from "../lib/workProjectDefaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET",
  );
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (Editor token)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-23",
  token,
  useCdn: false,
});

async function main() {
  for (const p of WORK_PROJECTS) {
    const doc = {
      _id: `workProject-${p.slug}`,
      _type: "workProject" as const,
      internalTitle: p.internalTitle,
      slug: { _type: "slug" as const, current: p.slug },
      heroImagePath: p.images.hero,
      clientLogoPath: p.clientLogoPath,
      serviceTags: p.serviceTags,
      fieldLabel: p.fieldLabel,
      industry: p.industry,
      locationLabel: p.locationLabel,
      location: p.location,
      about: p.about,
      projectUrl: p.projectUrl,
      ctaLabel: p.ctaLabel,
      challengeTitle: p.challengeTitle,
      challengeBody: p.challengeBody,
      solutionTitle: p.solutionTitle,
      solutionBody: p.solutionBody,
      resultTitle: p.resultTitle,
      galleryStackTopPath: p.images.galleryStackTop,
      galleryStackBottomPath: p.images.galleryStackBottom,
      galleryHeroTallPath: p.images.galleryHeroTall,
      resultImageWidePath: p.images.resultWide,
      resultImageTallPath: p.images.resultTall,
      invertClientLogo: p.invertClientLogo,
    };

    await client.createOrReplace(doc);
    console.log("Upserted", p.slug);
  }

  console.log("Done. Open your Studio (npx sanity dev) → Work project.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

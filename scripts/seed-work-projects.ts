/**
 * Creates or replaces all work project documents from lib/workProjectDefaults.ts.
 *
 * Usage (from repo root):
 *   Set SANITY_API_WRITE_TOKEN in .env or .env.local (see .env.example), then:
 *   npm run seed:sanity-work-projects
 *
 * Token: https://www.sanity.io/manage → Project → API → Tokens (Editor).
 * Project / dataset / API version default the same as `sanity/env.ts` if
 * NEXT_PUBLIC_SANITY_* is unset.
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve } from "node:path";

import { WORK_PROJECTS } from "../lib/workProjectDefaults";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

const DEFAULT_PROJECT_ID = "1fmk53vd";
const DEFAULT_DATASET = "production";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DEFAULT_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-23";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (Editor token)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
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

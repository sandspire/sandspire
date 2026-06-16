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
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

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

const publicDir = resolve(process.cwd(), "public");
const assetCache = new Map<string, Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined>>();

/** Upload a /public image once (cached by path) and return a Sanity image object. */
function uploadPublicImage(relativePath: string | null | undefined) {
  if (!relativePath) return Promise.resolve(undefined);
  const cached = assetCache.get(relativePath);
  if (cached) return cached;

  const task = (async () => {
    try {
      const decoded = decodeURIComponent(relativePath.replace(/^\//, ""));
      const absolutePath = resolve(publicDir, decoded);
      const buffer = readFileSync(absolutePath);
      const asset = await client.assets.upload("image", buffer, {
        filename: basename(absolutePath),
      });
      return {
        _type: "image" as const,
        asset: { _type: "reference" as const, _ref: asset._id },
      };
    } catch {
      console.warn(`  · skip image (missing): ${relativePath}`);
      return undefined;
    }
  })();

  assetCache.set(relativePath, task);
  return task;
}

async function main() {
  for (const p of WORK_PROJECTS) {
    const [
      heroImage,
      clientLogo,
      galleryStackTop,
      galleryStackBottom,
      galleryHeroTall,
      resultImageWide,
      resultImageTall,
      listingImage,
    ] = await Promise.all([
      uploadPublicImage(p.images.hero),
      uploadPublicImage(p.clientLogoPath),
      uploadPublicImage(p.images.galleryStackTop),
      uploadPublicImage(p.images.galleryStackBottom),
      uploadPublicImage(p.images.galleryHeroTall),
      uploadPublicImage(p.images.resultWide),
      uploadPublicImage(p.images.resultTall),
      uploadPublicImage(p.images.resultWide),
    ]);

    const doc = {
      _id: `workProject-${p.slug}`,
      _type: "workProject" as const,
      internalTitle: p.internalTitle,
      slug: { _type: "slug" as const, current: p.slug },
      heroImagePath: p.images.hero,
      ...(heroImage ? { heroImage } : {}),
      clientLogoPath: p.clientLogoPath,
      ...(clientLogo ? { clientLogo } : {}),
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
      ...(galleryStackTop ? { galleryStackTop } : {}),
      galleryStackBottomPath: p.images.galleryStackBottom,
      ...(galleryStackBottom ? { galleryStackBottom } : {}),
      galleryHeroTallPath: p.images.galleryHeroTall,
      ...(galleryHeroTall ? { galleryHeroTall } : {}),
      resultImageWidePath: p.images.resultWide,
      ...(resultImageWide ? { resultImageWide } : {}),
      resultImageTallPath: p.images.resultTall,
      ...(resultImageTall ? { resultImageTall } : {}),
      listingImagePath: p.images.resultWide,
      ...(listingImage ? { listingImage } : {}),
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

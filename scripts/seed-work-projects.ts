/**
 * Creates or replaces all work project documents from lib/workProjectDefaults.ts.
 * Raster images are compressed to WebP before upload.
 *
 * Usage (from repo root):
 *   Set SANITY_API_WRITE_TOKEN in .env or .env.local (see .env.example), then:
 *   npm run seed:sanity-work-projects
 */

import { config } from "dotenv";
import { resolve } from "node:path";

import { WORK_PROJECTS } from "../lib/workProjectDefaults";
import {
  createSanityAssetIndex,
  createUploadClient,
  uploadPublicImage,
} from "./lib/upload-public-asset";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

const client = createUploadClient();
const publicDir = resolve(process.cwd(), "public");
const assetCache = new Map<string, Promise<unknown>>();

async function main() {
  const assetIndex = await createSanityAssetIndex(client);
  console.log(
    `CDN index: ${assetIndex.imageRefByFilename.size} images, ${assetIndex.fileUrlByFilename.size} files\n`,
  );

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
      uploadPublicImage(client, publicDir, p.images.hero, assetCache, assetIndex),
      uploadPublicImage(client, publicDir, p.clientLogoPath ?? "", assetCache, assetIndex),
      uploadPublicImage(client, publicDir, p.images.galleryStackTop, assetCache, assetIndex),
      uploadPublicImage(client, publicDir, p.images.galleryStackBottom ?? "", assetCache, assetIndex),
      uploadPublicImage(client, publicDir, p.images.galleryHeroTall, assetCache, assetIndex),
      uploadPublicImage(client, publicDir, p.images.resultWide, assetCache, assetIndex),
      uploadPublicImage(client, publicDir, p.images.resultTall, assetCache, assetIndex),
      uploadPublicImage(client, publicDir, p.images.resultWide, assetCache, assetIndex),
    ]);

    const doc = {
      _id: `workProject-${p.slug}`,
      _type: "workProject" as const,
      internalTitle: p.internalTitle,
      slug: { _type: "slug" as const, current: p.slug },
      heroImagePath: heroImage ? null : p.images.hero,
      ...(heroImage ? { heroImage } : {}),
      clientLogoPath: clientLogo ? null : p.clientLogoPath,
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
      galleryStackTopPath: galleryStackTop ? null : p.images.galleryStackTop,
      ...(galleryStackTop ? { galleryStackTop } : {}),
      galleryStackBottomPath: galleryStackBottom ? null : p.images.galleryStackBottom,
      ...(galleryStackBottom ? { galleryStackBottom } : {}),
      galleryHeroTallPath: galleryHeroTall ? null : p.images.galleryHeroTall,
      ...(galleryHeroTall ? { galleryHeroTall } : {}),
      resultImageWidePath: resultImageWide ? null : p.images.resultWide,
      ...(resultImageWide ? { resultImageWide } : {}),
      resultImageTallPath: resultImageTall ? null : p.images.resultTall,
      ...(resultImageTall ? { resultImageTall } : {}),
      listingImagePath: listingImage ? null : p.images.resultWide,
      ...(listingImage ? { listingImage } : {}),
      invertClientLogo: p.invertClientLogo,
    };

    await client.createOrReplace(doc);
    console.log(`✓ workProject-${p.slug}`);
  }

  console.log("\nDone. Work project images uploaded as compressed WebP where possible.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

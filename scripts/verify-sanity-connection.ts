/**
 * Quick health check: Sanity project, documents, and CDN media URLs.
 * Usage: npm run verify:sanity
 */

import { config } from "dotenv";
import { resolve } from "node:path";

import { projectId, dataset, apiVersion } from "../sanity/env";
import {
  getClientLogos,
  getHomepageContent,
  getHomepageV2Content,
  getSiteSettings,
} from "../sanity/lib/queries/siteContent";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

function isCdnUrl(value: string | undefined) {
  return Boolean(value?.includes("cdn.sanity.io"));
}

async function main() {
  console.log(`Project: ${projectId} / dataset: ${dataset} / api: ${apiVersion}\n`);

  const [site, hp, hp2, logos] = await Promise.all([
    getSiteSettings(),
    getHomepageContent(),
    getHomepageV2Content(),
    getClientLogos(),
  ]);

  const checks = [
    { label: "Site settings loaded", ok: Boolean(site.siteTitle) },
    { label: "Site logo from Sanity CDN", ok: isCdnUrl(site.siteLogoPath) },
    { label: "Nav links", ok: site.nav.links.length >= 4 },
    { label: "Homepage v2 headline", ok: Boolean(hp2.heroHeadline) },
    { label: "Hero image from Sanity CDN", ok: isCdnUrl(hp2.heroImagePath) },
    { label: "Bento cocktail from Sanity CDN", ok: isCdnUrl(hp2.bentoCocktailImagePath) },
    { label: "Bento food from Sanity CDN", ok: isCdnUrl(hp2.bentoFoodImagePath) },
    { label: "Brand Strategy images on CDN", ok: hp2.brandStrategyImagePaths.every(isCdnUrl) },
    { label: "Service flow diagram on CDN", ok: isCdnUrl(hp2.serviceFlowDiagramImagePath) },
    { label: "Work scroll videos on CDN", ok: hp2.workScrollItems.every((i) => isCdnUrl(i.videoPath)) },
    { label: "Work scroll icons on CDN", ok: hp2.workScrollItems.every((i) => isCdnUrl(i.iconPath)) },
    { label: "Showreel video on CDN", ok: isCdnUrl(hp2.showreelVideoPath) },
    { label: "Homepage hero video on CDN", ok: isCdnUrl(hp.heroVideoPath) },
    { label: "Web design cascade on CDN", ok: hp.webDesignImages.length > 0 && hp.webDesignImages.every(isCdnUrl) },
    { label: "Featured cases on CDN", ok: hp.featuredCases.every((c) => isCdnUrl(c.imagePath)) },
    { label: "Client logos on CDN", ok: logos.length >= 6 && logos.every((l) => isCdnUrl(l.logoPath)) },
  ];

  for (const { label, ok } of checks) {
    console.log(`${ok ? "✓" : "✗"} ${label}`);
  }

  const failed = checks.filter((c) => !c.ok);
  if (failed.length > 0) {
    console.error("\nSome checks failed. Run: npm run seed:sanity-site-content");
    process.exit(1);
  }

  console.log("\nSanity is connected. All checked media is served from the CDN (public/ can stay empty).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

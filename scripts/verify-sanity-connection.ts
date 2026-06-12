/**
 * Quick health check: Sanity project, documents, and CDN image URLs.
 * Usage: npx tsx scripts/verify-sanity-connection.ts
 */

import { config } from "dotenv";
import { resolve } from "node:path";

import { projectId, dataset, apiVersion } from "../sanity/env";
import {
  getClientLogos,
  getHomepageV2Content,
  getSiteSettings,
} from "../sanity/lib/queries/siteContent";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

async function main() {
  console.log(`Project: ${projectId} / dataset: ${dataset} / api: ${apiVersion}\n`);

  const [site, hp, logos] = await Promise.all([
    getSiteSettings(),
    getHomepageV2Content(),
    getClientLogos(),
  ]);

  const checks = [
    { label: "Site settings loaded", ok: Boolean(site.siteTitle) },
    { label: "Nav links", ok: site.nav.links.length >= 4 },
    { label: "Homepage v2 headline", ok: Boolean(hp.heroHeadline) },
    { label: "Hero image from Sanity CDN", ok: hp.heroImagePath.includes("cdn.sanity.io") },
    { label: "Bento cocktail from Sanity CDN", ok: hp.bentoCocktailImagePath.includes("cdn.sanity.io") },
    { label: "Bento food from Sanity CDN", ok: hp.bentoFoodImagePath.includes("cdn.sanity.io") },
    { label: "Client logos", ok: logos.length >= 6 },
  ];

  for (const { label, ok } of checks) {
    console.log(`${ok ? "✓" : "✗"} ${label}`);
  }

  const failed = checks.filter((c) => !c.ok);
  if (failed.length > 0) {
    console.error("\nSome checks failed. Run: npm run seed:sanity-site-content");
    process.exit(1);
  }

  console.log("\nSanity is connected and home-2 images are served from the CDN.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

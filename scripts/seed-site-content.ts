/**
 * Creates or replaces site-wide singleton documents from lib/siteContentDefaults.ts.
 *
 * Usage:
 *   Set SANITY_API_WRITE_TOKEN in .env.local, then:
 *   npm run seed:sanity-site-content
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

import { siteContentDefaults } from "../lib/siteContentDefaults";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

const DEFAULT_PROJECT_ID = "1fmk53vd";
const DEFAULT_DATASET = "production";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DEFAULT_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-23";
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

const d = siteContentDefaults;
const publicDir = resolve(process.cwd(), "public");

async function uploadPublicImage(relativePath: string) {
  try {
    const absolutePath = resolve(publicDir, relativePath.replace(/^\//, ""));
    const buffer = readFileSync(absolutePath);
    const asset = await client.assets.upload("image", buffer, {
      filename: basename(absolutePath),
    });

    return {
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: asset._id },
    };
  } catch {
    console.warn(`Skip image upload (file missing): ${relativePath}`);
    return undefined;
  }
}

async function main() {
  const [heroImage, bentoCocktailImage, bentoFoodImage] = await Promise.all([
    uploadPublicImage("/images/HeroImage.png"),
    uploadPublicImage("/images/bento/service-suite-cocktail.png"),
    uploadPublicImage("/images/bento/service-suite-food.png"),
  ]);

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings" as const,
    siteTitle: d.site.siteTitle,
    siteDescription: d.site.siteDescription,
    phone: d.site.phone,
    email: d.site.email,
    navLinks: d.nav.links,
    ctaLabel: d.nav.ctaLabel,
    ctaHref: d.nav.ctaHref,
    footerTaglineLine1: d.footer.taglineLine1,
    footerTaglineLine2: d.footer.taglineLine2,
    footerBlurb: d.footer.blurb,
    footerCopyright: d.footer.copyright,
    socialLinks: d.footer.socialLinks,
    contactEyebrow: d.contact.eyebrow,
    contactHeadline: d.contact.headline,
    contactIntro: d.contact.intro,
    faqDefault: d.contact.faqDefault,
    faqHome2: d.contact.faqHome2,
  };

  const homepage = {
    _id: "homepage",
    _type: "homepage" as const,
    heroEyebrow: d.homepage.heroEyebrow,
    heroHeadline: d.homepage.heroHeadline,
    heroSubheadline: d.homepage.heroSubheadline,
    heroBodyTitle: d.homepage.heroBodyTitle,
    heroBodyText: d.homepage.heroBodyText,
    heroVideoPath: d.homepage.heroVideoPath,
    heroVideoPosterPath: d.homepage.heroVideoPosterPath,
    analyticsVideoPath: d.homepage.analyticsVideoPath,
    analyticsVideoPosterPath: d.homepage.analyticsVideoPosterPath,
    heroServices: d.homepage.heroServices,
    whoTitle: d.homepage.whoTitle,
    whoBody: d.homepage.whoBody,
    servicesEyebrow: d.homepage.servicesEyebrow,
    servicesTitle: d.homepage.servicesTitle,
    caseStudiesTitle: d.homepage.caseStudiesTitle,
    featuredCases: d.homepage.featuredCases,
    serviceCards: d.homepage.serviceCards,
  };

  const homepageV2 = {
    _id: "homepageV2",
    _type: "homepageV2" as const,
    ...d.homepageV2,
    ...(heroImage ? { heroImage } : {}),
    ...(bentoCocktailImage ? { bentoCocktailImage } : {}),
    ...(bentoFoodImage ? { bentoFoodImage } : {}),
    heroImagePath: null,
    bentoCocktailImagePath: null,
    bentoFoodImagePath: null,
    serviceCards: d.homepageV2.serviceCards.map((card) => ({
      title: card.title,
      flipDescription: card.flipDescription,
    })),
    workScrollItems: d.homepageV2.workScrollItems.map(
      ({ tagGlow: _tagGlow, ...item }) => item,
    ),
  };

  const aboutPage = {
    _id: "aboutPage",
    _type: "aboutPage" as const,
    ...d.about,
  };

  const workPageSettings = {
    _id: "workPageSettings",
    _type: "workPageSettings" as const,
    ...d.workPage,
  };

  const clientLogos = d.clientLogos.map((logo) => ({
    _id: `clientLogo-${logo.name.toLowerCase().replace(/\s+/g, "-")}`,
    _type: "clientLogo" as const,
    ...logo,
  }));

  const docs = [siteSettings, homepage, homepageV2, aboutPage, workPageSettings, ...clientLogos];

  for (const doc of docs) {
    await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
    console.log(`✓ ${doc._type} (${doc._id})`);
  }

  console.log("\nDone. Open /studio to review and publish.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

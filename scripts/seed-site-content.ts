/**
 * Creates or replaces site-wide singleton documents from lib/siteContentDefaults.ts
 * and uploads all /public media to Sanity CDN.
 *
 * Usage:
 *   Set SANITY_API_WRITE_TOKEN in .env.local, then:
 *   npm run seed:sanity-site-content
 */

import { config } from "dotenv";
import { resolve } from "node:path";

import { siteContentDefaults } from "../lib/siteContentDefaults";
import {
  createSanityAssetIndex,
  createUploadClient,
  uploadPublicFile,
  uploadPublicImage,
} from "./lib/upload-public-asset";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

const client = createUploadClient();
const publicDir = resolve(process.cwd(), "public");
const cache = new Map<string, Promise<unknown>>();
const d = siteContentDefaults;

const BRAND_STRATEGY_PATHS = [
  "/images/bento/top-1.webp",
  "/images/bento/top-2.webp",
  "/images/bento/middle-1.webp",
  "/images/bento/middle-2.webp",
  "/images/bento/middle-3.webp",
  "/images/bento/bottom-1.webp",
  "/images/bento/bottom-2.webp",
];

async function uploadVideoUrl(path: string, assetIndex: Awaited<ReturnType<typeof createSanityAssetIndex>>) {
  const url = await uploadPublicFile(client, publicDir, path, cache, "file", assetIndex);
  return typeof url === "string" ? url : undefined;
}

async function main() {
  const assetIndex = await createSanityAssetIndex(client);
  console.log(
    `CDN index: ${assetIndex.imageRefByFilename.size} images, ${assetIndex.fileUrlByFilename.size} files\n`,
  );

  const [
    heroImage,
    bentoCocktailImage,
    bentoFoodImage,
    siteLogo,
    homepageFlowDiagram,
    homepageV2FlowDiagram,
    heroVideoUrl,
    analyticsVideoUrl,
    heroPosterUrl,
    analyticsPosterHome1Url,
    analyticsPosterHome2Url,
    showreelPosterUrl,
  ] = await Promise.all([
    uploadPublicImage(client, publicDir, "/images/HeroImage.png", cache, assetIndex),
    uploadPublicImage(client, publicDir, "/images/bento/service-suite-cocktail.png", cache, assetIndex),
    uploadPublicImage(client, publicDir, "/images/bento/service-suite-food.png", cache, assetIndex),
    uploadPublicImage(client, publicDir, "/logos/sandspire.svg", cache, assetIndex),
    uploadPublicImage(client, publicDir, "/images/Service Icon Group.svg", cache, assetIndex),
    uploadPublicImage(client, publicDir, "/images/Service Icon Group.svg", cache, assetIndex),
    uploadVideoUrl(d.homepage.heroVideoPath, assetIndex),
    uploadVideoUrl(d.homepage.analyticsVideoPath, assetIndex),
    uploadPublicFile(client, publicDir, d.homepage.heroVideoPosterPath, cache, "file", assetIndex).then((u) =>
      typeof u === "string" ? u : undefined,
    ),
    uploadPublicFile(client, publicDir, d.homepage.analyticsVideoPosterPath, cache, "file", assetIndex).then(
      (u) => (typeof u === "string" ? u : undefined),
    ),
    uploadPublicFile(client, publicDir, d.homepageV2.analyticsVideoPosterPath, cache, "file", assetIndex).then(
      (u) => (typeof u === "string" ? u : undefined),
    ),
    uploadPublicFile(client, publicDir, d.homepageV2.showreelPosterPath, cache, "file", assetIndex).then((u) =>
      typeof u === "string" ? u : undefined,
    ),
  ]);

  const webDesignImagesRaw = await Promise.all(
    d.homepage.webDesignImages.map((p) => uploadPublicImage(client, publicDir, p, cache, assetIndex)),
  );
  const webDesignImages = webDesignImagesRaw
    .filter((img): img is NonNullable<typeof img> => Boolean(img))
    .map((img, i) => ({ ...img, _key: `web${i}` }));

  const brandStrategyImagesRaw = await Promise.all(
    BRAND_STRATEGY_PATHS.map((p) => uploadPublicImage(client, publicDir, p, cache, assetIndex)),
  );
  const brandStrategyImages = brandStrategyImagesRaw
    .filter((img): img is NonNullable<typeof img> => Boolean(img))
    .map((img, i) => ({ ...img, _key: `brand${i}` }));

  const workScrollItems = await Promise.all(
    d.homepageV2.workScrollItems.map(async (item) => {
      const [videoPath, iconPath] = await Promise.all([
        uploadVideoUrl(item.videoPath, assetIndex),
        uploadPublicFile(client, publicDir, item.iconPath, cache, "file", assetIndex).then((u) =>
          typeof u === "string" ? u : item.iconPath,
        ),
      ]);
      const { tagGlow: _tagGlow, ...rest } = item;
      return {
        ...rest,
        videoPath: videoPath ?? item.videoPath,
        iconPath,
      };
    }),
  );

  const featuredCases = await Promise.all(
    d.homepage.featuredCases.map(async (item) => {
      const imageUrl = await uploadPublicFile(client, publicDir, item.imagePath, cache, "file", assetIndex);
      return {
        ...item,
        imagePath: typeof imageUrl === "string" ? imageUrl : item.imagePath,
      };
    }),
  );

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
    ...(siteLogo ? { siteLogo } : {}),
  };

  const homepage = {
    _id: "homepage",
    _type: "homepage" as const,
    heroEyebrow: d.homepage.heroEyebrow,
    heroHeadline: d.homepage.heroHeadline,
    heroSubheadline: d.homepage.heroSubheadline,
    heroBodyTitle: d.homepage.heroBodyTitle,
    heroBodyText: d.homepage.heroBodyText,
    heroVideoPath: heroVideoUrl ?? d.homepage.heroVideoPath,
    heroVideoPosterPath: heroPosterUrl ?? d.homepage.heroVideoPosterPath,
    analyticsVideoPath: analyticsVideoUrl ?? d.homepage.analyticsVideoPath,
    analyticsVideoPosterPath: analyticsPosterHome1Url ?? d.homepage.analyticsVideoPosterPath,
    heroServices: d.homepage.heroServices,
    whoTitle: d.homepage.whoTitle,
    whoBody: d.homepage.whoBody,
    servicesEyebrow: d.homepage.servicesEyebrow,
    servicesTitle: d.homepage.servicesTitle,
    caseStudiesTitle: d.homepage.caseStudiesTitle,
    featuredCases,
    serviceCards: d.homepage.serviceCards,
    ...(webDesignImages.length ? { webDesignImages } : {}),
    ...(homepageFlowDiagram ? { serviceFlowDiagramImage: homepageFlowDiagram } : {}),
  };

  const homepageV2 = {
    _id: "homepageV2",
    _type: "homepageV2" as const,
    ...d.homepageV2,
    ...(heroImage ? { heroImage } : {}),
    ...(bentoCocktailImage ? { bentoCocktailImage } : {}),
    ...(bentoFoodImage ? { bentoFoodImage } : {}),
    ...(brandStrategyImages.length ? { brandStrategyImages } : {}),
    ...(homepageV2FlowDiagram ? { serviceFlowDiagramImage: homepageV2FlowDiagram } : {}),
    heroImagePath: null,
    bentoCocktailImagePath: null,
    bentoFoodImagePath: null,
    showreelVideoPath: heroVideoUrl ?? d.homepageV2.showreelVideoPath,
    showreelPosterPath: showreelPosterUrl ?? d.homepageV2.showreelPosterPath,
    analyticsVideoPath: analyticsVideoUrl ?? d.homepageV2.analyticsVideoPath,
    analyticsVideoPosterPath: analyticsPosterHome2Url ?? d.homepageV2.analyticsVideoPosterPath,
    serviceCards: d.homepageV2.serviceCards.map((card) => ({
      title: card.title,
      flipDescription: card.flipDescription,
    })),
    workScrollItems,
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

  const clientLogos = await Promise.all(
    d.clientLogos.map(async (logo) => {
      const logoImage = await uploadPublicImage(client, publicDir, logo.logoPath, cache, assetIndex);
      return {
        _id: `clientLogo-${logo.name.toLowerCase().replace(/\s+/g, "-")}`,
        _type: "clientLogo" as const,
        name: logo.name,
        order: logo.order,
        ...(logoImage ? { logoImage } : {}),
        logoPath: null,
      };
    }),
  );

  const docs = [siteSettings, homepage, homepageV2, aboutPage, workPageSettings, ...clientLogos];

  for (const doc of docs) {
    await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
    console.log(`✓ ${doc._type} (${doc._id})`);
  }

  console.log("\nDone. Media uploaded to Sanity CDN. Safe to remove matching /public files.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

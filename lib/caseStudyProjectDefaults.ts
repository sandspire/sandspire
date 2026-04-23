/**
 * Fallback content for /work/[slug] when Sanity has no doc or empty fields.
 * Single-image projects reuse their card image across hero / gallery / result slots.
 */

export type CaseStudyImageSet = {
  hero: string;
  galleryStackTop: string;
  galleryStackBottom: string;
  galleryHeroTall: string;
  resultWide: string;
  resultTall: string;
};

export type CaseStudyProjectDefaults = {
  slug: string;
  internalTitle: string;
  serviceTags: string[];
  fieldLabel: string;
  industry: string;
  locationLabel: string;
  location: string;
  about: string;
  projectUrl: string;
  ctaLabel: string;
  challengeTitle: string;
  challengeBody: string;
  solutionTitle: string;
  solutionBody: string;
  resultTitle: string;
  invertClientLogo: boolean;
  /** `/public` path to SVG/PNG, or null to show wordmark text in the hero */
  clientLogoPath: string | null;
  images: CaseStudyImageSet;
  alts: {
    hero: string;
    galleryStackTop: string;
    galleryStackBottom: string;
    galleryHeroTall: string;
    resultWide: string;
    resultTall: string;
    clientLogo: string;
  };
};

function repeatCardImage(
  path: string,
  name: string,
): { images: CaseStudyImageSet; alts: CaseStudyProjectDefaults["alts"] } {
  return {
    images: {
      hero: path,
      galleryStackTop: path,
      galleryStackBottom: path,
      galleryHeroTall: path,
      resultWide: path,
      resultTall: path,
    },
    alts: {
      hero: `${name} project`,
      galleryStackTop: `${name} detail`,
      galleryStackBottom: `${name} brand`,
      galleryHeroTall: `${name} showcase`,
      resultWide: `${name} results`,
      resultTall: `${name} lifestyle`,
      clientLogo: name,
    },
  };
}

const SLRP_IMAGES: CaseStudyImageSet = {
  hero: "/images/projects/slrp/slrp_header.png",
  galleryStackTop: "/images/projects/slrp/slrpBento3.png",
  galleryStackBottom: "/images/projects/slrp/slrpBento1.png",
  galleryHeroTall: "/images/projects/slrp/slrpBento2.png",
  resultWide: "/images/projects/slrp/slrpBento4.png",
  resultTall: "/images/projects/slrp/slrpBento5.png",
};

const SLRP_ALTS: CaseStudyProjectDefaults["alts"] = {
  hero: "SLRP website — Seriously Fun Ramen and Rolls",
  galleryStackTop: "SLRP mobile concepts",
  galleryStackBottom: "SLRP brand screen",
  galleryHeroTall: "SLRP menu and site visual",
  resultWide: "SLRP launch screens",
  resultTall: "SLRP lifestyle and food collage",
  clientLogo: "SLRP",
};

function bodyChallenge(name: string) {
  return `${name} needed a digital experience that matched the energy guests feel in person. Competing noise in the category, uneven messaging, and fragmented touchpoints were slowing discovery and weakening recall.`;
}

function bodySolution() {
  return `We rebuilt the story around clarity and rhythm: stronger hierarchy, a flexible visual system, and repeatable content blocks so launches stay fast without losing consistency. The result is a brand that feels intentional on every screen.`;
}

const UAE = "United Arab Emirates";

export const CASE_STUDY_PROJECTS: CaseStudyProjectDefaults[] = [
  (() => {
    const { images, alts } = repeatCardImage(
      "/images/projects/3fils/3fils_img.png",
      "3 Fils",
    );
    return {
      slug: "3-fils",
      internalTitle: "3 Fils",
      serviceTags: ["Branding", "Web Development"],
      fieldLabel: "Field",
      industry: "Restaurant",
      locationLabel: "Company Location",
      location: UAE,
      about: "Award-winning Asian restaurant with a loyal following and a menu built for sharing.",
      projectUrl: "https://example.com",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("3 Fils"),
      solutionTitle: "The solution",
      solutionBody: bodySolution(),
      resultTitle: "The result",
      invertClientLogo: true,
      clientLogoPath: "/logos/3fils.svg",
      images,
      alts,
    };
  })(),
  (() => {
    const { images, alts } = repeatCardImage(
      "/images/projects/brixjourney/brixjourney_img.png",
      "Brix Journey",
    );
    return {
      slug: "brix-journey",
      internalTitle: "Brix Journey",
      serviceTags: ["Branding", "Web Development"],
      fieldLabel: "Field",
      industry: "Hospitality",
      locationLabel: "Company Location",
      location: UAE,
      about:
        "A premium dining journey and digital booking flow for guests who expect polish at every step.",
      projectUrl: "https://example.com",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Brix Journey"),
      solutionTitle: "The solution",
      solutionBody: bodySolution(),
      resultTitle: "The result",
      invertClientLogo: false,
      clientLogoPath: null,
      images,
      alts,
    };
  })(),
  {
    slug: "slrp",
    internalTitle: "Slrp",
    serviceTags: ["Branding", "Web Development"],
    fieldLabel: "Field",
    industry: "Restaurant",
    locationLabel: "Company Location",
    location: UAE,
    about:
      "High-energy ramen and rolls inspired by Tokyo street culture, built for busy malls, bold flavors, and fast-moving crowds.",
    projectUrl: "https://www.slrpramen.com/",
    ctaLabel: "Visit Website",
    challengeTitle: "The challenge",
    challengeBody: `The original website looked static and didn't reflect the speed and energy of SLRP's in-store experience. Navigation and content hierarchy felt fragmented, making it harder for customers to discover what to order first. Visual identity assets were inconsistent across social and web touchpoints, reducing brand recall.`,
    solutionTitle: "The solution",
    solutionBody: `We rebuilt the experience around clear product categories, a stronger visual rhythm, and conversion-first sections. A high-contrast design system and bold typography were introduced to mirror the Tokyo-inspired brand personality. Reusable visual blocks made campaign launches and menu updates faster without losing consistency.`,
    resultTitle: "The result",
    invertClientLogo: true,
    clientLogoPath: "/logos/slrp.svg",
    images: SLRP_IMAGES,
    alts: SLRP_ALTS,
  },
  (() => {
    const { images, alts } = repeatCardImage(
      "/images/projects/bordomavi/bordomavi_img.png",
      "Bordo Mavi",
    );
    return {
      slug: "bordo-mavi",
      internalTitle: "Bordo Mavi",
      serviceTags: ["Branding", "Social Media"],
      fieldLabel: "Field",
      industry: "Restaurant",
      locationLabel: "Company Location",
      location: UAE,
      about:
        "Mediterranean experience with immersive storytelling across social and digital touchpoints.",
      projectUrl: "https://example.com",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Bordo Mavi"),
      solutionTitle: "The solution",
      solutionBody: bodySolution(),
      resultTitle: "The result",
      invertClientLogo: true,
      clientLogoPath: "/logos/bordomavi.svg",
      images,
      alts,
    };
  })(),
  (() => {
    const { images, alts } = repeatCardImage(
      "/images/projects/brixcafe/brixcafe_img.png",
      "Brix Cafe",
    );
    return {
      slug: "brix-cafe",
      internalTitle: "Brix Cafe",
      serviceTags: ["Branding", "Web Development"],
      fieldLabel: "Field",
      industry: "Cafe",
      locationLabel: "Company Location",
      location: UAE,
      about:
        "Cafe identity, website, and campaign launch assets for a dessert-led neighborhood favorite.",
      projectUrl: "https://example.com",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Brix Cafe"),
      solutionTitle: "The solution",
      solutionBody: bodySolution("Brix Cafe"),
      resultTitle: "The result",
      invertClientLogo: false,
      clientLogoPath: null,
      images,
      alts,
    };
  })(),
  (() => {
    const { images, alts } = repeatCardImage(
      "/images/projects/konbini/konbini_img.png",
      "Konbini",
    );
    return {
      slug: "konbini",
      internalTitle: "Konbini",
      serviceTags: ["Branding", "Web Development"],
      fieldLabel: "Field",
      industry: "Retail",
      locationLabel: "Company Location",
      location: UAE,
      about:
        "Retail-inspired visual system and conversion pages built for quick decisions.",
      projectUrl: "https://example.com",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Konbini"),
      solutionTitle: "The solution",
      solutionBody: bodySolution("Konbini"),
      resultTitle: "The result",
      invertClientLogo: true,
      clientLogoPath: "/logos/konbini.svg",
      images,
      alts,
    };
  })(),
  (() => {
    const { images, alts } = repeatCardImage(
      "/images/projects/kanji/kanji_img.png",
      "Kanji",
    );
    return {
      slug: "kanji",
      internalTitle: "Kanji",
      serviceTags: ["Branding"],
      fieldLabel: "Field",
      industry: "Restaurant",
      locationLabel: "Company Location",
      location: UAE,
      about:
        "Editorial-inspired food brand with a focused campaign rollout and distinctive art direction.",
      projectUrl: "https://example.com",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Kanji"),
      solutionTitle: "The solution",
      solutionBody: bodySolution("Kanji"),
      resultTitle: "The result",
      invertClientLogo: true,
      clientLogoPath: "/logos/kanji.svg",
      images,
      alts,
    };
  })(),
  (() => {
    const { images, alts } = repeatCardImage(
      "/images/projects/brixcafe/brix_img.png",
      "Brix",
    );
    return {
      slug: "brix",
      internalTitle: "Brix",
      serviceTags: ["Web Development"],
      fieldLabel: "Field",
      industry: "Hospitality",
      locationLabel: "Company Location",
      location: UAE,
      about:
        "Refined dessert-led brand and website refresh with a calmer, editorial pace.",
      projectUrl: "https://example.com",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Brix"),
      solutionTitle: "The solution",
      solutionBody: bodySolution("Brix"),
      resultTitle: "The result",
      invertClientLogo: true,
      clientLogoPath: "/logos/brix.svg",
      images,
      alts,
    };
  })(),
];

const bySlug = Object.fromEntries(
  CASE_STUDY_PROJECTS.map((p) => [p.slug, p]),
) as Record<string, CaseStudyProjectDefaults>;

export const CASE_STUDY_SLUGS = CASE_STUDY_PROJECTS.map((p) => p.slug);

export function getCaseStudyFallback(
  slug: string,
): CaseStudyProjectDefaults | undefined {
  return bySlug[slug];
}

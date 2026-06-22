/**
 * Fallback content for /work/[slug] when Sanity has no doc or empty fields.
 * Single-image projects reuse their card image across hero / gallery / result slots.
 */

export type WorkProjectImageSet = {
  hero: string;
  galleryStackTop: string;
  galleryStackBottom: string | null;
  galleryHeroTall: string;
  resultWide: string;
  resultTall: string;
};

export type WorkProjectDefaults = {
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
  images: WorkProjectImageSet;
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

function projectImagePath(folder: string, file: string) {
  return `/images/projects/${folder}/${file}`;
}

function usePublicProjectAssets(
  folder: string,
  name: string,
  files: {
    header: string;
    phone: string;
    accent: string;
    website: string;
    card: string;
  },
): { images: WorkProjectImageSet; alts: WorkProjectDefaults["alts"] } {
  return {
    images: {
      hero: projectImagePath(folder, files.header),
      galleryStackTop: projectImagePath(folder, files.phone),
      galleryStackBottom: null,
      galleryHeroTall: projectImagePath(folder, files.website),
      resultWide: projectImagePath(folder, files.card),
      resultTall: projectImagePath(folder, files.accent),
    },
    alts: {
      hero: `${name} header preview`,
      galleryStackTop: `${name} phone mockup`,
      galleryStackBottom: `${name} accent composition`,
      galleryHeroTall: `${name} website showcase`,
      resultWide: `${name} project cover`,
      resultTall: `${name} brand detail`,
      clientLogo: name,
    },
  };
}

const SLRP_IMAGES: WorkProjectImageSet = {
  hero: "/images/projects/slrp/slrp_header.png",
  galleryStackTop: "/images/projects/slrp/slrpBento3.png",
  galleryStackBottom: "/images/projects/slrp/slrpBento1.png",
  galleryHeroTall: "/images/projects/slrp/slrpBento2.png",
  resultWide: "/images/projects/slrp/slrpBento4.png",
  resultTall: "/images/projects/slrp/slrpBento5.png",
};

const SLRP_ALTS: WorkProjectDefaults["alts"] = {
  hero: "SLRP website — Seriously Fun Ramen and Rolls",
  galleryStackTop: "SLRP mobile concepts",
  galleryStackBottom: "SLRP brand screen",
  galleryHeroTall: "SLRP menu and site visual",
  resultWide: "SLRP launch screens",
  resultTall: "SLRP lifestyle and food collage",
  clientLogo: "SLRP",
};

function bodyChallenge(name: string) {
  return `${name} felt great in person, but that energy wasn't coming through online. The messaging shifted from one channel to the next, the brand looked different everywhere you found it, and new customers had to work too hard to figure out what to try first.`;
}

function bodySolution() {
  return `We tightened the whole thing up: a clearer story, one consistent look, and reusable content blocks the team can launch with quickly. Now the brand reads the same wherever you meet it — and it actually sounds like the place you'd visit.`;
}

const UAE = "United Arab Emirates";

export const WORK_PROJECTS: WorkProjectDefaults[] = [
  (() => {
    const { images, alts } = usePublicProjectAssets(
      "3fils",
      "3 Fils",
      {
        header: "3Fils Header.png",
        phone: "3Fils Phone.png",
        accent: "3Fils Accent.png",
        website: "3Fils Website.png",
        card: "3fils_img.png",
      },
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
      projectUrl: "https://www.3fils.com/",
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
    const { images, alts } = usePublicProjectAssets(
      "brixjourney",
      "Brix Journey",
      {
        header: "Brix Journey Header.png",
        phone: "Brix Journey Phone.png",
        accent: "Brix Journey Accent.png",
        website: "Brix Journey Website.png",
        card: "brixjourney_img.png",
      },
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
        "A premium dining brand and booking flow that stays polished from the first tap to the table.",
      projectUrl: "https://www.brixjourney.com/",
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
    challengeBody: `The old site felt flat — none of the speed or noise you get walking into SLRP in person. The menu was hard to scan, so first-timers didn't know what to order, and the brand looked different on the site than it did on social.`,
    solutionTitle: "The solution",
    solutionBody: `We rebuilt the site around clear menu categories and bold, high-contrast design that matches the Tokyo street energy. Reusable sections let the team push new menus and campaigns fast, and the brand now looks the same whether you find it on a phone, a screen, or a feed.`,
    resultTitle: "The result",
    invertClientLogo: true,
    clientLogoPath: "/logos/slrp.svg",
    images: SLRP_IMAGES,
    alts: SLRP_ALTS,
  },
  (() => {
    const { images, alts } = usePublicProjectAssets(
      "bordomavi",
      "Bordo Mavi",
      {
        header: "Bordomavi Header.png",
        phone: "Bordomavi Phone Mockup.png",
        accent: "Bordomavi Header.png",
        website: "Bordomavi Website.png",
        card: "bordomavi_img.png",
      },
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
        "A Mediterranean restaurant brand with a social presence that tells its story across every post.",
      projectUrl: "https://www.bordomavidubai.com/",
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
    const { images, alts } = usePublicProjectAssets(
      "brixcafe",
      "Brix Cafe",
      {
        header: "Brix Cafe Header.png",
        phone: "Brix Cafe Phone.png",
        accent: "Brix Cafe Accent.png",
        website: "Brix Cafe Website.png",
        card: "brixcafe_img.png",
      },
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
        "Brand, website, and launch campaign for a dessert-led neighbourhood café people keep coming back to.",
      projectUrl: "https://www.brixtable.com/cafe",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Brix Cafe"),
      solutionTitle: "The solution",
      solutionBody: bodySolution(),
      resultTitle: "The result",
      invertClientLogo: false,
      clientLogoPath: null,
      images,
      alts,
    };
  })(),
  (() => {
    const { images, alts } = usePublicProjectAssets(
      "konbini",
      "Konbini",
      {
        header: "Konbini Header.png",
        phone: "Konbini Phone.png",
        accent: "Konbini Accent.png",
        website: "Konbini Website.png",
        card: "konbini_img.png",
      },
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
        "A retail-inspired look and easy-to-shop pages built to help people decide fast.",
      projectUrl: "https://www.3fils.com/the-concepts/kombini",
      ctaLabel: "Visit Website",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Konbini"),
      solutionTitle: "The solution",
      solutionBody: bodySolution(),
      resultTitle: "The result",
      invertClientLogo: true,
      clientLogoPath: "/logos/konbini.svg",
      images,
      alts,
    };
  })(),
  (() => {
    const { images, alts } = usePublicProjectAssets(
      "kanji",
      "Kanji",
      {
        header: "Kanji Header.png",
        phone: "Kanji Phone.png",
        accent: "Kanji Accent.png",
        website: "Kanji Website.png",
        card: "kanji_img.png",
      },
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
        "An editorial-style food brand with sharp art direction and a focused launch campaign.",
      projectUrl: "https://www.instagram.com/eatkanji/",
      ctaLabel: "Visit Instagram",
      challengeTitle: "The challenge",
      challengeBody: bodyChallenge("Kanji"),
      solutionTitle: "The solution",
      solutionBody: bodySolution(),
      resultTitle: "The result",
      invertClientLogo: true,
      clientLogoPath: "/logos/kanji.svg",
      images,
      alts,
    };
  })(),
];

const bySlug = Object.fromEntries(
  WORK_PROJECTS.map((p) => [p.slug, p]),
) as Record<string, WorkProjectDefaults>;

export const WORK_PROJECT_SLUGS = WORK_PROJECTS.map((p) => p.slug);

export function getWorkProjectFallback(
  slug: string,
): WorkProjectDefaults | undefined {
  return bySlug[slug];
}

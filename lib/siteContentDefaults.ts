export type NavLink = { label: string; href: string };
export type FaqItem = { question: string; answer: string };
export type SocialLink = { label: string; href: string };

export type FeaturedCase = {
  title: string;
  slug: string;
  description: string;
  imagePath: string;
};

export type FeaturedWorkScrollItem = {
  title: string;
  description: string;
  href: string;
  videoPath: string;
  iconPath: string;
  socialLabel: string;
  tags: string[];
  tagGlow?: ("orange" | "white")[];
};

export type ServiceCardContent = {
  title: string;
  description?: string;
  priceLine?: string;
  flipDescription?: string;
};

export type ClientLogo = {
  name: string;
  logoPath: string;
  order: number;
};

export type HomepageV2Content = {
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImagePath: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  workTitle: string;
  workSubtitle: string;
  workViewAllLabel: string;
  workViewAllHref: string;
  workScrollItems: FeaturedWorkScrollItem[];
  servicesTitle: string;
  serviceCards: ServiceCardContent[];
  showreelTitle: string;
  showreelVideoPath: string;
  showreelPosterPath: string;
  showreelCtaLabel: string;
  showreelCtaHref: string;
  analyticsVideoPath: string;
  analyticsVideoPosterPath: string;
  bentoCocktailImagePath: string;
  bentoFoodImagePath: string;
};

export type AboutPageContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  section1Title: string;
  section1Body: string;
  section2Title: string;
  section2Body: string;
  ctaPrefix: string;
  ctaLinkLabel: string;
  ctaLinkHref: string;
};

export type WorkPageSettingsContent = {
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  emptyFilterMessage: string;
};

/** Local /public fallbacks when Sanity has no uploaded image yet. */
export const homepageV2ImageFallbacks = {
  hero: "/images/HeroImage.png",
  bentoCocktail: "/images/bento/service-suite-cocktail.png",
  bentoFood: "/images/bento/service-suite-food.png",
} as const;

export const siteContentDefaults = {
  site: {
    siteTitle: "Sandspire",
    siteDescription:
      "We create brands, experiences, and workflows that work without friction.",
    phone: "+971 56 198 0747",
    email: "",
  },
  nav: {
    links: [
      { label: "Services", href: "/#services" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ] satisfies NavLink[],
    ctaLabel: "Get in touch",
    ctaHref: "/contact",
  },
  footer: {
    taglineLine1: "Great design should",
    taglineLine2: "feel invisible.",
    blurb:
      "We are a creative agency supporting businesses from branding, all the way to automation.",
    copyright: "© Copyright Sandspire | Design by Jabrni",
    socialLinks: [
      { label: "LinkedIn", href: "/coming-soon" },
      { label: "Instagram", href: "/coming-soon" },
      { label: "Twitter", href: "/coming-soon" },
    ] satisfies SocialLink[],
  },
  contact: {
    eyebrow: "Contact us",
    headline: "Let's Create Something Meaningful",
    intro:
      "Whether you're starting from scratch or need a brand refresh, we're here to help bring your vision to life.",
    faqDefault: [
      {
        question: "How long does a project take?",
        answer:
          "Most projects take 4–8 weeks after discovery. Timeline depends on scope, approvals, and how quickly assets are ready.",
      },
      {
        question: "Do you work with international clients?",
        answer:
          "Yes. We collaborate with teams worldwide and keep things smooth with async updates and scheduled check-ins.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes. We can structure work into milestones so you pay in phases as deliverables are completed.",
      },
      {
        question: "What do I need to get started?",
        answer:
          "A short brief (goals + audience), any brand assets you already have, and a target launch window. If you're missing pieces, we'll guide you.",
      },
    ] satisfies FaqItem[],
    faqHome2: [
      {
        question: "How long does a project take?",
        answer:
          "Most projects land in the 4–8 week range after kickoff, depending on scope, feedback speed, and asset readiness.",
      },
      {
        question: "Do you work with international clients?",
        answer:
          "Yes. We collaborate across time zones with async updates and scheduled reviews so progress stays visible.",
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes. Larger engagements can be split into milestone payments as deliverables are approved.",
      },
      {
        question: "Where are you based?",
        answer:
          "Sandspire is based in the UAE and works with regional and international teams — remote-first when it helps the schedule.",
      },
    ] satisfies FaqItem[],
  },
  homepage: {
    heroEyebrow: "Hey, we're a",
    heroHeadline: "Creative Studio",
    heroSubheadline: "",
    heroBodyTitle: "Great brands should feel\neffortless.",
    heroBodyText:
      "From strategy to launch, we create brands, experiences, and workflows that work without friction—so your customers never have to fight the experience.",
    analyticsVideoPath: "/videos/InstagramViewsAnalytics.mp4",
    analyticsVideoPosterPath: "/images/bento/InstagramViewsAnalyticsFallback2.png",
    serviceCards: [
      { title: "See real results\nyou can measure", description: "", priceLine: "" },
      { title: "AI Automation", description: "", priceLine: "Starting from AED 10,000" },
      { title: "Web Design", description: "", priceLine: "Starting from AED 5,000" },
      { title: "Social Media Marketing", description: "", priceLine: "Starting from AED 5,000" },
    ] satisfies ServiceCardContent[],
    heroVideoPath: "/videos/HeroVideo-2%20(1).mp4",
    heroVideoPosterPath: "/images/hero/HeroVideoFallback.png",
    heroServices: [
      { num: "#01", label: "Brand Strategy" },
      { num: "#02", label: "Web Design" },
      { num: "#03", label: "Social Media" },
      { num: "#04", label: "AI Automation" },
    ],
    whoTitle: "Who is Sandspire?",
    whoBody:
      "We are a creative agency supporting businesses from branding, all the way to automation.",
    servicesEyebrow: "Agency Services",
    servicesTitle: "What we do",
    caseStudiesTitle: "Crafting legacy for teams that scale",
    featuredCases: [
      {
        title: "3 Fils",
        slug: "3-fils",
        description:
          "Award-winning Asian restaurant with a loyal following and a menu built for sharing.",
        imagePath: "/images/projects/3fils/3fils_img.png",
      },
      {
        title: "Brix Journey",
        slug: "brix-journey",
        description:
          "A premium dining journey and digital booking flow for guests who expect polish at every step.",
        imagePath: "/images/projects/brixjourney/brixjourney_img.png",
      },
      {
        title: "Slrp",
        slug: "slrp",
        description:
          "High-energy ramen and rolls inspired by Tokyo street culture, built for busy malls, bold flavors, and fast-moving crowds.",
        imagePath: "/images/projects/slrp/slrp_img.png",
      },
    ] satisfies FeaturedCase[],
  },
  homepageV2: {
    metaTitle: "Sandspire Home 2",
    metaDescription:
      "Alternate Sandspire homepage: hero, featured work, service suite, showreel, contact and FAQ.",
    heroHeadline: "AI-native creative studio",
    heroSubheadline:
      "We create brands, experiences, and workflows that work without friction.",
    heroImagePath: homepageV2ImageFallbacks.hero,
    heroPrimaryCtaLabel: "Get Started",
    heroPrimaryCtaHref: "/home-2#contact",
    heroSecondaryCtaLabel: "About Us",
    heroSecondaryCtaHref: "/about",
    workTitle: "Our Work",
    workSubtitle: "Selected works spanning our full range",
    workViewAllLabel: "View All Work",
    workViewAllHref: "/work",
    workScrollItems: [
      {
        title: "3 Fils",
        description:
          "Award-winning Asian restaurant with a loyal following and a menu built for sharing.",
        href: "/work/3-fils",
        videoPath: "/videos/heroSideImg_3fils.mp4",
        iconPath: "/logos/3fils.svg",
        socialLabel: "3.fils",
        tags: ["Branding", "Web Development"],
        tagGlow: ["orange", "white"],
      },
      {
        title: "Kanji",
        description:
          "Editorial-inspired food brand with a focused campaign rollout and distinctive art direction.",
        href: "/work/kanji",
        videoPath: "/videos/heroSideImg_kanji.mp4",
        iconPath: "/logos/kanji.svg",
        socialLabel: "eatkanji",
        tags: ["Branding"],
        tagGlow: ["orange"],
      },
      {
        title: "Slrp",
        description:
          "High-energy ramen and rolls inspired by Tokyo street culture — built for busy malls, bold flavors, and fast-moving crowds.",
        href: "/work/slrp",
        videoPath: "/videos/heroSideImg_slrpramen.mp4",
        iconPath: "/logos/slrp.svg",
        socialLabel: "slrp.ramen",
        tags: ["Branding", "Web Development"],
        tagGlow: ["orange", "white"],
      },
    ] satisfies FeaturedWorkScrollItem[],
    servicesTitle: "Service Suite",
    serviceCards: [
      { title: "Post-Production & Video Editing", flipDescription: "Cuts, color, and sound—ready to publish." },
      { title: "AI-Infused Production", flipDescription: "Faster drafts, human polish throughout." },
      { title: "Brand Experiences", flipDescription: "Identity that holds across touchpoints." },
      { title: "Social Media Management", flipDescription: "Plan, post, and refine every month." },
      { title: "UGC Content & SEO", flipDescription: "Creator content built to be found." },
    ] satisfies ServiceCardContent[],
    showreelTitle: "Our 360° Showreel",
    showreelVideoPath: "/videos/HeroVideo-2%20(1).mp4",
    showreelPosterPath: "/images/hero/HeroVideoFallback.png",
    showreelCtaLabel: "View All Services",
    showreelCtaHref: "/home-2#services",
    analyticsVideoPath: "/videos/InstagramViewsAnalytics.mp4",
    analyticsVideoPosterPath: "/images/bento/InstagramViewsAnalyticsFallback1.png",
    bentoCocktailImagePath: homepageV2ImageFallbacks.bentoCocktail,
    bentoFoodImagePath: homepageV2ImageFallbacks.bentoFood,
  },
  about: {
    metaTitle: "About — Sandspire",
    metaDescription:
      "Sandspire is a creative studio for brand strategy, web design, social, and automation—built for teams that want clarity and craft.",
    eyebrow: "About",
    headline: "A studio for brands that want to feel effortless",
    intro:
      "We're Sandspire—a creative team helping businesses go from first impression to daily operations without friction. Strategy, design, content, and automation sit together so your story, site, and workflows stay in sync.",
    section1Title: "How we work",
    section1Body:
      "We start with goals and audience, then shape identity and UX so every touchpoint reinforces the same idea. Small teams get senior attention; larger orgs get systems they can grow into—not one-off files nobody can maintain.",
    section2Title: "What we care about",
    section2Body:
      "Clarity over noise, craft over trends, and outcomes you can point to. Whether it's a launch, a refresh, or tooling that saves your team hours each week, we build for longevity—not just the screenshot.",
    ctaPrefix: "Ready to talk?",
    ctaLinkLabel: "Get in touch",
    ctaLinkHref: "/contact",
  },
  workPage: {
    metaTitle: "Work — Sandspire",
    metaDescription: "Selected brand, web, and campaign projects from Sandspire.",
    headline: "Selected Work",
    subheadline:
      "A curated set of brand, web, and campaign projects crafted for teams that care about details.",
    emptyFilterMessage: "Nothing in this category yet. Try another filter.",
  },
  clientLogos: [
    { name: "3 Fils", logoPath: "/logos/3fils.svg", order: 0 },
    { name: "Brix Journey", logoPath: "/logos/brix.svg", order: 1 },
    { name: "Konbini", logoPath: "/logos/konbini.svg", order: 2 },
    { name: "Slrp", logoPath: "/logos/slrp.svg", order: 3 },
    { name: "Kanji", logoPath: "/logos/kanji.svg", order: 4 },
    { name: "Bordo Mavi", logoPath: "/logos/bordomavi.svg", order: 5 },
  ] satisfies ClientLogo[],
} as const;

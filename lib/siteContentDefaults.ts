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
  brandStrategyImagePaths: string[];
  serviceFlowDiagramImagePath: string;
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
      "Sandspire is a creative studio in the UAE. We design websites, run social, and build AI that handles the busywork.",
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
    ctaLabel: "Start a project",
    ctaHref: "/contact",
  },
  footer: {
    taglineLine1: "Creative that",
    taglineLine2: "pulls its weight.",
    blurb:
      "A creative studio for brands that want to look sharp and run smoother — websites, social, and AI that takes the repetitive stuff off your plate.",
    copyright: "© Copyright Sandspire | Design by Jabrni",
    socialLinks: [
      { label: "LinkedIn", href: "/coming-soon" },
      { label: "Instagram", href: "/coming-soon" },
      { label: "Twitter", href: "/coming-soon" },
    ] satisfies SocialLink[],
  },
  contact: {
    eyebrow: "Say hello",
    headline: "Tell us what you're building",
    intro:
      "Got a website to launch, a feed to fill, or a process eating your week? Send a note — we usually reply within one business day.",
    faqDefault: [
      {
        question: "How long does a website take?",
        answer:
          "Most sites go live in 4–6 weeks. The exact timeline comes down to how many pages you need, how fast feedback lands, and whether copy and photos are ready.",
      },
      {
        question: "What can AI actually do for my business?",
        answer:
          "Usually the boring, repetitive stuff: replying to leads, sorting enquiries, drafting content, and moving info between your tools. We map your day-to-day first, then automate the parts that waste the most time.",
      },
      {
        question: "Do you work with clients outside the UAE?",
        answer:
          "Yes. We're based in the UAE and work with teams across time zones. Async updates and scheduled calls keep everyone in the loop.",
      },
      {
        question: "Can I pay in stages?",
        answer:
          "Yes. We split larger projects into milestones, so you pay as each piece is finished — not all upfront.",
      },
      {
        question: "What do you need from me to start?",
        answer:
          "A quick brief on your goals and audience, anything you already have (logo, photos, old site), and a rough launch date. Missing a few pieces? We'll help you fill them in.",
      },
    ] satisfies FaqItem[],
    faqHome2: [
      {
        question: "Do you create the content, or just post it?",
        answer:
          "Both. We plan the calendar, shoot and edit short-form video, write the captions, and post it — then send you the numbers each month. You can be as hands-on or hands-off as you like.",
      },
      {
        question: "What's UGC, and do I need it?",
        answer:
          "UGC is content that looks like it came from a real customer, not an ad. It's great for building trust and works hard on Reels, TikTok, and product pages. If your audience scrolls past polished ads, it's worth a try.",
      },
      {
        question: "How soon will I see results on social?",
        answer:
          "Consistency takes a few months to compound. Most clients see steadier engagement within 60–90 days, and we report on what's working so we can do more of it.",
      },
      {
        question: "Can I pay in stages?",
        answer:
          "Yes. Monthly social retainers are billed month to month, and larger one-off projects can be split into milestones.",
      },
      {
        question: "Where are you based?",
        answer:
          "Sandspire is in the UAE and works with regional and international brands — remote-first whenever that keeps things moving faster.",
      },
    ] satisfies FaqItem[],
  },
  homepage: {
    heroEyebrow: "We're a creative studio for",
    heroHeadline: "Web & AI",
    heroSubheadline: "",
    heroBodyTitle: "A sharp website,\nwired to run itself.",
    heroBodyText:
      "We design and build fast, good-looking websites — then plug in AI to handle the follow-ups, the routing, and the busywork. You get the credit; the robots get the grunt work.",
    analyticsVideoPath: "/videos/InstagramViewsAnalytics.mp4",
    analyticsVideoPosterPath: "/images/bento/InstagramViewsAnalyticsFallback2.png",
    webDesignImages: [
      "/images/bento-web/top1-web.webp",
      "/images/bento-web/top2-web.webp",
      "/images/bento-web/top3-web.webp",
      "/images/bento-web/middle1-web.webp",
      "/images/bento-web/middle2-web.webp",
      "/images/bento-web/bottom1-web.webp",
      "/images/bento-web/bottom2-web.webp",
      "/images/bento-web/middle 3-web.webp",
      "/images/bento-web/middle 4-web.webp",
    ],
    serviceFlowDiagramImagePath: "/images/Service Icon Group.svg",
    serviceCards: [
      { title: "Numbers that\nactually move", description: "", priceLine: "" },
      { title: "AI Automation", description: "", priceLine: "From AED 10,000" },
      { title: "Web Design", description: "", priceLine: "From AED 5,000" },
      { title: "Social Media Marketing", description: "", priceLine: "From AED 5,000" },
    ] satisfies ServiceCardContent[],
    heroVideoPath: "/videos/HeroVideo-2%20(1).mp4",
    heroVideoPosterPath: "/images/hero/HeroVideoFallback.png",
    heroServices: [
      { num: "#01", label: "Web Design" },
      { num: "#02", label: "AI Automation" },
      { num: "#03", label: "Brand Strategy" },
      { num: "#04", label: "Social Media" },
    ],
    whoTitle: "Who is Sandspire?",
    whoBody:
      "We're a small creative studio in the UAE. We design websites, build brands, and set up AI to quietly handle the repetitive work — so your business looks sharp and the day-to-day stops piling up.",
    servicesEyebrow: "Our services",
    servicesTitle: "What we do",
    caseStudiesTitle: "Recent work we're proud of",
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
          "A premium dining experience with a booking flow that stays polished from the first tap to the table.",
        imagePath: "/images/projects/brixjourney/brixjourney_img.png",
      },
      {
        title: "Slrp",
        slug: "slrp",
        description:
          "Ramen and rolls with Tokyo street energy — a site built for busy malls, bold flavours, and fast decisions.",
        imagePath: "/images/projects/slrp/slrp_img.png",
      },
    ] satisfies FeaturedCase[],
  },
  homepageV2: {
    metaTitle: "Sandspire — Social Media & Content Studio",
    metaDescription:
      "Sandspire runs social media, UGC, and content for brands that want feeds worth following. We plan, shoot, post, and report — so you don't have to.",
    heroHeadline: "Social worth following",
    heroSubheadline:
      "We plan, shoot, post, and report — so your brand shows up every day without eating your week. Short-form, UGC, community, the lot.",
    heroImagePath: homepageV2ImageFallbacks.hero,
    heroPrimaryCtaLabel: "Start a project",
    heroPrimaryCtaHref: "/home-2#contact",
    heroSecondaryCtaLabel: "About Us",
    heroSecondaryCtaHref: "/about",
    workTitle: "Our Work",
    workSubtitle: "A few brands we've helped show up online",
    workViewAllLabel: "View All Work",
    workViewAllHref: "/work",
    workScrollItems: [
      {
        title: "3 Fils",
        description:
          "Award-winning Asian restaurant with a loyal following and a menu built for sharing.",
        href: "/work/3-fils",
        videoPath: "/videos/heroSideImg_3fils.mp4",
        iconPath: "/images/home-2/work-icons/3-fils.png",
        socialLabel: "3.fils",
        tags: ["Branding", "Web Development"],
        tagGlow: ["orange", "white"],
      },
      {
        title: "Kanji",
        description:
          "An editorial-style food brand with sharp art direction and a focused launch campaign.",
        href: "/work/kanji",
        videoPath: "/videos/heroSideImg_kanji.mp4",
        iconPath: "/images/home-2/work-icons/kanji.png",
        socialLabel: "eatkanji",
        tags: ["Branding"],
        tagGlow: ["orange"],
      },
      {
        title: "Slrp",
        description:
          "Ramen and rolls with Tokyo street energy — a site built for busy malls, bold flavours, and fast decisions.",
        href: "/work/slrp",
        videoPath: "/videos/heroSideImg_slrpramen.mp4",
        iconPath: "/images/home-2/work-icons/slrp.png",
        socialLabel: "slrp.ramen",
        tags: ["Branding", "Web Development"],
        tagGlow: ["orange", "white"],
      },
    ] satisfies FeaturedWorkScrollItem[],
    servicesTitle: "Service Suite",
    serviceCards: [
      { title: "Social Media Management", flipDescription: "Plan, post, reply, repeat — every week." },
      { title: "UGC & Creator Content", flipDescription: "Real faces, real reach, on brand." },
      { title: "Short-Form Video Editing", flipDescription: "Hooks, cuts, captions — ready to post." },
      { title: "Content & SEO", flipDescription: "Found on Google, not just the feed." },
      { title: "AI-Assisted Production", flipDescription: "More posts a week, same small team." },
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
    brandStrategyImagePaths: [
      "/images/bento/top-1.webp",
      "/images/bento/top-2.webp",
      "/images/bento/middle-1.webp",
      "/images/bento/middle-2.webp",
      "/images/bento/middle-3.webp",
      "/images/bento/bottom-1.webp",
      "/images/bento/bottom-2.webp",
    ] as string[],
    serviceFlowDiagramImagePath: "/images/Service Icon Group.svg",
  },
  about: {
    metaTitle: "About — Sandspire",
    metaDescription:
      "Sandspire is a small creative studio in the UAE — websites, brand, social, and AI automation, handled by people who actually pick up the phone.",
    eyebrow: "About",
    headline: "A small studio that does the heavy lifting",
    intro:
      "We're Sandspire — a creative team in the UAE that designs websites, builds brands, runs social, and sets up AI to take the repetitive work off your plate. Small enough to care about the details, senior enough to get it done.",
    section1Title: "How we work",
    section1Body:
      "We start with your goal and your audience, then build backwards from there. You get one team across design, content, and automation — so your site, your feed, and your tools actually talk to each other instead of pulling in three directions.",
    section2Title: "What we care about",
    section2Body:
      "Clear over clever, useful over flashy, and results you can point to. Whether it's a launch, a refresh, or a workflow that saves your team a few hours a week, we build things meant to last — not just look good in a screenshot.",
    ctaPrefix: "Got something in mind?",
    ctaLinkLabel: "Start a project",
    ctaLinkHref: "/contact",
  },
  workPage: {
    metaTitle: "Work — Sandspire",
    metaDescription: "Brand, web, and social projects from Sandspire — built for real businesses across the UAE.",
    headline: "Selected Work",
    subheadline:
      "A few brand, web, and social projects we've shipped for teams that sweat the details.",
    emptyFilterMessage: "Nothing here yet. Try another filter.",
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

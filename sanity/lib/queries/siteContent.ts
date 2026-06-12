import { cache } from "react";

import {
  siteContentDefaults,
  type AboutPageContent,
  type ClientLogo,
  type FaqItem,
  type FeaturedCase,
  type FeaturedWorkScrollItem,
  type HomepageV2Content,
  type NavLink,
  type ServiceCardContent,
  type SocialLink,
  type WorkPageSettingsContent,
} from "@/lib/siteContentDefaults";

import { client } from "../client";

const SANITY_FETCH_MS = 12_000;

async function fetchWithTimeout<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<"timeout">((resolve) => {
    timeoutId = setTimeout(() => resolve("timeout"), SANITY_FETCH_MS);
  });

  const fetchPromise = client.fetch<T>(query, params, { next: { tags: ["siteContent"] } });

  try {
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    if (result === "timeout") {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[sandspire] Site content Sanity fetch timed out (${SANITY_FETCH_MS}ms) — using code fallbacks.`);
      }
      return null;
    }
    return result;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[sandspire] Site content Sanity fetch failed:", err);
    }
    return null;
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
}

function pickString(value: string | null | undefined, fallback: string): string {
  return value?.trim() ? value.trim() : fallback;
}

function pickArray<T>(value: T[] | null | undefined, fallback: T[]): T[] {
  return value && value.length > 0 ? value : fallback;
}

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  phone,
  email,
  navLinks[]{ label, href },
  ctaLabel,
  ctaHref,
  footerTaglineLine1,
  footerTaglineLine2,
  footerBlurb,
  footerCopyright,
  socialLinks[]{ label, href },
  contactEyebrow,
  contactHeadline,
  contactIntro,
  faqDefault[]{ question, answer },
  faqHome2[]{ question, answer }
}`;

const HOMEPAGE_QUERY = `*[_type == "homepage" && _id == "homepage"][0]{
  heroEyebrow,
  heroHeadline,
  heroSubheadline,
  heroBodyTitle,
  heroBodyText,
  heroVideoPath,
  heroVideoPosterPath,
  analyticsVideoPath,
  analyticsVideoPosterPath,
  heroServices[]{ num, label },
  whoTitle,
  whoBody,
  servicesEyebrow,
  servicesTitle,
  caseStudiesTitle,
  featuredCases[]{ title, slug, description, imagePath },
  serviceCards[]{ title, description, priceLine, flipDescription }
}`;

const HOMEPAGE_V2_QUERY = `*[_type == "homepageV2" && _id == "homepageV2"][0]{
  metaTitle,
  metaDescription,
  heroHeadline,
  heroSubheadline,
  heroImagePath,
  heroPrimaryCtaLabel,
  heroPrimaryCtaHref,
  heroSecondaryCtaLabel,
  heroSecondaryCtaHref,
  workTitle,
  workSubtitle,
  workViewAllLabel,
  workViewAllHref,
  workScrollItems[]{
    title,
    description,
    href,
    videoPath,
    iconPath,
    socialLabel,
    tags
  },
  servicesTitle,
  serviceCards[]{ title, description, priceLine, flipDescription },
  showreelTitle,
  showreelVideoPath,
  showreelPosterPath,
  showreelCtaLabel,
  showreelCtaHref,
  analyticsVideoPath,
  analyticsVideoPosterPath,
  bentoCocktailImagePath,
  bentoFoodImagePath
}`;

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  metaTitle,
  metaDescription,
  eyebrow,
  headline,
  intro,
  section1Title,
  section1Body,
  section2Title,
  section2Body,
  ctaPrefix,
  ctaLinkLabel,
  ctaLinkHref
}`;

const WORK_PAGE_SETTINGS_QUERY = `*[_type == "workPageSettings" && _id == "workPageSettings"][0]{
  metaTitle,
  metaDescription,
  headline,
  subheadline,
  emptyFilterMessage
}`;

const CLIENT_LOGOS_QUERY = `*[_type == "clientLogo"] | order(order asc, name asc){
  name,
  logoPath,
  order
}`;

export type SiteSettingsContent = {
  siteTitle: string;
  siteDescription: string;
  phone: string;
  email: string;
  nav: {
    links: NavLink[];
    ctaLabel: string;
    ctaHref: string;
  };
  footer: {
    taglineLine1: string;
    taglineLine2: string;
    blurb: string;
    copyright: string;
    socialLinks: SocialLink[];
  };
  contact: {
    eyebrow: string;
    headline: string;
    intro: string;
    faqDefault: FaqItem[];
    faqHome2: FaqItem[];
  };
};

export type HomepageContent = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBodyTitle: string;
  heroBodyText: string;
  heroVideoPath: string;
  heroVideoPosterPath: string;
  analyticsVideoPath: string;
  analyticsVideoPosterPath: string;
  heroServices: { num: string; label: string }[];
  whoTitle: string;
  whoBody: string;
  servicesEyebrow: string;
  servicesTitle: string;
  caseStudiesTitle: string;
  featuredCases: FeaturedCase[];
  serviceCards: ServiceCardContent[];
};

async function getSiteSettingsImpl(): Promise<SiteSettingsContent> {
  const d = siteContentDefaults;
  const doc = await fetchWithTimeout<Record<string, unknown>>(SITE_SETTINGS_QUERY);
  if (!doc) {
    return {
      siteTitle: d.site.siteTitle,
      siteDescription: d.site.siteDescription,
      phone: d.site.phone,
      email: d.site.email,
      nav: d.nav,
      footer: d.footer,
      contact: d.contact,
    };
  }

  return {
    siteTitle: pickString(doc.siteTitle as string, d.site.siteTitle),
    siteDescription: pickString(doc.siteDescription as string, d.site.siteDescription),
    phone: pickString(doc.phone as string, d.site.phone),
    email: pickString(doc.email as string, d.site.email),
    nav: {
      links: pickArray(doc.navLinks as NavLink[], d.nav.links),
      ctaLabel: pickString(doc.ctaLabel as string, d.nav.ctaLabel),
      ctaHref: pickString(doc.ctaHref as string, d.nav.ctaHref),
    },
    footer: {
      taglineLine1: pickString(doc.footerTaglineLine1 as string, d.footer.taglineLine1),
      taglineLine2: pickString(doc.footerTaglineLine2 as string, d.footer.taglineLine2),
      blurb: pickString(doc.footerBlurb as string, d.footer.blurb),
      copyright: pickString(doc.footerCopyright as string, d.footer.copyright),
      socialLinks: pickArray(doc.socialLinks as SocialLink[], d.footer.socialLinks),
    },
    contact: {
      eyebrow: pickString(doc.contactEyebrow as string, d.contact.eyebrow),
      headline: pickString(doc.contactHeadline as string, d.contact.headline),
      intro: pickString(doc.contactIntro as string, d.contact.intro),
      faqDefault: pickArray(doc.faqDefault as FaqItem[], d.contact.faqDefault),
      faqHome2: pickArray(doc.faqHome2 as FaqItem[], d.contact.faqHome2),
    },
  };
}

async function getHomepageContentImpl(): Promise<HomepageContent> {
  const d = siteContentDefaults.homepage;
  const doc = await fetchWithTimeout<Record<string, unknown>>(HOMEPAGE_QUERY);
  if (!doc) {
    return {
      ...d,
      heroServices: [...d.heroServices],
      featuredCases: [...d.featuredCases],
      serviceCards: [...d.serviceCards],
    };
  }

  return {
    heroEyebrow: pickString(doc.heroEyebrow as string, d.heroEyebrow),
    heroHeadline: pickString(doc.heroHeadline as string, d.heroHeadline),
    heroSubheadline: pickString(doc.heroSubheadline as string, d.heroSubheadline),
    heroBodyTitle: pickString(doc.heroBodyTitle as string, d.heroBodyTitle),
    heroBodyText: pickString(doc.heroBodyText as string, d.heroBodyText),
    heroVideoPath: pickString(doc.heroVideoPath as string, d.heroVideoPath),
    heroVideoPosterPath: pickString(doc.heroVideoPosterPath as string, d.heroVideoPosterPath),
    analyticsVideoPath: pickString(doc.analyticsVideoPath as string, d.analyticsVideoPath),
    analyticsVideoPosterPath: pickString(
      doc.analyticsVideoPosterPath as string,
      d.analyticsVideoPosterPath,
    ),
    heroServices: pickArray(
      doc.heroServices as { num: string; label: string }[],
      [...d.heroServices],
    ),
    whoTitle: pickString(doc.whoTitle as string, d.whoTitle),
    whoBody: pickString(doc.whoBody as string, d.whoBody),
    servicesEyebrow: pickString(doc.servicesEyebrow as string, d.servicesEyebrow),
    servicesTitle: pickString(doc.servicesTitle as string, d.servicesTitle),
    caseStudiesTitle: pickString(doc.caseStudiesTitle as string, d.caseStudiesTitle),
    featuredCases: pickArray(doc.featuredCases as FeaturedCase[], [...d.featuredCases]),
    serviceCards: pickArray(doc.serviceCards as ServiceCardContent[], [...d.serviceCards]),
  };
}

async function getHomepageV2ContentImpl(): Promise<HomepageV2Content> {
  const d = siteContentDefaults.homepageV2;
  const doc = await fetchWithTimeout<Record<string, unknown>>(HOMEPAGE_V2_QUERY);
  if (!doc) {
    return {
      ...d,
      workScrollItems: d.workScrollItems.map((item) => ({ ...item, tags: [...item.tags], tagGlow: item.tagGlow ? [...item.tagGlow] : undefined })),
      serviceCards: [...d.serviceCards],
    };
  }

  const scrollDefaults = [...d.workScrollItems];
  const scrollFromCms = (doc.workScrollItems as FeaturedWorkScrollItem[] | undefined)?.map(
    (item, i) => {
      const fallback = scrollDefaults[i];
      if (!fallback) return item;
      return {
        ...fallback,
        ...item,
        tags: item.tags?.length ? item.tags : fallback.tags,
      };
    },
  );

  return {
    metaTitle: pickString(doc.metaTitle as string, d.metaTitle),
    metaDescription: pickString(doc.metaDescription as string, d.metaDescription),
    heroHeadline: pickString(doc.heroHeadline as string, d.heroHeadline),
    heroSubheadline: pickString(doc.heroSubheadline as string, d.heroSubheadline),
    heroImagePath: pickString(doc.heroImagePath as string, d.heroImagePath),
    heroPrimaryCtaLabel: pickString(doc.heroPrimaryCtaLabel as string, d.heroPrimaryCtaLabel),
    heroPrimaryCtaHref: pickString(doc.heroPrimaryCtaHref as string, d.heroPrimaryCtaHref),
    heroSecondaryCtaLabel: pickString(doc.heroSecondaryCtaLabel as string, d.heroSecondaryCtaLabel),
    heroSecondaryCtaHref: pickString(doc.heroSecondaryCtaHref as string, d.heroSecondaryCtaHref),
    workTitle: pickString(doc.workTitle as string, d.workTitle),
    workSubtitle: pickString(doc.workSubtitle as string, d.workSubtitle),
    workViewAllLabel: pickString(doc.workViewAllLabel as string, d.workViewAllLabel),
    workViewAllHref: pickString(doc.workViewAllHref as string, d.workViewAllHref),
    workScrollItems: pickArray(scrollFromCms ?? scrollDefaults, scrollDefaults),
    servicesTitle: pickString(doc.servicesTitle as string, d.servicesTitle),
    serviceCards: pickArray(doc.serviceCards as ServiceCardContent[], [...d.serviceCards]),
    showreelTitle: pickString(doc.showreelTitle as string, d.showreelTitle),
    showreelVideoPath: pickString(doc.showreelVideoPath as string, d.showreelVideoPath),
    showreelPosterPath: pickString(doc.showreelPosterPath as string, d.showreelPosterPath),
    showreelCtaLabel: pickString(doc.showreelCtaLabel as string, d.showreelCtaLabel),
    showreelCtaHref: pickString(doc.showreelCtaHref as string, d.showreelCtaHref),
    analyticsVideoPath: pickString(doc.analyticsVideoPath as string, d.analyticsVideoPath),
    analyticsVideoPosterPath: pickString(
      doc.analyticsVideoPosterPath as string,
      d.analyticsVideoPosterPath,
    ),
    bentoCocktailImagePath: pickString(doc.bentoCocktailImagePath as string, d.bentoCocktailImagePath),
    bentoFoodImagePath: pickString(doc.bentoFoodImagePath as string, d.bentoFoodImagePath),
  };
}

async function getAboutPageContentImpl(): Promise<AboutPageContent> {
  const d = siteContentDefaults.about;
  const doc = await fetchWithTimeout<Record<string, unknown>>(ABOUT_PAGE_QUERY);
  if (!doc) return { ...d };

  return {
    metaTitle: pickString(doc.metaTitle as string, d.metaTitle),
    metaDescription: pickString(doc.metaDescription as string, d.metaDescription),
    eyebrow: pickString(doc.eyebrow as string, d.eyebrow),
    headline: pickString(doc.headline as string, d.headline),
    intro: pickString(doc.intro as string, d.intro),
    section1Title: pickString(doc.section1Title as string, d.section1Title),
    section1Body: pickString(doc.section1Body as string, d.section1Body),
    section2Title: pickString(doc.section2Title as string, d.section2Title),
    section2Body: pickString(doc.section2Body as string, d.section2Body),
    ctaPrefix: pickString(doc.ctaPrefix as string, d.ctaPrefix),
    ctaLinkLabel: pickString(doc.ctaLinkLabel as string, d.ctaLinkLabel),
    ctaLinkHref: pickString(doc.ctaLinkHref as string, d.ctaLinkHref),
  };
}

async function getWorkPageSettingsImpl(): Promise<WorkPageSettingsContent> {
  const d = siteContentDefaults.workPage;
  const doc = await fetchWithTimeout<Record<string, unknown>>(WORK_PAGE_SETTINGS_QUERY);
  if (!doc) return { ...d };

  return {
    metaTitle: pickString(doc.metaTitle as string, d.metaTitle),
    metaDescription: pickString(doc.metaDescription as string, d.metaDescription),
    headline: pickString(doc.headline as string, d.headline),
    subheadline: pickString(doc.subheadline as string, d.subheadline),
    emptyFilterMessage: pickString(doc.emptyFilterMessage as string, d.emptyFilterMessage),
  };
}

async function getClientLogosImpl(): Promise<ClientLogo[]> {
  const doc = await fetchWithTimeout<ClientLogo[]>(CLIENT_LOGOS_QUERY);
  return pickArray(doc ?? undefined, [...siteContentDefaults.clientLogos]);
}

export type { AboutPageContent, HomepageV2Content, WorkPageSettingsContent };

export const getSiteSettings = cache(getSiteSettingsImpl);
export const getHomepageContent = cache(getHomepageContentImpl);
export const getHomepageV2Content = cache(getHomepageV2ContentImpl);
export const getAboutPageContent = cache(getAboutPageContentImpl);
export const getWorkPageSettings = cache(getWorkPageSettingsImpl);
export const getClientLogos = cache(getClientLogosImpl);

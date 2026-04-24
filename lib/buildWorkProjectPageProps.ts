import type { SanityImageSource } from "@sanity/image-url";

import type { WorkProjectTemplateProps } from "@/components/sandspire/WorkProjectTemplate";
import type { WorkProjectDefaults } from "@/lib/workProjectDefaults";
import type { WorkProjectDocumentFields } from "@/sanity/lib/queries/workProject";
import { urlFor } from "@/sanity/lib/image";

export function publicPath(value: string | undefined | null) {
  const normalized = value?.trim();
  return normalized && normalized.startsWith("/") ? normalized : null;
}

export function usableProjectUrl(value: string | undefined | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname !== "example.com"
    ) {
      return value;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function imageUrl(
  image: SanityImageSource | undefined | null,
  fallback: string,
  width = 2000,
) {
  if (!image) return fallback;
  try {
    return urlFor(image).width(width).quality(90).url();
  } catch {
    return fallback;
  }
}

function imageSrc({
  docPath,
  docImage,
  fallback,
  width,
}: {
  docPath?: string | null;
  docImage?: SanityImageSource | null;
  fallback: string;
  width?: number;
}) {
  const preferredPath = publicPath(docPath);
  if (preferredPath) return preferredPath;
  if (docImage) return imageUrl(docImage, fallback, width);
  return fallback;
}

function optionalImageSrc({
  docPath,
  docImage,
  fallback,
  width,
}: {
  docPath?: string | null;
  docImage?: SanityImageSource | null;
  fallback: string | null;
  width?: number;
}) {
  const preferredPath = publicPath(docPath);
  if (preferredPath) return preferredPath;
  if (docImage) return imageUrl(docImage, fallback ?? "", width);
  return fallback;
}

function logoSrcComputed(
  docPath: string | undefined | null,
  docImage: SanityImageSource | undefined | null,
  fallbackPath: string | null,
) {
  const preferredPath = publicPath(docPath);
  if (preferredPath) return preferredPath;
  if (docImage) {
    return imageUrl(docImage, fallbackPath ?? "", 400) || fallbackPath || null;
  }
  if (fallbackPath) return fallbackPath;
  return null;
}

function altBase(
  doc: WorkProjectDocumentFields,
  d: WorkProjectDefaults | undefined,
) {
  return doc.internalTitle ?? d?.internalTitle ?? "Project";
}

/** When there is no code fallback, repeat the hero for missing slots and use generic alts. */
function buildDocOnlyProps(
  slug: string,
  doc: WorkProjectDocumentFields,
): WorkProjectTemplateProps | null {
  const heroFallback = "";
  const hero = imageSrc({
    docPath: doc.heroImagePath,
    docImage: doc.heroImage,
    fallback: heroFallback,
  });
  if (!hero) return null;

  const base = altBase(doc, undefined);
  const projectUrl = doc.projectUrl ?? "";
  const docProjectUrl = usableProjectUrl(doc.projectUrl);

  return {
    serviceTags: doc.serviceTags?.filter(Boolean).length
      ? doc.serviceTags!
      : ["Branding", "Web Development"],
    fieldLabel: doc.fieldLabel ?? "Field",
    industry: doc.industry ?? "",
    locationLabel: doc.locationLabel ?? "",
    location: doc.location ?? "",
    about: doc.about ?? "",
    projectUrl,
    ctaLabel: docProjectUrl ? doc.ctaLabel ?? "Visit Website" : "Visit Website",
    challengeTitle: doc.challengeTitle ?? "The challenge",
    challengeBody: doc.challengeBody ?? "",
    solutionTitle: doc.solutionTitle ?? "The solution",
    solutionBody: doc.solutionBody ?? "",
    invertLogo:
      doc.invertClientLogo !== undefined && doc.invertClientLogo !== null
        ? Boolean(doc.invertClientLogo)
        : true,
    heroSrc: hero,
    heroAlt: `${base} — hero`,
    logoSrc: logoSrcComputed(doc.clientLogoPath, doc.clientLogo, null),
    logoAlt: base,
    wordmarkTitle: doc.internalTitle ?? base,
    galleryStackTopSrc: imageSrc({
      docPath: doc.galleryStackTopPath,
      docImage: doc.galleryStackTop,
      fallback: hero,
    }),
    galleryStackTopAlt: `${base} — gallery`,
    galleryStackBottomSrc:
      slug === "slrp"
        ? optionalImageSrc({
            docPath: doc.galleryStackBottomPath,
            docImage: doc.galleryStackBottom,
            fallback: null,
          })
        : null,
    galleryStackBottomAlt: `${base} — gallery`,
    galleryHeroTallSrc: imageSrc({
      docPath: doc.galleryHeroTallPath,
      docImage: doc.galleryHeroTall,
      fallback: hero,
    }),
    galleryHeroTallAlt: `${base} — gallery`,
    resultTallSrc: imageSrc({
      docPath: doc.resultImageTallPath,
      docImage: doc.resultImageTall,
      fallback: hero,
    }),
    resultTallAlt: `${base} — result`,
  };
}

export function buildWorkProjectPageProps(
  slug: string,
  doc: WorkProjectDocumentFields | null,
  d: WorkProjectDefaults | undefined,
): WorkProjectTemplateProps | null {
  if (!doc && !d) return null;
  if (doc && !d) {
    return buildDocOnlyProps(slug, doc);
  }
  if (!d) {
    return null;
  }

  const docProjectUrl = usableProjectUrl(doc?.projectUrl);

  const serviceTags =
    doc?.serviceTags?.filter(Boolean).length ? doc.serviceTags! : d.serviceTags;
  const fieldLabel = doc?.fieldLabel ?? d.fieldLabel;
  const industry = doc?.industry ?? d.industry;
  const locationLabel = doc?.locationLabel ?? d.locationLabel;
  const location = doc?.location ?? d.location;
  const about = doc?.about ?? d.about;
  const projectUrl = docProjectUrl ?? d.projectUrl;
  const ctaLabel = docProjectUrl ? doc?.ctaLabel ?? d.ctaLabel : d.ctaLabel;
  const challengeTitle = doc?.challengeTitle ?? d.challengeTitle;
  const challengeBody = doc?.challengeBody ?? d.challengeBody;
  const solutionTitle = doc?.solutionTitle ?? d.solutionTitle;
  const solutionBody = doc?.solutionBody ?? d.solutionBody;
  const invertLogo =
    doc?.invertClientLogo !== undefined && doc?.invertClientLogo !== null
      ? Boolean(doc.invertClientLogo)
      : d.invertClientLogo;

  const logoSrc = logoSrcComputed(
    doc?.clientLogoPath,
    doc?.clientLogo,
    d.clientLogoPath,
  );

  const galleryStackBottomSrc =
    slug === "slrp"
      ? optionalImageSrc({
          docPath: doc?.galleryStackBottomPath,
          docImage: doc?.galleryStackBottom,
          fallback: d.images.galleryStackBottom,
        })
      : null;

  return {
    serviceTags,
    fieldLabel,
    industry,
    locationLabel,
    location,
    about,
    projectUrl,
    ctaLabel,
    challengeTitle,
    challengeBody,
    solutionTitle,
    solutionBody,
    invertLogo,
    heroSrc: imageSrc({
      docPath: doc?.heroImagePath,
      docImage: doc?.heroImage,
      fallback: d.images.hero,
    }),
    heroAlt: d.alts.hero,
    logoSrc,
    logoAlt: d.alts.clientLogo,
    wordmarkTitle: doc?.internalTitle ?? d.internalTitle,
    galleryStackTopSrc: imageSrc({
      docPath: doc?.galleryStackTopPath,
      docImage: doc?.galleryStackTop,
      fallback: d.images.galleryStackTop,
    }),
    galleryStackTopAlt: d.alts.galleryStackTop,
    galleryStackBottomSrc,
    galleryStackBottomAlt: d.alts.galleryStackBottom,
    galleryHeroTallSrc: imageSrc({
      docPath: doc?.galleryHeroTallPath,
      docImage: doc?.galleryHeroTall,
      fallback: d.images.galleryHeroTall,
    }),
    galleryHeroTallAlt: d.alts.galleryHeroTall,
    resultTallSrc: imageSrc({
      docPath: doc?.resultImageTallPath,
      docImage: doc?.resultImageTall,
      fallback: d.images.resultTall,
    }),
    resultTallAlt: d.alts.resultTall,
  };
}

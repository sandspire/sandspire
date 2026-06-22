import type { SanityImageSource } from "@sanity/image-url";

import type { WorkProjectContentProps } from "@/components/sandspire/WorkProjectTemplate";
import type { WorkProjectDefaults } from "@/lib/workProjectDefaults";
import type { WorkProjectDocumentFields } from "@/sanity/lib/queries/workProject";
import {
  isSvgImageSource,
  optimizeImageUrl,
  sanityImageUrl,
  urlFor,
} from "@/sanity/lib/image";

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
  preset: "hero" | "gallery" | "card" = "hero",
) {
  if (!image) return optimizeImageUrl(fallback, preset === "card" ? 800 : preset === "gallery" ? 1200 : 1600);
  try {
    return sanityImageUrl(image, { preset });
  } catch {
    return optimizeImageUrl(fallback, preset === "card" ? 800 : preset === "gallery" ? 1200 : 1600);
  }
}

/** Local `/images/projects/` paths are seed fallbacks; files are not shipped in `public/`. */
function isMissingPublicProjectPath(value: string | null) {
  return value?.startsWith("/images/projects/") ?? false;
}

function resolveStaticOrCdnUrl(
  value: string | undefined | null,
  preset: "hero" | "gallery" | "card",
): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return optimizeImageUrl(
      trimmed,
      preset === "card" ? 800 : preset === "gallery" ? 1200 : 1600,
    );
  }
  const path = publicPath(trimmed);
  if (path && !isMissingPublicProjectPath(path)) return path;
  return null;
}

function imageSrc({
  docPath,
  docImage,
  fallback,
  secondaryFallback,
  preset = "hero",
}: {
  docPath?: string | null;
  docImage?: SanityImageSource | null;
  fallback: string;
  secondaryFallback?: string;
  preset?: "hero" | "gallery" | "card";
}) {
  if (docImage) return imageUrl(docImage, fallback, preset);
  const fromDoc = resolveStaticOrCdnUrl(docPath, preset);
  if (fromDoc) return fromDoc;
  const fromFallback = resolveStaticOrCdnUrl(fallback, preset);
  if (fromFallback) return fromFallback;
  const fromSecondary = resolveStaticOrCdnUrl(secondaryFallback, preset);
  if (fromSecondary) return fromSecondary;
  return optimizeImageUrl(fallback, preset === "card" ? 800 : preset === "gallery" ? 1200 : 1600);
}

function optionalImageSrc({
  docPath,
  docImage,
  fallback,
  preset = "gallery",
}: {
  docPath?: string | null;
  docImage?: SanityImageSource | null;
  fallback: string | null;
  preset?: "hero" | "gallery" | "card";
}) {
  if (docImage) return imageUrl(docImage, fallback ?? "", preset);
  const preferredPath = publicPath(docPath);
  if (preferredPath && !isMissingPublicProjectPath(preferredPath)) {
    return preferredPath;
  }
  return fallback && !isMissingPublicProjectPath(fallback)
    ? optimizeImageUrl(fallback, preset === "card" ? 800 : 1200)
    : null;
}

function getImageAssetRef(image: SanityImageSource | undefined | null): string | null {
  if (!image || typeof image !== "object") return null;
  if (
    "asset" in image &&
    image.asset &&
    typeof image.asset === "object" &&
    "_ref" in image.asset
  ) {
    return String(image.asset._ref);
  }
  if ("_ref" in image && typeof image._ref === "string") return image._ref;
  return null;
}

/** Brand-detail slot: never reuse the listing/card image when a dedicated accent is missing. */
function resultTallDocImage(doc: WorkProjectDocumentFields | null | undefined) {
  if (!doc) return null;
  if (doc.resultImageTall) return doc.resultImageTall;

  const wideRef = getImageAssetRef(doc.resultImageWide);
  const listingRef = getImageAssetRef(doc.listingImage);

  if (doc.resultImageWide && wideRef && listingRef && wideRef !== listingRef) {
    return doc.resultImageWide;
  }

  if (doc.heroImage) return doc.heroImage;

  return doc.resultImageWide ?? null;
}

function logoSrcComputed(
  docPath: string | undefined | null,
  docImage: SanityImageSource | undefined | null,
  fallbackPath: string | null,
  slug?: string,
) {
  const fallbackStaticPath = publicPath(fallbackPath);

  // Sanity export for Bordo Mavi was missing "MAVI"; keep the corrected local file.
  if (slug === "bordo-mavi" && fallbackStaticPath === "/logos/bordomavi.svg") {
    return fallbackStaticPath;
  }

  if (docImage) {
    try {
      if (isSvgImageSource(docImage)) {
        return urlFor(docImage).url();
      }
      return sanityImageUrl(docImage, { preset: "logo" });
    } catch {
      /* fall through to static paths */
    }
  }

  const docStaticPath = publicPath(docPath);
  if (docStaticPath) return docStaticPath;
  if (fallbackStaticPath) return fallbackStaticPath;
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
): WorkProjectContentProps | null {
  const heroFallback = "";
  const hero = imageSrc({
    docPath: doc.heroImagePath,
    docImage: doc.heroImage,
    fallback: heroFallback,
    preset: "hero",
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
    logoSrc: logoSrcComputed(doc.clientLogoPath, doc.clientLogo, null, slug),
    logoAlt: base,
    wordmarkTitle: doc.internalTitle ?? base,
    galleryStackTopSrc: imageSrc({
      docPath: doc.galleryStackTopPath,
      docImage: doc.galleryStackTop,
      fallback: hero,
      preset: "gallery",
    }),
    galleryStackTopAlt: `${base} — gallery`,
    galleryStackBottomSrc:
      slug === "slrp"
        ? optionalImageSrc({
            docPath: doc.galleryStackBottomPath,
            docImage: doc.galleryStackBottom,
            fallback: null,
            preset: "gallery",
          })
        : null,
    galleryStackBottomAlt: `${base} — gallery`,
    galleryHeroTallSrc: imageSrc({
      docPath: doc.galleryHeroTallPath,
      docImage: doc.galleryHeroTall,
      fallback: hero,
      preset: "gallery",
    }),
    galleryHeroTallAlt: `${base} — gallery`,
    resultTallSrc: imageSrc({
      docPath: doc.resultImageTallPath,
      docImage: resultTallDocImage(doc),
      fallback: hero,
      preset: "gallery",
    }),
    resultTallAlt: `${base} — result`,
  };
}

export function buildWorkProjectPageProps(
  slug: string,
  doc: WorkProjectDocumentFields | null,
  d: WorkProjectDefaults | undefined,
): WorkProjectContentProps | null {
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
    doc?.invertClientLogo !== undefined && doc.invertClientLogo !== null
      ? Boolean(doc.invertClientLogo)
      : d.invertClientLogo;

  const logoSrc = logoSrcComputed(
    doc?.clientLogoPath,
    doc?.clientLogo,
    d.clientLogoPath,
    slug,
  );

  const galleryStackBottomSrc =
    slug === "slrp"
      ? optionalImageSrc({
          docPath: doc?.galleryStackBottomPath,
          docImage: doc?.galleryStackBottom,
          fallback: d.images.galleryStackBottom,
          preset: "gallery",
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
      preset: "hero",
    }),
    heroAlt: d.alts.hero,
    logoSrc,
    logoAlt: d.alts.clientLogo,
    wordmarkTitle: doc?.internalTitle ?? d.internalTitle,
    galleryStackTopSrc: imageSrc({
      docPath: doc?.galleryStackTopPath,
      docImage: doc?.galleryStackTop,
      fallback: d.images.galleryStackTop,
      preset: "gallery",
    }),
    galleryStackTopAlt: d.alts.galleryStackTop,
    galleryStackBottomSrc,
    galleryStackBottomAlt: d.alts.galleryStackBottom,
    galleryHeroTallSrc: imageSrc({
      docPath: doc?.galleryHeroTallPath,
      docImage: doc?.galleryHeroTall,
      fallback: d.images.galleryHeroTall,
      preset: "gallery",
    }),
    galleryHeroTallAlt: d.alts.galleryHeroTall,
    resultTallSrc: imageSrc({
      docPath: doc?.resultImageTallPath,
      docImage: resultTallDocImage(doc),
      fallback: d.images.resultTall,
      secondaryFallback: d.images.hero,
      preset: "gallery",
    }),
    resultTallAlt: d.alts.resultTall,
  };
}

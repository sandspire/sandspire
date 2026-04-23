import type { SanityImageSource } from "@sanity/image-url";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyTemplate } from "@/components/sandspire/CaseStudyTemplate";
import {
  CASE_STUDY_SLUGS,
  getCaseStudyFallback,
} from "@/lib/caseStudyProjectDefaults";
import { urlFor } from "@/sanity/lib/image";
import { getCaseStudyBySlug } from "@/sanity/lib/queries/caseStudy";

function publicPath(value: string | undefined | null) {
  const normalized = value?.trim();
  return normalized && normalized.startsWith("/") ? normalized : null;
}

function usableProjectUrl(value: string | undefined | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname !== "example.com"
    ) {
      return value;
    }
  } catch {}
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

export const revalidate = 60;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const base = getCaseStudyFallback(slug);
  if (!base) return { title: "Work" };
  const doc = await getCaseStudyBySlug(slug);
  const title = doc?.internalTitle ?? base.internalTitle;
  const description = (doc?.about ?? base.about).slice(0, 155);
  return {
    title: `${title} — Sandspire`,
    description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const d = getCaseStudyFallback(slug);
  if (!d) notFound();

  const doc = await getCaseStudyBySlug(slug);
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
  const resultTitle = doc?.resultTitle ?? d.resultTitle;
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

  return (
    <CaseStudyTemplate
      serviceTags={serviceTags}
      fieldLabel={fieldLabel}
      industry={industry}
      locationLabel={locationLabel}
      location={location}
      about={about}
      projectUrl={projectUrl}
      ctaLabel={ctaLabel}
      challengeTitle={challengeTitle}
      challengeBody={challengeBody}
      solutionTitle={solutionTitle}
      solutionBody={solutionBody}
      resultTitle={resultTitle}
      invertLogo={invertLogo}
      heroSrc={imageSrc({
        docPath: doc?.heroImagePath,
        docImage: doc?.heroImage,
        fallback: d.images.hero,
      })}
      heroAlt={d.alts.hero}
      logoSrc={logoSrc}
      logoAlt={d.alts.clientLogo}
      wordmarkTitle={d.internalTitle}
      galleryStackTopSrc={imageSrc({
        docPath: doc?.galleryStackTopPath,
        docImage: doc?.galleryStackTop,
        fallback: d.images.galleryStackTop,
      })}
      galleryStackTopAlt={d.alts.galleryStackTop}
      galleryStackBottomSrc={galleryStackBottomSrc}
      galleryStackBottomAlt={d.alts.galleryStackBottom}
      galleryHeroTallSrc={imageSrc({
        docPath: doc?.galleryHeroTallPath,
        docImage: doc?.galleryHeroTall,
        fallback: d.images.galleryHeroTall,
      })}
      galleryHeroTallAlt={d.alts.galleryHeroTall}
      resultWideSrc={imageSrc({
        docPath: doc?.resultImageWidePath,
        docImage: doc?.resultImageWide,
        fallback: d.images.resultWide,
      })}
      resultWideAlt={d.alts.resultWide}
      resultTallSrc={imageSrc({
        docPath: doc?.resultImageTallPath,
        docImage: doc?.resultImageTall,
        fallback: d.images.resultTall,
      })}
      resultTallAlt={d.alts.resultTall}
    />
  );
}

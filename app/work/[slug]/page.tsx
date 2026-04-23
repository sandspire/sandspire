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

function logoSrcComputed(
  docImage: SanityImageSource | undefined | null,
  fallbackPath: string | null,
) {
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
  return {
    title: `${base.internalTitle} — Sandspire`,
    description: base.about.slice(0, 155),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const d = getCaseStudyFallback(slug);
  if (!d) notFound();

  const doc = await getCaseStudyBySlug(slug);

  const serviceTags =
    doc?.serviceTags?.filter(Boolean).length ? doc.serviceTags! : d.serviceTags;
  const fieldLabel = doc?.fieldLabel ?? d.fieldLabel;
  const industry = doc?.industry ?? d.industry;
  const locationLabel = doc?.locationLabel ?? d.locationLabel;
  const location = doc?.location ?? d.location;
  const about = doc?.about ?? d.about;
  const projectUrl = doc?.projectUrl ?? d.projectUrl;
  const ctaLabel = doc?.ctaLabel ?? d.ctaLabel;
  const challengeTitle = doc?.challengeTitle ?? d.challengeTitle;
  const challengeBody = doc?.challengeBody ?? d.challengeBody;
  const solutionTitle = doc?.solutionTitle ?? d.solutionTitle;
  const solutionBody = doc?.solutionBody ?? d.solutionBody;
  const resultTitle = doc?.resultTitle ?? d.resultTitle;
  const invertLogo =
    doc?.invertClientLogo !== undefined && doc?.invertClientLogo !== null
      ? Boolean(doc.invertClientLogo)
      : d.invertClientLogo;

  const logoSrc = logoSrcComputed(doc?.clientLogo, d.clientLogoPath);

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
      heroSrc={imageUrl(doc?.heroImage, d.images.hero)}
      heroAlt={d.alts.hero}
      logoSrc={logoSrc}
      logoAlt={d.alts.clientLogo}
      wordmarkTitle={d.internalTitle}
      galleryStackTopSrc={imageUrl(
        doc?.galleryStackTop,
        d.images.galleryStackTop,
      )}
      galleryStackTopAlt={d.alts.galleryStackTop}
      galleryStackBottomSrc={imageUrl(
        doc?.galleryStackBottom,
        d.images.galleryStackBottom,
      )}
      galleryStackBottomAlt={d.alts.galleryStackBottom}
      galleryHeroTallSrc={imageUrl(
        doc?.galleryHeroTall,
        d.images.galleryHeroTall,
      )}
      galleryHeroTallAlt={d.alts.galleryHeroTall}
      resultWideSrc={imageUrl(doc?.resultImageWide, d.images.resultWide)}
      resultWideAlt={d.alts.resultWide}
      resultTallSrc={imageUrl(doc?.resultImageTall, d.images.resultTall)}
      resultTallAlt={d.alts.resultTall}
    />
  );
}

import type { SanityImageSource } from "@sanity/image-url";

import { client } from "../client";

const caseStudyProjection = `{
  internalTitle,
  "slug": slug.current,
  heroImage,
  clientLogo,
  invertClientLogo,
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
  resultTitle,
  galleryStackTop,
  galleryStackBottom,
  galleryHeroTall,
  resultImageWide,
  resultImageTall
}`;

export type CaseStudyDocument = {
  internalTitle?: string;
  slug?: string;
  heroImage?: SanityImageSource;
  clientLogo?: SanityImageSource;
  invertClientLogo?: boolean | null;
  serviceTags?: string[] | null;
  fieldLabel?: string | null;
  industry?: string | null;
  locationLabel?: string | null;
  location?: string | null;
  about?: string | null;
  projectUrl?: string | null;
  ctaLabel?: string | null;
  challengeTitle?: string | null;
  challengeBody?: string | null;
  solutionTitle?: string | null;
  solutionBody?: string | null;
  resultTitle?: string | null;
  galleryStackTop?: SanityImageSource;
  galleryStackBottom?: SanityImageSource;
  galleryHeroTall?: SanityImageSource;
  resultImageWide?: SanityImageSource;
  resultImageTall?: SanityImageSource;
} | null;

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyDocument> {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0] ${caseStudyProjection}`,
    { slug },
    { next: { tags: [`caseStudy:${slug}`] } },
  );
}

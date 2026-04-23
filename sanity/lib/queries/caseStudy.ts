import type { SanityImageSource } from "@sanity/image-url";
import { defineQuery } from "next-sanity";

import { client } from "../client";

const caseStudyProjection = `{
  internalTitle,
  "slug": slug.current,
  heroImage,
  heroImagePath,
  clientLogo,
  clientLogoPath,
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
  galleryStackTopPath,
  galleryStackBottom,
  galleryStackBottomPath,
  galleryHeroTall,
  galleryHeroTallPath,
  resultImageWide,
  resultImageWidePath,
  resultImageTall,
  resultImageTallPath
}`;

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(
  `*[_type == "caseStudy" && slug.current == $slug][0] ${caseStudyProjection}`,
);

export type CaseStudyDocument = {
  internalTitle?: string;
  slug?: string;
  heroImage?: SanityImageSource;
  heroImagePath?: string | null;
  clientLogo?: SanityImageSource;
  clientLogoPath?: string | null;
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
  galleryStackTopPath?: string | null;
  galleryStackBottom?: SanityImageSource;
  galleryStackBottomPath?: string | null;
  galleryHeroTall?: SanityImageSource;
  galleryHeroTallPath?: string | null;
  resultImageWide?: SanityImageSource;
  resultImageWidePath?: string | null;
  resultImageTall?: SanityImageSource;
  resultImageTallPath?: string | null;
} | null;

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyDocument> {
  return client.fetch(
    CASE_STUDY_BY_SLUG_QUERY,
    { slug },
    { next: { tags: [`caseStudy:${slug}`] } },
  );
}

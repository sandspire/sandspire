import type { SanityImageSource } from "@sanity/image-url";
import { cache } from "react";

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

export const CASE_STUDY_BY_SLUG_QUERY =
  `*[_type == "caseStudy" && slug.current == $slug][0] ${caseStudyProjection}`;

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

const SANITY_CASE_STUDY_FETCH_MS = 12_000;

async function getCaseStudyBySlugImpl(
  slug: string,
): Promise<CaseStudyDocument> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<"timeout">((resolve) => {
    timeoutId = setTimeout(() => resolve("timeout"), SANITY_CASE_STUDY_FETCH_MS);
  });

  const fetchPromise = client.fetch(
    CASE_STUDY_BY_SLUG_QUERY,
    { slug },
    { next: { tags: [`caseStudy:${slug}`] } },
  );

  try {
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    if (result === "timeout") {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[sandspire] Sanity case study fetch timed out (${SANITY_CASE_STUDY_FETCH_MS}ms, slug: ${slug}) — using code fallbacks.`,
        );
      }
      return null;
    }
    return result;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[sandspire] Sanity case study fetch failed (${slug}):`, err);
    }
    return null;
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
}

/** Cached per request; avoids duplicate GROQ calls from generateMetadata + page. */
export const getCaseStudyBySlug = cache(getCaseStudyBySlugImpl);

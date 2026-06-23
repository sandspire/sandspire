import type { SanityImageSource } from "@sanity/image-url";
import { cache } from "react";

import { client } from "../client";

/** GROQ: current `workProject` + legacy `caseStudy` until content is migrated in Sanity. */
const WORK_DOC_TYPES = `["caseStudy", "workProject"]`;

const workProjectProjection = `{
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

export const WORK_PROJECT_BY_SLUG_QUERY =
  `*[_type in ${WORK_DOC_TYPES} && slug.current == $slug] | order(_type desc) [0] ${workProjectProjection}`;

export type WorkProjectDocumentFields = {
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
};

export type WorkProjectDocument = WorkProjectDocumentFields | null;

const SANITY_WORK_FETCH_MS = 12_000;

async function getWorkProjectBySlugImpl(
  slug: string,
): Promise<WorkProjectDocumentFields | null> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<"timeout">((resolve) => {
    timeoutId = setTimeout(() => resolve("timeout"), SANITY_WORK_FETCH_MS);
  });

  const fetchPromise = client.fetch(
    WORK_PROJECT_BY_SLUG_QUERY,
    { slug },
    { next: { tags: [`workProject:${slug}`] } },
  );

  try {
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    if (result === "timeout") {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[sandspire] Work project Sanity fetch timed out (${SANITY_WORK_FETCH_MS}ms, slug: ${slug}) — using code fallbacks.`,
        );
      }
      return null;
    }
    return result;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[sandspire] Work project Sanity fetch failed (${slug}):`, err);
    }
    return null;
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
}

export const getWorkProjectBySlug = cache(getWorkProjectBySlugImpl);

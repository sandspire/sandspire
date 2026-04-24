import type { SanityImageSource } from "@sanity/image-url";
import { cache } from "react";

import { getWorkProjectFallback, WORK_PROJECTS } from "@/lib/workProjectDefaults";

import { client } from "../client";
import { urlFor } from "../image";

export type WorkIndexListRow = {
  slug: string;
  workIndexOrder?: number;
  showOnWorkIndex?: boolean;
  internalTitle?: string;
  listingTitle?: string | null;
  listingSummary?: string | null;
  listingImage?: SanityImageSource;
  listingImagePath?: string | null;
  heroImage?: SanityImageSource;
  heroImagePath?: string | null;
  about?: string | null;
  serviceTags?: string[] | null;
};

const WORK_INDEX_LIST = `*[_type in ["caseStudy", "workProject"] && defined(slug.current) && coalesce(showOnWorkIndex, true) != false]
| order(workIndexOrder asc, coalesce(listingTitle, internalTitle) asc) {
  _type,
  "slug": slug.current,
  workIndexOrder,
  showOnWorkIndex,
  internalTitle,
  listingTitle,
  listingSummary,
  listingImage,
  listingImagePath,
  heroImage,
  heroImagePath,
  about,
  serviceTags
}`;

const ALL_SLUGS = `*[_type in ["caseStudy", "workProject"] && defined(slug.current)].slug.current`;

function firstLine(text: string | null | undefined) {
  if (!text) return "";
  const line = text.split(/\n/)[0]?.trim();
  return line || text.slice(0, 200);
}

function publicPath(value: string | undefined | null) {
  const normalized = value?.trim();
  return normalized && normalized.startsWith("/") ? normalized : null;
}

function imageUrl(
  image: SanityImageSource | undefined | null,
  fallback: string,
  width = 1200,
) {
  if (!image) return fallback;
  try {
    return urlFor(image).width(width).quality(90).url();
  } catch {
    return fallback;
  }
}

function cardImageFromRow(
  row: WorkIndexListRow,
  fallbackSlug: string,
): string {
  const fb = getWorkProjectFallback(fallbackSlug);
  const fallbackImg = fb?.images?.resultWide ?? "";
  const listPath = publicPath(row.listingImagePath);
  if (listPath) return listPath;
  if (row.listingImage) {
    return imageUrl(row.listingImage, fallbackImg) || fallbackImg;
  }
  const heroPath = publicPath(row.heroImagePath);
  if (heroPath) return heroPath;
  if (row.heroImage) {
    return imageUrl(row.heroImage, fallbackImg) || fallbackImg;
  }
  return fallbackImg;
}

type RowWithLegacyType = WorkIndexListRow & { _type?: string };

/** Prefer `workProject` over legacy `caseStudy` when the same slug exists twice. */
function dedupeWorkRows(rows: RowWithLegacyType[]): WorkIndexListRow[] {
  const m = new Map<string, RowWithLegacyType>();
  for (const r of rows) {
    const cur = m.get(r.slug);
    if (!cur) {
      m.set(r.slug, r);
      continue;
    }
    if (cur._type === "caseStudy" && r._type === "workProject") {
      m.set(r.slug, r);
    }
  }
  return Array.from(m.values()).map((row) => {
    // Discriminate legacy `caseStudy` ; listing rows omit `_type` from the public shape.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- omit from API
    const { _type, ...rest } = row;
    return rest;
  });
}

function rowToCard(row: WorkIndexListRow) {
  const slug = row.slug;
  const fb = getWorkProjectFallback(slug);
  const title =
    (row.listingTitle && row.listingTitle.trim()) ||
    row.internalTitle ||
    fb?.internalTitle ||
    slug;
  const description = (() => {
    if (row.listingSummary && row.listingSummary.trim()) {
      return row.listingSummary.trim();
    }
    if (row.about) return firstLine(row.about) || row.about.slice(0, 200);
    if (fb?.about) return firstLine(fb.about) || fb.about.slice(0, 200);
    return "";
  })();
  const tags =
    row.serviceTags && row.serviceTags.filter(Boolean).length > 0
      ? row.serviceTags.filter(Boolean)
      : fb?.serviceTags ?? ["Branding", "Web Development"];
  return {
    slug,
    title,
    description,
    imageSrc: cardImageFromRow(row, slug),
    tags,
  };
}

export type WorkIndexCard = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
};

function fallbackCardsFromCode(): WorkIndexCard[] {
  return WORK_PROJECTS.map((p) => ({
    slug: p.slug,
    title: p.internalTitle,
    description: firstLine(p.about) || p.about.slice(0, 200),
    imageSrc: p.images.resultWide,
    tags: p.serviceTags,
  }));
}

/**
 * Slugs to pre-render for /work/[slug] (code defaults + anything in Sanity).
 */
export async function getAllWorkProjectSlugsForStaticParams(): Promise<
  string[]
> {
  try {
    const fromSanity = (await client.fetch<string[]>(ALL_SLUGS)) ?? [];
    return [...new Set(fromSanity.flat())];
  } catch {
    return [];
  }
}

/**
 * Work listing cards: Sanity when possible; otherwise the same data as the old hardcoded list.
 */
export const getWorkIndexCards = cache(async (): Promise<WorkIndexCard[]> => {
  try {
    const rows = await client.fetch<RowWithLegacyType[]>(WORK_INDEX_LIST, {}, {
      next: { tags: ["workIndex"] },
    });
    if (rows?.length) {
      return dedupeWorkRows(rows).map(rowToCard);
    }
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[sandspire] Work index Sanity fetch failed — using code fallbacks.",
      );
    }
  }
  return fallbackCardsFromCode();
});

import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const SANITY_IMAGE_QUALITY = 80;

export type SanityImagePreset =
  | "hero"
  | "gallery"
  | "card"
  | "logo"
  | "thumb"
  | "bento"
  | "marquee";

const PRESET_WIDTHS: Record<SanityImagePreset, number> = {
  hero: 1600,
  gallery: 1200,
  card: 800,
  logo: 400,
  thumb: 600,
  bento: 900,
  marquee: 320,
};

export const urlFor = (source: SanityImageSource) => builder.image(source);

function isSvgPath(path: string) {
  return path.toLowerCase().includes(".svg");
}

export function isSvgImageSource(source: SanityImageSource | null | undefined): boolean {
  if (!source || typeof source !== "object") return false;
  const ref =
    "_ref" in source && typeof source._ref === "string"
      ? source._ref
      : "asset" in source &&
          source.asset &&
          typeof source.asset === "object" &&
          "_ref" in source.asset
        ? String(source.asset._ref)
        : "";
  return ref.includes("-svg") || ref.endsWith("svg");
}

export function isRasterImageUrl(url: string) {
  if (!url) return false;
  if (url.startsWith("/") && !url.startsWith("//")) {
    return /\.(png|jpe?g|webp|avif|gif)(\?|$)/i.test(url);
  }
  return (
    url.includes("cdn.sanity.io") &&
    !isSvgPath(url) &&
    !url.includes("-svg")
  );
}

/** Build a compressed WebP URL from a Sanity image reference. SVG assets stay vector. */
export function sanityImageUrl(
  source: SanityImageSource,
  options: {
    width?: number;
    quality?: number;
    preset?: SanityImagePreset;
  } = {},
): string {
  const width =
    options.width ?? (options.preset ? PRESET_WIDTHS[options.preset] : PRESET_WIDTHS.hero);
  const quality = options.quality ?? SANITY_IMAGE_QUALITY;

  if (isSvgImageSource(source)) {
    return urlFor(source).url();
  }

  return urlFor(source).width(width).quality(quality).format("webp").fit("max").url();
}

/** Add WebP + size params to an existing Sanity CDN URL (or pass local/SVG paths through). */
export function optimizeImageUrl(
  url: string,
  width = PRESET_WIDTHS.hero,
  quality = SANITY_IMAGE_QUALITY,
): string {
  const normalized = url?.trim();
  if (!normalized) return normalized;

  if (normalized.startsWith("/") && !normalized.startsWith("//")) {
    return normalized;
  }

  if (!isRasterImageUrl(normalized)) {
    return normalized;
  }

  try {
    const parsed = new URL(normalized);
    parsed.searchParams.set("w", String(width));
    parsed.searchParams.set("q", String(quality));
    parsed.searchParams.set("fm", "webp");
    parsed.searchParams.set("fit", "max");
    return parsed.toString();
  } catch {
    return normalized;
  }
}

/** Prefer a Sanity asset; fall back to a public path or hardcoded default. */
export function resolveCmsImageUrl(
  image: SanityImageSource | null | undefined,
  path: string | null | undefined,
  fallbackPath = "",
  width = PRESET_WIDTHS.hero,
  preset?: SanityImagePreset,
): string {
  if (image) {
    try {
      return sanityImageUrl(image, { width, preset });
    } catch {
      /* use path fallback */
    }
  }

  const normalized = path?.trim();
  if (
    normalized &&
    normalized.length > 0 &&
    (normalized.startsWith("/") || normalized.startsWith("http"))
  ) {
    if (normalized.startsWith("http")) {
      return optimizeImageUrl(normalized, width);
    }
    return normalized;
  }

  const fallback = fallbackPath?.trim();
  if (!fallback) return "";
  if (fallback.startsWith("http")) {
    return optimizeImageUrl(fallback, width);
  }
  return fallback;
}

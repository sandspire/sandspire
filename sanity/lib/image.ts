import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

/** Prefer a Sanity asset; fall back to a public path or hardcoded default. */
export function resolveCmsImageUrl(
  image: SanityImageSource | null | undefined,
  path: string | null | undefined,
  fallbackPath = "",
  width = 1600,
): string {
  if (image) {
    try {
      return urlFor(image).width(width).quality(90).url();
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
    return normalized;
  }

  const fallback = fallbackPath?.trim();
  return fallback && fallback.length > 0 ? fallback : "";
}

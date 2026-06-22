import { createClient, type SanityClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { basename, resolve } from "node:path";

const MIME: Record<string, string> = {
  mp4: "video/mp4",
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
};

const RASTER_EXT = new Set(["png", "jpg", "jpeg"]);

export function createUploadClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1fmk53vd";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-23";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN (Editor token)");
  }

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}

export function publicFilePath(publicDir: string, relativePath: string) {
  const decoded = decodeURIComponent(relativePath.replace(/^\//, ""));
  return resolve(publicDir, decoded);
}

export function relativePathFilename(relativePath: string) {
  const decoded = decodeURIComponent(relativePath.replace(/^\//, ""));
  return basename(decoded);
}

export type SanityAssetIndex = {
  imageRefByFilename: Map<string, string>;
  fileUrlByFilename: Map<string, string>;
};

/** Reuse assets already on Sanity CDN when /public files are not in the repo. */
export async function createSanityAssetIndex(
  client: SanityClient,
): Promise<SanityAssetIndex> {
  const [images, files] = await Promise.all([
    client.fetch<
      { _id: string; originalFilename?: string; _createdAt?: string }[]
    >(`*[_type == "sanity.imageAsset"]{ _id, originalFilename, _createdAt }`),
    client.fetch<
      { url?: string; originalFilename?: string; _createdAt?: string }[]
    >(`*[_type == "sanity.fileAsset"]{ url, originalFilename, _createdAt }`),
  ]);

  const imageRefByFilename = new Map<string, string>();
  for (const row of images.sort((a, b) =>
    (a._createdAt ?? "").localeCompare(b._createdAt ?? ""),
  )) {
    if (row.originalFilename) {
      imageRefByFilename.set(row.originalFilename, row._id);
    }
  }

  const fileUrlByFilename = new Map<string, string>();
  for (const row of files.sort((a, b) =>
    (a._createdAt ?? "").localeCompare(b._createdAt ?? ""),
  )) {
    if (row.originalFilename && row.url) {
      fileUrlByFilename.set(row.originalFilename, row.url);
    }
  }

  return { imageRefByFilename, fileUrlByFilename };
}

function existingImageRef(index: SanityAssetIndex | undefined, relativePath: string) {
  if (!index) return undefined;
  const filename = relativePathFilename(relativePath);
  const ref = index.imageRefByFilename.get(filename);
  if (!ref) return undefined;
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: ref },
  };
}

function existingFileUrl(index: SanityAssetIndex | undefined, relativePath: string) {
  if (!index) return undefined;
  const filename = relativePathFilename(relativePath);
  return index.fileUrlByFilename.get(filename);
}

async function compressRasterToWebp(
  buffer: Buffer,
  filename: string,
): Promise<{ buffer: Buffer; filename: string; contentType: string }> {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";

  if (ext === "webp" || ext === "svg") {
    return {
      buffer,
      filename,
      contentType: MIME[ext] ?? "application/octet-stream",
    };
  }

  if (!RASTER_EXT.has(ext)) {
    return {
      buffer,
      filename,
      contentType: MIME[ext] ?? "application/octet-stream",
    };
  }

  const sharp = (await import("sharp")).default;
  const webpBuffer = await sharp(buffer)
    .rotate()
    .webp({ quality: 82, effort: 4 })
    .toBuffer();

  const base = filename.replace(/\.[^.]+$/, "");
  return {
    buffer: webpBuffer,
    filename: `${base}.webp`,
    contentType: "image/webp",
  };
}

export async function uploadPublicImage(
  client: SanityClient,
  publicDir: string,
  relativePath: string,
  cache: Map<string, Promise<unknown>>,
  assetIndex?: SanityAssetIndex,
) {
  return uploadPublicFile(client, publicDir, relativePath, cache, "image", assetIndex) as Promise<
    { _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined
  >;
}

export async function uploadPublicFile(
  client: SanityClient,
  publicDir: string,
  relativePath: string,
  cache: Map<string, Promise<unknown>>,
  kind: "image" | "file" = "file",
  assetIndex?: SanityAssetIndex,
): Promise<
  | { _type: "image"; asset: { _type: "reference"; _ref: string } }
  | string
  | undefined
> {
  if (!relativePath?.trim()) return undefined;

  const cacheKey = `${kind}:${relativePath}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached as ReturnType<typeof uploadPublicFile>;

  const task = (async () => {
    try {
      const absolutePath = publicFilePath(publicDir, relativePath);
      if (!existsSync(absolutePath)) {
        if (kind === "image") {
          const existing = existingImageRef(assetIndex, relativePath);
          if (existing) {
            console.log(`  · reuse CDN image: ${relativePath}`);
            return existing;
          }
        } else {
          const existing = existingFileUrl(assetIndex, relativePath);
          if (existing) {
            console.log(`  · reuse CDN file: ${relativePath}`);
            return existing;
          }
        }
        console.warn(`  · skip (missing): ${relativePath}`);
        return undefined;
      }

      const rawBuffer = readFileSync(absolutePath);
      const originalFilename = basename(absolutePath);
      const ext = originalFilename.split(".").pop()?.toLowerCase() ?? "";

      if (kind === "image") {
        const { buffer, filename, contentType } = await compressRasterToWebp(
          rawBuffer,
          originalFilename,
        );
        const asset = await client.assets.upload("image", buffer, { filename, contentType });
        if (filename.endsWith(".webp") && !originalFilename.endsWith(".webp")) {
          console.log(`  · webp: ${relativePath} → ${filename}`);
        }
        return {
          _type: "image" as const,
          asset: { _type: "reference" as const, _ref: asset._id },
        };
      }

      const contentType = MIME[ext] ?? "application/octet-stream";
      const asset = await client.assets.upload("file", rawBuffer, {
        filename: originalFilename,
        contentType,
      });
      return asset.url as string;
    } catch (err) {
      console.warn(`  · skip upload ${relativePath}:`, err instanceof Error ? err.message : err);
      return undefined;
    }
  })();

  cache.set(cacheKey, task);
  return task;
}

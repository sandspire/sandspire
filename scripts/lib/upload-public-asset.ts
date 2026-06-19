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

export async function uploadPublicImage(
  client: SanityClient,
  publicDir: string,
  relativePath: string,
  cache: Map<string, Promise<unknown>>,
) {
  return uploadPublicFile(client, publicDir, relativePath, cache, "image") as Promise<
    { _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined
  >;
}

export async function uploadPublicFile(
  client: SanityClient,
  publicDir: string,
  relativePath: string,
  cache: Map<string, Promise<unknown>>,
  kind: "image" | "file" = "file",
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
        console.warn(`  · skip (missing): ${relativePath}`);
        return undefined;
      }

      const buffer = readFileSync(absolutePath);
      const filename = basename(absolutePath);
      const ext = filename.split(".").pop()?.toLowerCase() ?? "";
      const contentType = MIME[ext] ?? "application/octet-stream";

      if (kind === "image") {
        const asset = await client.assets.upload("image", buffer, { filename, contentType });
        return {
          _type: "image" as const,
          asset: { _type: "reference" as const, _ref: asset._id },
        };
      }

      const asset = await client.assets.upload("file", buffer, { filename, contentType });
      return asset.url as string;
    } catch (err) {
      console.warn(`  · skip upload ${relativePath}:`, err instanceof Error ? err.message : err);
      return undefined;
    }
  })();

  cache.set(cacheKey, task);
  return task;
}

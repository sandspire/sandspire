/**
 * Next may trace `next/dist/compiled/@vercel/og` into the server bundle even when
 * the app does not use `ImageResponse` / `next/og`. This stub keeps the module
 * loadable and tiny for Cloudflare Workers size limits. If you add dynamic OG
 * images, remove the webpack alias in `next.config.ts` that points to this file.
 */
export class ImageResponse extends Response {
  constructor() {
    super("", { status: 501 });
  }
}

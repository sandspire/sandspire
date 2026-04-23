import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = {
  ...defineCloudflareConfig(),
  // OpenNext runs `npm run build` by default; that must be plain `next build` so
  // this file can own the full Cloudflare bundle (`npm run build` → opennextjs-cloudflare).
  buildCommand: "npx next build",
};

export default config;

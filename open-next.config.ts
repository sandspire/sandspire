import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = {
  ...defineCloudflareConfig(),
  // OpenNext runs `npm run build` by default; that must be plain `next build` so
  // this file can own the full Cloudflare bundle (`npm run build` → opennextjs-cloudflare).
  // Webpack (not default Turbopack) so `next.config` `webpack` hooks replace
  // `next/dist/compiled/@vercel/og` with a tiny stub — critical for the 3 MiB
  // free-tier Worker script size limit. See `lib/stubs/vercel-og-stub.mjs`.
  buildCommand: "npx next build --webpack",
};

export default config;

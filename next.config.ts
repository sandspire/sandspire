import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import path from "path";

const ogStub = path.join(process.cwd(), "lib/stubs/vercel-og-stub.mjs");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["motion"],
  },
  turbopack: {
    resolveAlias: {
      // When using `next dev` / `next build --turbopack`, drop Vercel OG (WASM) from the trace
      "next/dist/compiled/@vercel/og": ogStub,
    },
  },
  // Production `open-next` build uses `next build --webpack` (see `open-next.config.ts`) so
  // this runs and keeps @vercel/og out of the OpenNext server handler (free plan ~3 MiB cap).
  webpack: (config, { isServer, webpack: webpackFromNext }) => {
    if (isServer) {
      const plugins = config.plugins ?? [];
      plugins.push(
        new webpackFromNext.NormalModuleReplacementPlugin(
          /[\\/]next[\\/]dist[\\/]compiled[\\/]@vercel[\\/]og[\\/].*$/,
          ogStub,
        ),
      );
      config.plugins = plugins;
    }
    return config;
  },
};

const sentryAuth = Boolean(process.env.SENTRY_AUTH_TOKEN);

const sentryConfig = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  sourcemaps: {
    disable: !sentryAuth,
  },
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
} as const;

// Production `next build` (OpenNext deploy) must stay under the free Workers limit (~3 MB gzip). The
// `@sentry/nextjs` webpack layer is large; omit it in production unless you opt in (paid tier / local).
// - `next dev` → Sentry app wiring stays on.
// - `opennext` / `next build` → off unless `OPENNEXT_WITH_SENTRY=1` is set for that process.
// Worker entry `cf-worker-sentry.ts` still uses `@sentry/cloudflare` if `SENTRY_DSN` is set.
const useSentryNextWebpack =
  process.env.NODE_ENV === "development" || process.env.OPENNEXT_WITH_SENTRY === "1";

export default useSentryNextWebpack
  ? withSentryConfig(nextConfig, sentryConfig)
  : nextConfig;

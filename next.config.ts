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
      // Drop unused Vercel OG (resvg.wasm, yoga, etc.) from the server trace for Cloudflare Workers
      "next/dist/compiled/@vercel/og": ogStub,
    },
  },
};

const sentryAuth = Boolean(process.env.SENTRY_AUTH_TOKEN);

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  sourcemaps: {
    disable: !sentryAuth,
  },
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
});

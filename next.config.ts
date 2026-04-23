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

export default nextConfig;

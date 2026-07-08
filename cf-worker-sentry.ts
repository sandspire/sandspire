// @ts-nocheck — entry is excluded from `tsc` / Next `tsc`; Wrangler bundles it after `npm run build` when `.open-next/worker.js` exists.
/**
 * Sentry for the Cloudflare **Worker** that wraps the OpenNext bundle.
 * OpenNext still emits `.open-next/worker.js` — this file imports it, wraps
 * the default `fetch` handler with `withSentry`, and re-exports the same
 * Durable Object bindings. Run `npm run build` first so the path exists.
 *
 * DSN: set `SENTRY_DSN` (or `NEXT_PUBLIC_SENTRY_DSN`) on the Worker
 * (wrangler `vars` / secrets / dashboard) — do not hardcode the DSN in source.
 */
import * as Sentry from "@sentry/cloudflare";

export {
  BucketCachePurge,
  DOQueueHandler,
  DOShardedTagCache,
} from "./.open-next/worker.js";
import openNext from "./.open-next/worker.js";

type WorkerEnv = {
  SENTRY_DSN?: string;
  NEXT_PUBLIC_SENTRY_DSN?: string;
  [key: string]: unknown;
};

// OpenNext default export: `{ fetch }` (same shape the Worker runtime expects)
const openNextHandler = openNext as {
  fetch: (req: Request, env: WorkerEnv, ctx: { waitUntil: (p: Promise<unknown>) => void; passThroughOnException: () => void }) => Response | Promise<Response>;
};

// Canonical host: 308-redirect www.sandspire.co → sandspire.co (preserving path + query).
// Handled here at the Worker edge because OpenNext does not apply Next.js
// `has: [{ type: "host" }]` redirects from next.config. Both hostnames are attached
// to this Worker as custom domains, so without this www would serve a duplicate origin.
const inner = {
  fetch: (
    req: Request,
    env: WorkerEnv,
    ctx: { waitUntil: (p: Promise<unknown>) => void; passThroughOnException: () => void },
  ) => {
    const url = new URL(req.url);
    if (url.hostname === "www.sandspire.co") {
      url.hostname = "sandspire.co";
      return Response.redirect(url.toString(), 308);
    }
    return openNextHandler.fetch(req, env, ctx);
  },
};

export default Sentry.withSentry(
  (env: WorkerEnv) => {
    const dsn = env.SENTRY_DSN || env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn) {
      return undefined;
    }
    return {
      dsn,
      sendDefaultPii: true,
      tracesSampleRate: 0.1,
    };
  },
  inner,
);

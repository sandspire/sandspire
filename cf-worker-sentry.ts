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
const inner = openNext as {
  fetch: (req: Request, env: WorkerEnv, ctx: { waitUntil: (p: Promise<unknown>) => void; passThroughOnException: () => void }) => Response | Promise<Response>;
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

import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "../env";

/** Uses `@sanity/client` (not `next-sanity`) to keep the Cloudflare Worker bundle smaller. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

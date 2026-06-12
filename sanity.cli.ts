/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from "sanity/cli";

/** Match `sanity/env.ts` so `npx sanity dev` works without `.env` in this folder. */
const DEFAULT_PROJECT_ID = "1fmk53vd";
const DEFAULT_DATASET = "production";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DEFAULT_DATASET;

export default defineCliConfig({ api: { projectId, dataset } });

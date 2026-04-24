/**
 * Used by the Sanity Studio (sanity.config) and the Next app.
 * `npx sanity dev` does not load `.env.local` — only `.env` — so we fall back to the
 * same public defaults as `.env.example` when vars are missing (e.g. local Studio).
 * Set `NEXT_PUBLIC_SANITY_*` in the host (or `.env` / `.env.local` for Next) in production.
 */
const DEFAULT_PROJECT_ID = "1fmk53vd"
const DEFAULT_DATASET = "production"
const DEFAULT_API_VERSION = "2026-04-23"

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || DEFAULT_API_VERSION

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DEFAULT_DATASET

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID

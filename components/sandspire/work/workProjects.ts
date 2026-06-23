/* ------------------------------------------------------------------ */
/* The work archive — REAL Sandspire clients, each backed by a reel in  */
/* /public/reels and an existing /work/[slug] case study. Add a new     */
/* project by dropping its files in /public/reels and appending here.   */
/* ------------------------------------------------------------------ */

export type Discipline = "Reels" | "Photography" | "Social";

export type WorkProject = {
  /** Stable key. */
  id: string;
  /** Brand name shown on the card. */
  name: string;
  /** @handle shown in the reel chrome. */
  handle: string;
  /** Existing case-study route: /work/[slug]. */
  slug: string;
  /** Venue / cuisine line under the title, e.g. "Asian seafood · Dubai". */
  place: string;
  /** Short label shown as the card eyebrow, e.g. "Reels · Social". */
  category: string;
  /** Disciplines this project covers — drives the filters. */
  disciplines: Discipline[];
  /** Year (or range) the work shipped. */
  year: string;
  /** One-line, brand-voiced description. */
  blurb: string;
  /** White brand mark for the reel avatar. */
  logo: string;
  /** Poster frame (held until the reel plays). */
  poster: string;
  /** Looping vertical reel. */
  reel: string;
};

/** The filter set. "All" is always first. */
export const WORK_FILTERS = ["All", "Reels", "Photography", "Social"] as const;
export type WorkFilter = (typeof WORK_FILTERS)[number];

/**
 * Order matters: the first project of any active filter becomes the page's
 * cinematic lead feature, so the flagship (3 Fils) sits first.
 */
export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "3-fils",
    name: "3 Fils",
    handle: "@3fils",
    slug: "3-fils",
    place: "Asian seafood · Jumeirah Fishing Harbour",
    category: "Reels · Social",
    disciplines: ["Reels", "Social"],
    year: "2026",
    blurb:
      "A rolling month of reels for the harbour-side room everyone already talks about — cut to keep the wait-list long and the tables turning.",
    logo: "/reels/logos/3fils.png",
    poster: "/reels/posters/3fils.jpg",
    reel: "/reels/3fils.mp4",
  },
  {
    id: "slrp",
    name: "Slrp Ramen",
    handle: "@slrpramen",
    slug: "slrp",
    place: "Ramen bar · Dubai",
    category: "Reels · Photography",
    disciplines: ["Reels", "Photography"],
    year: "2025",
    blurb:
      "Tokyo-street energy in short-form. Reels and stills that make a single bowl impossible to scroll past.",
    logo: "/reels/logos/slrp.png",
    poster: "/reels/posters/slrp.jpg",
    reel: "/reels/slrp.mp4",
  },
  {
    id: "kanji",
    name: "Kanji",
    handle: "@eatkanji",
    slug: "kanji",
    place: "Japanese kitchen · Dubai",
    category: "Reels",
    disciplines: ["Reels"],
    year: "2025",
    blurb:
      "Editorial food video with the art direction turned all the way up. One look tells you the table is worth booking.",
    logo: "/reels/logos/kanji.png",
    poster: "/reels/posters/kanji.jpg",
    reel: "/reels/kanji.mp4",
  },
  {
    id: "brix-journey",
    name: "Brix Journey",
    handle: "@brixjourney",
    slug: "brix-journey",
    place: "Specialty coffee · Dubai",
    category: "Reels · Social",
    disciplines: ["Reels", "Social"],
    year: "2025",
    blurb:
      "Specialty coffee shot the way the regulars feel it — quiet, warm, and worth the morning detour.",
    logo: "/reels/logos/brixjourney.png",
    poster: "/reels/posters/brixjourney.jpg",
    reel: "/reels/brixjourney.mp4",
  },
  {
    id: "brix-table",
    name: "Brix Table",
    handle: "@brixtable",
    slug: "brix-cafe",
    place: "All-day café · Dubai",
    category: "Photography · Social",
    disciplines: ["Photography", "Social"],
    year: "2025",
    blurb:
      "All-day dining, captured in daylight. A photo library and a feed as calm as the room itself.",
    logo: "/reels/logos/brixtable.png",
    poster: "/reels/posters/brixtable.jpg",
    reel: "/reels/brixtable.mp4",
  },
  {
    id: "konbini",
    name: "Konbini",
    handle: "@konbini",
    slug: "konbini",
    place: "Japanese snacks · Dubai",
    category: "Reels · Photography",
    disciplines: ["Reels", "Photography"],
    year: "2026",
    blurb:
      "Convenience-store nostalgia, reframed for Dubai. Playful reels that turn grab-and-go into a destination.",
    logo: "/reels/logos/konbini.png",
    poster: "/reels/posters/konbini.jpg",
    reel: "/reels/konbini.mp4",
  },
  {
    id: "bordo-mavi",
    name: "Bordo Mavi",
    handle: "@bordomavi",
    slug: "bordo-mavi",
    place: "Aegean dining · Dubai",
    category: "Reels · Social",
    disciplines: ["Reels", "Social"],
    year: "2025",
    blurb:
      "Aegean blue and Anatolian warmth. A feed that takes you to the coast before you've parked the car.",
    logo: "/reels/logos/bordomavi.png",
    poster: "/reels/posters/bordomavi.jpg",
    reel: "/reels/bordomavi.mp4",
  },
];

/** Count of projects matching a filter (used in the filter pills). */
export function countForFilter(filter: WorkFilter): number {
  if (filter === "All") return WORK_PROJECTS.length;
  return WORK_PROJECTS.filter((p) => p.disciplines.includes(filter)).length;
}

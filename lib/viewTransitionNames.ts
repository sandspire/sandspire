/** Stable view-transition-name for work card → project page morphs. */
export function workProjectTransitionName(slug: string) {
  return `work-${slug.replace(/[^a-z0-9-]/gi, "-")}`;
}

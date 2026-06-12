export const homePageV2ServiceCards = [
  {
    title: "Post-Production & Video Editing",
    description: "Cuts, color, and sound—ready to publish.",
  },
  {
    title: "AI-Infused Production",
    description: "Faster drafts, human polish throughout.",
  },
  {
    title: "Brand Experiences",
    description: "Identity that holds across touchpoints.",
  },
  {
    title: "Social Media Management",
    description: "Plan, post, and refine every month.",
  },
  {
    title: "UGC Content & SEO",
    description: "Creator content built to be found.",
  },
] as const;

export type HomePageV2ServiceCardTitle = (typeof homePageV2ServiceCards)[number]["title"];

export function getHomePageV2ServiceCard(title: HomePageV2ServiceCardTitle) {
  const card = homePageV2ServiceCards.find((entry) => entry.title === title);
  if (!card) {
    throw new Error(`Unknown home-2 service card: ${title}`);
  }
  return card;
}

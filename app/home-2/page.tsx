import type { Metadata } from "next";

import { HomePageV2 } from "@/components/sandspire/HomePageV2";
import {
  getClientLogos,
  getHomepageV2Content,
  getSiteSettings,
} from "@/sanity/lib/queries/siteContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomepageV2Content();
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function Home2Page() {
  const [site, content, logos] = await Promise.all([
    getSiteSettings(),
    getHomepageV2Content(),
    getClientLogos(),
  ]);

  return <HomePageV2 content={content} site={site} logos={logos} />;
}

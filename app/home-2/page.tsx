import type { Metadata } from "next";

import { HomePageV2 } from "@/components/sandspire/HomePageV2";

export const metadata: Metadata = {
  title: "Sandspire Home 2",
  description:
    "Alternate Sandspire homepage from Figma (Things / MacBook Air 14): video hero, featured work, service suite, showreel, contact and FAQ.",
};

export default function Home2Page() {
  return <HomePageV2 />;
}

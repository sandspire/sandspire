"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import card1 from "@/public/images/InstagramViewsAnalyticsFallback1.png";
import card2 from "@/public/images/InstagramViewsAnalyticsFallback2.png";
import card3 from "@/public/images/HeroVideoFallback.png";

export default function ThreeDMarqueeDemo() {
  const images = [
    card1,
    card2,
    card3,
    card1,
    card2,
    card3,
    card1,
    card2,
    card3,
  ];

  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} compact />
    </div>
  );
}

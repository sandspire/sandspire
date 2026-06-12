"use client";

import { WorkScrollCards, type ScrollCardItem } from "@/components/ui/scroll-card";
import type { FeaturedWorkScrollItem } from "@/lib/siteContentDefaults";
import { siteContentDefaults } from "@/lib/siteContentDefaults";

function toScrollCardItem(item: FeaturedWorkScrollItem): ScrollCardItem {
  return {
    videoSrc: item.videoPath,
    label: item.socialLabel,
    iconSrc: item.iconPath,
    href: item.href,
    title: item.title,
    tags: item.tags.map((label, i) => ({
      label,
      glow: item.tagGlow?.[i] === "white" ? "white" : undefined,
    })),
    description: item.description,
  };
}

type HomePageV2WorkScrollProps = {
  className?: string;
  items?: FeaturedWorkScrollItem[];
};

export function HomePageV2WorkScroll({
  className,
  items = siteContentDefaults.homepageV2.workScrollItems,
}: HomePageV2WorkScrollProps) {
  const cards = items.map(toScrollCardItem);

  return (
    <WorkScrollCards
      className={className}
      cards={cards}
      cardWidth={304}
      cardHeight={434}
      cardRadius={20}
    />
  );
}

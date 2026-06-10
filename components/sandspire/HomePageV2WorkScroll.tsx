"use client";

import { WorkScrollCards, type ScrollCardItem } from "@/components/ui/scroll-card";

const workScrollProjects: ScrollCardItem[] = [
  {
    videoSrc: "/videos/heroSideImg_3fils.mp4",
    label: "3.fils",
    iconSrc: "/logos/3fils.svg",
    href: "/work/3-fils",
    title: "3 Fils",
    tags: [
      { label: "Branding" },
      { label: "Web Development", glow: "white" },
    ],
    description:
      "Award-winning Asian restaurant with a loyal following and a menu built for sharing.",
  },
  {
    videoSrc: "/videos/heroSideImg_kanji.mp4",
    label: "eatkanji",
    iconSrc: "/logos/kanji.svg",
    href: "/work/kanji",
    title: "Kanji",
    tags: [{ label: "Branding" }],
    description:
      "Editorial-inspired food brand with a focused campaign rollout and distinctive art direction.",
  },
  {
    videoSrc: "/videos/heroSideImg_slrpramen.mp4",
    label: "slrp.ramen",
    iconSrc: "/logos/slrp.svg",
    href: "/work/slrp",
    title: "Slrp",
    tags: [
      { label: "Branding" },
      { label: "Web Development", glow: "white" },
    ],
    description:
      "High-energy ramen and rolls inspired by Tokyo street culture — built for busy malls, bold flavors, and fast-moving crowds.",
  },
];

export function HomePageV2WorkScroll({ className }: { className?: string }) {
  return <WorkScrollCards className={className} cards={workScrollProjects} />;
}

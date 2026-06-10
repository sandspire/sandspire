"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { cn } from "@/lib/utils";

/** Uniform phone size (based on largest Figma card, scaled). */
const CARD_WIDTH = 405;
const CARD_HEIGHT = 579;
const CARD_RADIUS = 25;
const CARD_SHADOW = "0px 5px 10.2px rgba(0,0,0,0.25)";

/** Pin below the sticky nav (54px) + Our Work title band. */
export const WORK_SCROLL_STICKY_TOP = "calc(54px + 7.75rem)";
/** Viewport band between the pinned title and pinned button. */
export const WORK_SCROLL_VIEWPORT_HEIGHT = "calc(100vh - 54px - 7.75rem - 4.75rem)";

const fadeEase = [0.33, 1, 0.68, 1] as [number, number, number, number];

export type ScrollCardTag = {
  label: string;
  glow?: "orange" | "white";
};

export type ScrollCardItem = {
  videoSrc: string;
  label: string;
  iconSrc: string;
  href: string;
  title: string;
  tags: ScrollCardTag[];
  description: string;
};

export type WorkScrollCardsProps = {
  cards: ScrollCardItem[];
  className?: string;
  stickyTop?: string;
  viewportHeight?: string;
};

function WorkTag({ children, glow = "orange" }: { children: string; glow?: "orange" | "white" }) {
  return (
    <span
      className="inline-flex h-[28px] items-center rounded-full bg-[rgba(27,27,27,0.2)] px-3 font-[family-name:var(--font-display)] text-[12px] font-light tracking-[-0.04em] text-[#e6ddd0]"
      style={{
        boxShadow:
          glow === "orange"
            ? "0 0 2px rgba(250,154,39,0.5)"
            : "0 0 2px rgba(255,68,0,0.5)",
      }}
    >
      {children}
    </span>
  );
}

function PlayButtonIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15.6739 15.6739"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6614 0C13.0659 0 13.7681 4.55948e-05 14.3046 0.273375C14.7765 0.513808 15.1601 0.897446 15.4005 1.36932C15.6739 1.90577 15.6739 2.60799 15.6739 4.01246V11.6614C15.6739 13.0659 15.6739 13.7681 15.4005 14.3046C15.1601 14.7765 14.7765 15.1601 14.3046 15.4005C13.7681 15.6739 13.0659 15.6739 11.6614 15.6739H4.01246C2.60799 15.6739 1.90577 15.6739 1.36932 15.4005C0.897446 15.1601 0.513808 14.7765 0.273375 14.3046C4.56355e-05 13.7681 0 13.0659 0 11.6614V4.01246C0 2.60799 4.55955e-05 1.90577 0.273375 1.36932C0.513808 0.897446 0.897446 0.513808 1.36932 0.273375C1.90577 4.56355e-05 2.60799 0 4.01246 0H11.6614ZM6.62238 4.22507C5.97357 3.85048 5.64912 3.66315 5.38285 3.68551C5.12965 3.70679 4.89908 3.83993 4.75406 4.04858C4.60159 4.268 4.60161 4.6426 4.60161 5.39173V9.95522C4.60161 10.7043 4.60159 11.0789 4.75406 11.2984C4.89908 11.507 5.12965 11.6402 5.38285 11.6614C5.64912 11.6838 5.97357 11.4965 6.62238 11.1219L10.5745 8.84014C11.2233 8.46559 11.5477 8.2783 11.6614 8.03655C11.7696 7.80661 11.7696 7.54034 11.6614 7.31041C11.5477 7.06865 11.2233 6.88137 10.5745 6.50681L6.62238 4.22507Z"
        fill="white"
      />
    </svg>
  );
}

function WorkScrollCardHeader({ iconSrc, label }: { iconSrc: string; label: string }) {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[13px] pt-[10px]">
      <div className="flex min-w-0 items-center gap-[7px]">
        <div className="relative size-[27px] shrink-0 overflow-hidden rounded-full bg-black/20">
          <img src={iconSrc} alt="" className="size-full object-cover" />
        </div>
        <span className="truncate font-[family-name:var(--font-display)] text-[10px] font-normal tracking-[-0.025em] text-white">
          {label}
        </span>
      </div>
      <PlayButtonIcon size={20} />
    </div>
  );
}

function WorkScrollSidebar({ card }: { card: ScrollCardItem }) {
  return (
    <Link href={card.href} className="group flex w-full flex-col items-start gap-[22px]">
      <h3 className="font-[family-name:var(--font-body)] text-[30px] font-medium leading-[1] text-white transition-opacity group-hover:opacity-90">
        {card.title}
      </h3>
      <div className="flex flex-wrap items-center gap-[19px]">
        {card.tags.map((tag) => (
          <WorkTag key={tag.label} glow={tag.glow}>
            {tag.label}
          </WorkTag>
        ))}
      </div>
      <p className="font-[family-name:var(--font-body)] text-[16px] font-normal leading-[1.86] text-white">
        {card.description}
      </p>
    </Link>
  );
}

function WorkScrollSidebarFade({
  cards,
  activeIndex,
  stickyTop,
  viewportHeight,
}: {
  cards: ScrollCardItem[];
  activeIndex: number;
  stickyTop: string;
  viewportHeight: string;
}) {
  const reduceMotion = useReducedMotion();
  const activeCard = cards[activeIndex];

  return (
    <div
      className="sticky z-10 grid w-full max-w-[394px] shrink-0 place-items-center lg:w-[394px]"
      style={{ top: stickyTop, height: viewportHeight }}
    >
      <div className="relative min-h-[220px] w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCard.videoSrc}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: fadeEase }}
            className="w-full"
          >
            <WorkScrollSidebar card={activeCard} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function WorkScrollStickyPanel({
  index,
  stickyTop,
  viewportHeight,
  children,
  panelRef,
}: {
  index: number;
  stickyTop: string;
  viewportHeight: string;
  children: ReactNode;
  panelRef?: (node: HTMLElement | null) => void;
}) {
  return (
    <figure
      ref={panelRef}
      data-card-index={index}
      className="sticky z-10 grid place-items-center"
      style={{
        top: stickyTop,
        height: viewportHeight,
        zIndex: index + 1,
      }}
    >
      {children}
    </figure>
  );
}

function WorkScrollCard({ card }: { card: ScrollCardItem }) {
  return (
    <Link
      href={card.href}
      className="group relative block transition-transform duration-300 ease-out hover:scale-[1.01]"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      <article
        className="relative size-full overflow-hidden"
        style={{
          borderRadius: CARD_RADIUS,
          boxShadow: CARD_SHADOW,
        }}
      >
        <DeferredVideo
          className="size-full object-cover"
          src={card.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          loadStrategy="visible"
        />
        <WorkScrollCardHeader iconSrc={card.iconSrc} label={card.label} />
      </article>
    </Link>
  );
}

export function WorkScrollCards({
  cards,
  className,
  stickyTop = WORK_SCROLL_STICKY_TOP,
  viewportHeight = WORK_SCROLL_VIEWPORT_HEIGHT,
}: WorkScrollCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const visibilityRef = useRef<boolean[]>(cards.map(() => false));

  const setPanelRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      panelRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const nodes = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    visibilityRef.current = cards.map(() => false);

    const syncActiveIndex = () => {
      const visibleIndices = visibilityRef.current
        .map((visible, index) => (visible ? index : -1))
        .filter((index) => index >= 0);

      if (!visibleIndices.length) return;
      setActiveIndex(Math.max(...visibleIndices));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-card-index"));
          if (Number.isNaN(index)) return;
          visibilityRef.current[index] =
            entry.isIntersecting && entry.intersectionRatio >= 0.35;
        });
        syncActiveIndex();
      },
      { threshold: [0, 0.35, 0.55, 0.75] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [cards]);

  return (
    <div
      className={cn(
        "relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-[75px]",
        className,
      )}
    >
      <WorkScrollSidebarFade
        cards={cards}
        activeIndex={activeIndex}
        stickyTop={stickyTop}
        viewportHeight={viewportHeight}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[415px] gap-0">
        {cards.map((card, index) => (
          <WorkScrollStickyPanel
            key={card.videoSrc}
            index={index}
            stickyTop={stickyTop}
            viewportHeight={viewportHeight}
            panelRef={setPanelRef(index)}
          >
            <WorkScrollCard card={card} />
          </WorkScrollStickyPanel>
        ))}
      </div>
    </div>
  );
}

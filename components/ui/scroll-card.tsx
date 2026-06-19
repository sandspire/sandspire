"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { cn } from "@/lib/utils";

/** Uniform phone size (based on largest Figma card, scaled). */
const DEFAULT_CARD_WIDTH = 405;
const DEFAULT_CARD_HEIGHT = 579;
const DEFAULT_CARD_RADIUS = 25;
const CARD_SHADOW = "0px 5px 10.2px rgba(0,0,0,0.25)";

/** Pin below the sticky nav (54px) + Our Work title band (static, not sticky). */
export const WORK_SCROLL_STICKY_TOP = "calc(54px + 2rem)";
/** Viewport band for stacking cards. */
export const WORK_SCROLL_VIEWPORT_HEIGHT = "calc(100dvh - 54px - 2rem - 4.75rem)";
/** Mobile: pin copy below nav; cards stack beneath the sticky copy band. */
export const WORK_SCROLL_STICKY_TOP_MOBILE = "calc(54px + 0.75rem)";
export const WORK_SCROLL_COPY_HEIGHT_MOBILE = "10rem";
export const WORK_SCROLL_VIEWPORT_HEIGHT_MOBILE =
  "calc(100dvh - 54px - 0.75rem - 10rem - 0.25rem)";

/** Card must fill the sticky band before sidebar copy advances. */
const CARD_FULLY_VISIBLE_RATIO = 0.98;
const fadeEase = [0.33, 1, 0.68, 1] as [number, number, number, number];
const glideSpring = { type: "spring" as const, stiffness: 360, damping: 34, mass: 0.85 };

const sidebarSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 56 : -56,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -56 : 56,
    opacity: 0,
  }),
};

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
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
};

function WorkTag({ children, glow = "orange" }: { children: string; glow?: "orange" | "white" }) {
  return (
    <span
      className="inline-flex h-[28px] items-center rounded-full bg-[rgba(27,27,27,0.2)] px-3 font-body text-[12px] font-normal tracking-[-0.04em] text-[#e6ddd0] not-italic"
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
        <span className="truncate font-body text-[10px] font-normal tracking-[-0.025em] text-white not-italic">
          {label}
        </span>
      </div>
      <PlayButtonIcon size={20} />
    </div>
  );
}

function WorkScrollProjectNav({
  cards,
  activeIndex,
  onSelect,
}: {
  cards: ScrollCardItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="relative z-20 mb-4 flex w-full justify-center gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:mb-5 sm:gap-1.5 [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Featured projects"
    >
      {cards.map((card, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={card.videoSrc}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(index)}
            className={cn(
              "relative shrink-0 snap-start rounded-full px-3 py-2 text-[11px] font-medium leading-none transition-colors duration-200 sm:px-4 sm:py-2.5 sm:text-[12px]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",
              isActive ? "text-[#faf3e8]" : "text-white/50 hover:text-white/80",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="work-scroll-nav-pill"
                className="absolute inset-0 rounded-full bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/10"
                transition={glideSpring}
              />
            ) : null}
            <span className="relative whitespace-nowrap">{card.title}</span>
          </button>
        );
      })}
    </div>
  );
}

function WorkScrollSidebarCopy({
  card,
  className,
}: {
  card: ScrollCardItem;
  className?: string;
}) {
  return <WorkScrollSidebar card={card} className={className} />;
}

function WorkScrollSidebarGlide({
  cards,
  activeIndex,
  direction,
  className,
}: {
  cards: ScrollCardItem[];
  activeIndex: number;
  direction: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const card = cards[activeIndex];

  if (reduceMotion) {
    return <WorkScrollSidebarCopy card={card} className={className} />;
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={sidebarSlideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: fadeEase }}
        >
          <WorkScrollSidebarCopy card={card} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WorkScrollSidebar({ card, className }: { card: ScrollCardItem; className?: string }) {
  return (
    <Link
      href={card.href}
      className={cn(
        "work-scroll-sidebar group flex w-full flex-col items-start gap-[22px] font-body lg:pt-0",
        className,
      )}
    >
      <h3 className="font-body text-[30px] font-medium leading-[1] text-white not-italic transition-opacity group-hover:opacity-90">
        {card.title}
      </h3>
      <div className="flex flex-wrap items-center gap-[19px]">
        {card.tags.map((tag) => (
          <WorkTag key={tag.label} glow={tag.glow}>
            {tag.label}
          </WorkTag>
        ))}
      </div>
      <p className="font-body text-[16px] font-normal leading-[1.86] text-white not-italic">
        {card.description}
      </p>
    </Link>
  );
}

function WorkScrollMobileStickyCopy({
  cards,
  activeIndex,
  direction,
}: {
  cards: ScrollCardItem[];
  activeIndex: number;
  direction: number;
}) {
  return (
    <div className="work-scroll-mobile-copy relative min-h-[var(--work-scroll-copy-h)] w-full overflow-hidden">
      <WorkScrollSidebarGlide
        cards={cards}
        activeIndex={activeIndex}
        direction={direction}
        className="gap-3 pt-5 [&_h3]:text-[22px] [&_p]:line-clamp-3 [&_p]:text-[14px] [&_p]:leading-[1.6]"
      />
    </div>
  );
}

function WorkScrollSidebarFade({
  cards,
  activeIndex,
  direction,
  stickyTop,
  viewportHeight,
}: {
  cards: ScrollCardItem[];
  activeIndex: number;
  direction: number;
  stickyTop: string;
  viewportHeight: string;
}) {
  return (
    <div
      className="relative z-10 w-full max-w-[394px] shrink-0 lg:sticky lg:h-[var(--work-scroll-vh)] lg:w-[394px]"
      style={{ top: stickyTop, ["--work-scroll-vh" as string]: viewportHeight }}
    >
      <div className="relative min-h-[200px] w-full lg:flex lg:h-full lg:min-h-0 lg:items-center">
        <WorkScrollSidebarGlide
          cards={cards}
          activeIndex={activeIndex}
          direction={direction}
          className="lg:absolute lg:inset-0 lg:flex lg:items-center"
        />
      </div>
    </div>
  );
}

function WorkScrollStickyPanel({
  index,
  children,
  panelRef,
}: {
  index: number;
  children: ReactNode;
  panelRef?: (node: HTMLElement | null) => void;
}) {
  return (
    <figure
      ref={panelRef}
      data-card-index={index}
      className="relative z-10 grid place-items-center sticky h-[var(--work-scroll-vh)] max-lg:place-items-start max-lg:justify-items-center max-lg:pt-1"
      style={{
        top: "var(--work-scroll-card-sticky-top, var(--work-scroll-sticky-top))",
        scrollMarginTop: "var(--work-scroll-card-sticky-top, var(--work-scroll-sticky-top))",
        zIndex: index + 1,
      }}
    >
      {children}
    </figure>
  );
}

function WorkScrollCard({
  card,
  cardWidth,
  cardHeight,
  cardRadius,
  isActive,
  onSelect,
}: {
  card: ScrollCardItem;
  cardWidth: number;
  cardHeight: number;
  cardRadius: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const responsiveCardWidth = `min(${cardWidth}px, calc(100vw - 3rem))`;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative"
      style={{ width: responsiveCardWidth, aspectRatio: `${cardWidth} / ${cardHeight}` }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: isActive ? 1 : 0.985,
              y: isActive ? 0 : 6,
            }
      }
      transition={{ duration: 0.35, ease: fadeEase }}
    >
      <Link
        href={card.href}
        onClick={(event) => {
          if (!isActive) {
            event.preventDefault();
            onSelect();
          }
        }}
        className="group relative block size-full transition-[filter] duration-300 ease-out hover:brightness-[1.03]"
      >
        <article
          className="relative size-full overflow-hidden"
          style={{
            borderRadius: cardRadius,
            boxShadow: isActive ? CARD_SHADOW : "0px 3px 8px rgba(0,0,0,0.18)",
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
    </motion.div>
  );
}

export function WorkScrollCards({
  cards,
  className,
  stickyTop = WORK_SCROLL_STICKY_TOP,
  viewportHeight = WORK_SCROLL_VIEWPORT_HEIGHT,
  cardWidth = DEFAULT_CARD_WIDTH,
  cardHeight = DEFAULT_CARD_HEIGHT,
  cardRadius = DEFAULT_CARD_RADIUS,
}: WorkScrollCardsProps) {
  const [activeIndex, setActiveIndexState] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const visibilityRef = useRef<boolean[]>(cards.map(() => false));
  const activeIndexRef = useRef(0);
  const isProgrammaticScrollRef = useRef(false);

  const setActiveIndex = useCallback((nextIndex: number) => {
    setActiveIndexState((prev) => {
      if (nextIndex === prev) return prev;
      setSlideDirection(nextIndex > prev ? 1 : -1);
      activeIndexRef.current = nextIndex;
      return nextIndex;
    });
  }, []);

  const scrollToCard = useCallback(
    (index: number) => {
      const panel = panelRefs.current[index];
      if (!panel) return;

      isProgrammaticScrollRef.current = true;
      setActiveIndex(index);

      panel.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 700);
    },
    [setActiveIndex],
  );

  const setPanelRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      panelRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const nodes = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    visibilityRef.current = cards.map((_, index) => index === 0);

    const syncActiveIndex = () => {
      if (isProgrammaticScrollRef.current) return;
      const fullyVisibleIndices = visibilityRef.current
        .map((visible, index) => (visible ? index : -1))
        .filter((index) => index >= 0);

      if (!fullyVisibleIndices.length) return;
      setActiveIndex(Math.max(...fullyVisibleIndices));
    };

    syncActiveIndex();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-card-index"));
          if (Number.isNaN(index)) return;
          visibilityRef.current[index] =
            entry.isIntersecting && entry.intersectionRatio >= CARD_FULLY_VISIBLE_RATIO;
        });
        syncActiveIndex();
      },
      { threshold: [0, 0.5, 0.75, 0.9, 0.95, 0.98, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [cards, setActiveIndex]);

  const viewportHeightExpr = viewportHeight.startsWith("calc(")
    ? viewportHeight.slice(5, -1)
    : viewportHeight;
  const mobileViewportHeightExpr = WORK_SCROLL_VIEWPORT_HEIGHT_MOBILE.startsWith("calc(")
    ? WORK_SCROLL_VIEWPORT_HEIGHT_MOBILE.slice(5, -1)
    : WORK_SCROLL_VIEWPORT_HEIGHT_MOBILE;

  const stackHeight = `calc(${cards.length} * (${viewportHeightExpr}))`;
  const stackHeightMobile = `calc(${cards.length} * (${mobileViewportHeightExpr}))`;

  return (
    <div className={cn("w-full", className)}>
      <WorkScrollProjectNav cards={cards} activeIndex={activeIndex} onSelect={scrollToCard} />

      <div
        className="work-scroll-cards relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-stretch gap-0 lg:flex-row lg:items-start lg:justify-center lg:gap-[75px]"
        style={
          {
            "--work-stack-h-desktop": stackHeight,
            "--work-stack-h-mobile": stackHeightMobile,
          } as CSSProperties
        }
      >
      <div className="relative hidden w-full max-w-[394px] shrink-0 lg:ml-10 lg:block lg:w-[394px] lg:min-h-[var(--work-stack-h)]">
        <WorkScrollSidebarFade
          cards={cards}
          activeIndex={activeIndex}
          direction={slideDirection}
          stickyTop={stickyTop}
          viewportHeight={viewportHeight}
        />
      </div>

      <div
        className="relative z-10 mx-auto w-full max-w-[min(394px,calc(100vw-3rem))] lg:max-w-[var(--work-scroll-card-col-max)]"
        style={
          {
            "--work-scroll-card-col-max": `min(${cardWidth + 10}px, calc(100vw - 3rem))`,
          } as CSSProperties
        }
      >
        <div
          className="sticky z-20 w-full lg:hidden"
          style={{ top: "var(--work-scroll-sticky-top)" }}
        >
          <WorkScrollMobileStickyCopy
            cards={cards}
            activeIndex={activeIndex}
            direction={slideDirection}
          />
        </div>

        <div ref={stackRef} className="relative grid w-full min-h-[var(--work-stack-h)] gap-0 lg:min-h-0">
          {cards.map((card, index) => (
            <WorkScrollStickyPanel
              key={card.videoSrc}
              index={index}
              panelRef={setPanelRef(index)}
            >
              <WorkScrollCard
                card={card}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                cardRadius={cardRadius}
                isActive={index === activeIndex}
                onSelect={() => scrollToCard(index)}
              />
            </WorkScrollStickyPanel>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

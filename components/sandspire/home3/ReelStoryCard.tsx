"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

export type ReelStory = {
  /** Display name in the bottom caption / a11y label */
  name: string;
  /** @handle shown in the Instagram-story overlay */
  handle: string;
  /** White brand logo for the story avatar, e.g. /reels/logos/3fils.png */
  logo: string;
  /** Public path to the looping reel, e.g. /reels/3fils.mp4 */
  src: string;
  /** Poster frame shown until the video plays, e.g. /reels/posters/3fils.jpg */
  poster: string;
};

type ReelStoryCardProps = {
  story: ReelStory;
  /** Index in the carousel (used to restart the progress bar on activation) */
  index: number;
  /** Whether this card is the focused "story" (hover / default center) */
  isActive: boolean;
  /** Whether the hero is on screen — gates video playback for performance */
  inView: boolean;
  reduceMotion: boolean;
  onActivate: () => void;
  className?: string;
};

/**
 * A 9:16-ish "reel" card. Inactive cards hold their poster frame; the single
 * active card autoplays its muted loop and wears the Instagram-story chrome
 * (progress bar, avatar, @handle, more/close) — the overlay "jumps" to whichever
 * card the visitor hovers, exactly like the reference interaction.
 */
export function ReelStoryCard({
  story,
  index,
  isActive,
  inView,
  reduceMotion,
  onActivate,
  className,
}: ReelStoryCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only the active, on-screen card plays — keeps 7 reels from thrashing.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive && inView) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive, inView]);

  return (
    <figure
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      aria-label={`${story.name} reel`}
      className={cn(
        "group relative shrink-0 cursor-pointer select-none overflow-hidden rounded-[18px] bg-[#160a06] outline-none",
        "h-[346px] w-[248px] sm:h-[370px] sm:w-[268px] md:h-[400px] md:w-[290px] lg:h-[430px] lg:w-[306px]",
        "ring-1 ring-white/10 transition-[transform,box-shadow,filter] duration-500 ease-out",
        isActive
          ? "z-20 scale-[1.015] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-white/25"
          : "shadow-[0_24px_60px_-34px_rgba(0,0,0,0.85)] brightness-[0.82] saturate-[0.9] group-hover:brightness-100",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={story.src}
        poster={story.poster}
        muted
        loop
        playsInline
        preload="metadata"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Legibility gradient (stronger when active so chrome reads) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isActive ? 1 : 0.55,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 24%, transparent 52%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* ACTIVE: Instagram-story chrome */}
      <AnimatePresence>
        {isActive ? (
          <motion.div
            key="story-chrome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-0 p-3"
          >
            {/* Progress bar */}
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/30">
              <motion.div
                // restart the fill each time the overlay lands on a new card
                key={reduceMotion ? "static" : `fill-${index}`}
                className="h-full rounded-full bg-white"
                initial={{ width: reduceMotion ? "62%" : "0%" }}
                animate={{ width: reduceMotion ? "62%" : "100%" }}
                transition={{ duration: reduceMotion ? 0 : 7, ease: "linear" }}
              />
            </div>

            {/* Handle row */}
            <div className="mt-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[#141210] p-[5px] ring-2 ring-white/85">
                  {/* avatar = the brand's white logo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.logo}
                    alt={`${story.name} logo`}
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </span>
                <span className="font-[family-name:var(--font-body)] text-[14px] font-semibold tracking-tight text-white">
                  {story.handle}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <circle cx="5" cy="12" r="1.6" />
                  <circle cx="12" cy="12" r="1.6" />
                  <circle cx="19" cy="12" r="1.6" />
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Bottom caption */}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3.5">
        <p className="font-[family-name:var(--font-display)] text-[16px] font-medium leading-tight text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          {story.name}
        </p>
        <span
          className="flex h-6 items-center gap-1 rounded-full bg-black/30 px-2 font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm"
          aria-hidden
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
          Reel
        </span>
      </figcaption>
    </figure>
  );
}

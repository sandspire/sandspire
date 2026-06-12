"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  className?: string;
  /** Number of marquee rows (default 3). */
  rows?: number;
  /** Cap tiles per row so each band is shorter / taller visually (default 2). */
  maxPerRow?: number;
  pauseOnHover?: boolean;
  /** Tighter, centered layout for home-2 service bento. */
  variant?: "default" | "compact";
};

/**
 * 3D Marquee — horizontal scrolling rows with strong isometric tilt.
 * `compact` fits the home-2 bento: smaller tiles, centered, flush vertical fit.
 */
export function WebDesignPortfolioCascade({
  images,
  className,
  rows = 3,
  maxPerRow = 2,
  pauseOnHover = true,
  variant = "default",
}: Props) {
  const isCompact = variant === "compact";
  const rowArraysRaw: string[][] = Array.from({ length: rows }, (_, rowIdx) =>
    images.filter((_, i) => i % rows === rowIdx),
  );
  const rowArrays = rowArraysRaw.map((row) => {
    if (!row.length) return row;
    const capped = row.slice(0, maxPerRow);
    const padded = [...capped];
    while (padded.length < maxPerRow) {
      padded.push(row[padded.length % row.length]!);
    }
    return padded;
  });

  const rowsEl = (
    <div
      style={{
        transform: isCompact
          ? "rotateX(28deg) rotateY(-8deg) rotateZ(-8deg)"
          : "rotateX(32deg) rotateY(-10deg) rotateZ(-10deg)",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "flex w-max flex-col",
        isCompact ? "gap-0 py-0" : "max-md:gap-4 gap-6 py-1 max-md:py-0.5 md:py-2",
      )}
    >
      {rowArrays.map((rowImages, rowIdx) => {
        const reverse = rowIdx % 2 === 1;
        const loopImages = [...rowImages, ...rowImages, ...rowImages];

        return (
          <div
            key={rowIdx}
            className={cn(
              "flex w-max flex-shrink-0",
              isCompact ? "gap-0" : "gap-3 md:gap-6",
              pauseOnHover && "hover:[animation-play-state:paused]",
              reverse ? "animate-marquee-reverse" : "animate-marquee",
            )}
          >
            {loopImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className={cn(
                  "box-border flex-shrink-0 overflow-hidden border-solid border-white/25 shadow-[0_4px_10px_rgba(0,0,0,0.28)]",
                  isCompact
                    ? "h-[78px] w-[111px] rounded-none border-0 shadow-none sm:h-[90px] sm:w-[129px] md:h-[102px] md:w-[144px] lg:h-[114px] lg:w-[162px]"
                    : "h-[110px] w-[156px] rounded-lg border-2 md:h-[248px] md:w-[352px] md:rounded-xl md:border-[3px] md:shadow-[0_8px_22px_rgba(0,0,0,0.38),0_3px_8px_rgba(0,0,0,0.22)]",
                )}
              >
                <img
                  src={src}
                  alt=""
                  className="block h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className={cn(
        "relative h-full min-h-0 w-full overflow-hidden",
        isCompact
          ? "[perspective-origin:50%_50%]"
          : "max-md:[perspective-origin:50%_42%] md:[perspective-origin:15%_50%]",
        className,
      )}
      style={{
        perspective: isCompact ? "520px" : "600px",
      }}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          !isCompact &&
            "max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-0 md:bottom-[-20%] md:left-[20%] md:-right-[15%] md:top-[-20%]",
        )}
      >
        <div
          className={cn(
            "flex h-full w-full overflow-hidden",
            isCompact ? "items-center justify-center" : "items-center justify-center",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={cn(
              "will-change-transform",
              isCompact
                ? "origin-center [transform:scale(1.32)] sm:[transform:scale(1.42)] md:[transform:scale(1.5)] lg:[transform:scale(1.58)]"
                : "origin-[48%_42%] [transform:scale(0.91)] md:origin-center md:[transform:scale(1.08)]",
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {rowsEl}
          </div>
        </div>
      </div>
    </div>
  );
}

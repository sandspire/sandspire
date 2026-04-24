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
};

/**
 * 3D Marquee — horizontal scrolling rows with strong isometric tilt.
 * On small viewports, tiles and overall scale are reduced; the frame uses full width (no side inset).
 */
export function WebDesignPortfolioCascade({
  images,
  className,
  rows = 3,
  maxPerRow = 2,
  pauseOnHover = true,
}: Props) {
  const rowArraysRaw: string[][] = Array.from({ length: rows }, (_, rowIdx) =>
    images.filter((_, i) => i % rows === rowIdx),
  );
  const rowArrays = rowArraysRaw.map((row) => row.slice(0, maxPerRow));

  const rowsEl = (
    <div
      style={{
        transform: "rotateX(32deg) rotateY(-10deg) rotateZ(-10deg)",
        transformStyle: "preserve-3d",
      }}
      className="flex w-max max-md:gap-4 flex-col gap-6 py-1 max-md:py-0.5 md:py-2"
    >
      {rowArrays.map((rowImages, rowIdx) => {
        const reverse = rowIdx % 2 === 1;
        const loopImages = [...rowImages, ...rowImages, ...rowImages];

        return (
          <div
            key={rowIdx}
            className={cn(
              "flex w-max flex-shrink-0 gap-3 md:gap-6",
              pauseOnHover && "hover:[animation-play-state:paused]",
              reverse ? "animate-marquee-reverse" : "animate-marquee",
            )}
          >
            {loopImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="box-border h-[110px] w-[156px] flex-shrink-0 overflow-hidden rounded-lg border-2 border-solid border-white/25 shadow-[0_5px_14px_rgba(0,0,0,0.32)] md:h-[248px] md:w-[352px] md:rounded-xl md:border-[3px] md:shadow-[0_8px_22px_rgba(0,0,0,0.38),0_3px_8px_rgba(0,0,0,0.22)]"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
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
        "relative h-full min-h-0 w-full max-md:[perspective-origin:50%_42%] overflow-hidden md:[perspective-origin:15%_50%]",
        className,
      )}
      style={{
        perspective: "600px",
      }}
    >
      {/* Full width on mobile; desktop keeps offset crop for the tilted stage */}
      <div
        className="absolute max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-0 overflow-hidden md:bottom-[-20%] md:left-[20%] md:-right-[15%] md:top-[-20%]"
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="origin-[48%_42%] [transform:scale(0.91)] will-change-transform md:origin-center md:[transform:scale(1.08)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {rowsEl}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  images?: string[];
  /** Explicit row groups (overrides flat `images` + modulo split). */
  imageRows?: string[][];
  className?: string;
  /** Number of marquee rows (default 3). */
  rows?: number;
  /** Cap tiles per row so each band is shorter / taller visually (default 2). */
  maxPerRow?: number;
  pauseOnHover?: boolean;
  /** Tighter, centered layout for home-2 service bento. */
  variant?: "default" | "compact";
  /** Scale to fit the 120px homepage mobile bento without clipping. */
  fitMobileBento?: boolean;
};

const compactTileMaxHeight =
  "max-h-[72px] sm:max-h-[80px] md:max-h-[88px] lg:max-h-[96px]";

function CompactCascadeTile({ src }: { src: string }) {
  return (
    <div className="box-border flex-shrink-0 overflow-hidden rounded-[14px] border border-[#9a9a9a]/45 bg-black/10 p-0 shadow-[0_2px_8px_rgba(0,0,0,0.22)]">
      <img
        src={src}
        alt=""
        className={cn("block h-auto w-auto max-w-none object-fill", compactTileMaxHeight)}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/**
 * 3D Marquee — horizontal scrolling rows with strong isometric tilt.
 * `compact` fits the home-2 bento: smaller tiles, centered, flush vertical fit.
 */
export function WebDesignPortfolioCascade({
  images = [],
  imageRows,
  className,
  rows = 3,
  maxPerRow = 2,
  pauseOnHover = true,
  variant = "default",
  fitMobileBento = false,
}: Props) {
  const isCompact = variant === "compact";
  const rowArraysRaw: string[][] =
    imageRows ??
    Array.from({ length: rows }, (_, rowIdx) =>
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
        isCompact ? "gap-[10px] py-0" : "max-md:gap-4 gap-6 py-0.5 max-md:py-0 md:py-0",
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
              isCompact ? "gap-[10px]" : "gap-3 md:gap-6",
              pauseOnHover && "hover:[animation-play-state:paused]",
              reverse ? "animate-marquee-reverse" : "animate-marquee",
            )}
          >
            {loopImages.map((src, i) =>
              isCompact ? (
                <CompactCascadeTile key={`${src}-${i}`} src={src} />
              ) : (
                <div
                  key={`${src}-${i}`}
                  className="box-border h-[110px] w-[156px] flex-shrink-0 overflow-hidden rounded-lg border-2 border-solid border-white/25 shadow-[0_4px_10px_rgba(0,0,0,0.28)] md:h-[248px] md:w-[352px] md:rounded-xl md:border-[3px] md:shadow-[0_8px_22px_rgba(0,0,0,0.38),0_3px_8px_rgba(0,0,0,0.22)]"
                >
                  <img
                    src={src}
                    alt=""
                    className="block h-full w-full scale-[1.03] object-fill object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ),
            )}
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
          ? fitMobileBento
            ? "[perspective-origin:50%_68%]"
            : "[perspective-origin:50%_50%]"
          : "max-md:[perspective-origin:50%_45%] md:[perspective-origin:50%_50%]",
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
            "max-md:bottom-[-8%] max-md:left-0 max-md:right-0 max-md:top-[-8%] md:bottom-[-16%] md:left-[-10%] md:right-[-10%] md:top-[-16%]",
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
                ? fitMobileBento
                  ? "origin-[50%_78%] [transform:scale(0.54)]"
                  : "origin-center [transform:scale(0.95)] sm:[transform:scale(1)] md:[transform:scale(1.05)] lg:[transform:scale(1.11)]"
                : "origin-center [transform:scale(1.2)] md:[transform:scale(0.6)]",
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

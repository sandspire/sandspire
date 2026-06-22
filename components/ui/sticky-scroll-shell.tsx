"use client";

import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type StickyScrollShellProps = {
  children: ReactNode;
  /** Tailwind height class for the scroll track (e.g. `h-[100dvh]`, `h-[720px]`). */
  heightClass?: string;
  /** Pin content to the top (hero) or bottom (footer reveal). */
  pin?: "top" | "bottom";
  /** Sticky offset when `pin="bottom"` (must match shell height). */
  stickyBottomClass?: string;
  className?: string;
  shellClassName?: string;
};

const clipPath = "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)";

/**
 * Scroll-pinned shell (same mechanic as sticky-footer): a fixed panel stays in view
 * while the user scrolls through `heightClass` of document space.
 */
export const StickyScrollShell = forwardRef<HTMLDivElement, StickyScrollShellProps>(
  function StickyScrollShell(
    {
      children,
      heightClass = "h-[100dvh]",
      pin = "top",
      stickyBottomClass = "top-[calc(100dvh-720px)]",
      className,
      shellClassName,
    },
    ref,
  ) {
    const isTop = pin === "top";

    return (
      <div
        ref={ref}
        className={cn("relative w-full", heightClass, className)}
        style={{ clipPath }}
        data-sticky-scroll-track
      >
        <div
          className={cn(
            "fixed w-full",
            heightClass,
            isTop ? "top-0" : "bottom-0",
            shellClassName,
          )}
        >
          <div
            className={cn(
              "sticky h-full overflow-hidden",
              isTop ? "top-0" : stickyBottomClass,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

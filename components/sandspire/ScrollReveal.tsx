"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Initial vertical offset in px */
  y?: number;
  /** Seconds after the element enters the viewport */
  delay?: number;
  duration?: number;
  once?: boolean;
};

/** Subtle ease-out (no overshoot) */
const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/**
 * Reveal-on-scroll wrapper.
 *
 * Important: the server renders content VISIBLE (never blank), so above-the-fold
 * content shows immediately even before JavaScript hydrates. After mount we hide
 * only the blocks that start *below* the fold (still off-screen, so no flash),
 * then fade them up as they scroll into view.
 */
export function ScrollReveal({
  children,
  className,
  y = 32,
  delay = 0,
  duration = 0.52,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // "initial" = first paint / SSR (visible, no animation)
  // "hidden"  = below the fold, waiting to reveal
  // "visible" = revealed (fades up)
  const [state, setState] = useState<"initial" | "hidden" | "visible">("initial");

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top >= window.innerHeight * 0.9;
    setState(belowFold ? "hidden" : "visible");
  }, [reduceMotion]);

  useEffect(() => {
    if (state !== "hidden") return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("visible");
            if (once) observer.disconnect();
          } else if (!once) {
            setState("hidden");
          }
        }
      },
      { rootMargin: "0px 0px -56px 0px", threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [state, once]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const hidden = state === "hidden";

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? y : 0 }}
      // Only animate when revealing on scroll; the initial/instant states snap.
      transition={state === "visible" ? { duration, delay, ease } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}

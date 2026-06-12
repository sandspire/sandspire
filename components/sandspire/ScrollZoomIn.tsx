"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScrollZoomInProps = {
  children: ReactNode;
  className?: string;
  maxScale?: number;
};

/** Subtle scale-up as the element scrolls into the viewport. */
export function ScrollZoomIn({ children, className, maxScale = 1.06 }: ScrollZoomInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center center", "end 0.2"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.96, maxScale, 0.98]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("origin-center will-change-transform", className)}
      style={{ scale }}
    >
      {children}
    </motion.div>
  );
}

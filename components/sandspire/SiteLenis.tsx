"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import "lenis/dist/lenis.css";

type SiteLenisProps = {
  children: ReactNode;
};

/** Smooth scroll site-wide (desktop wheel + mobile touch). Disabled when reduced motion is on. */
export function SiteLenis({ children }: SiteLenisProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1.35,
      }}
    >
      {children}
    </ReactLenis>
  );
}

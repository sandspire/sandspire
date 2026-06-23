"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import "lenis/dist/lenis.css";

type Home2LenisProps = {
  children: ReactNode;
};

/** Smooth scroll for `/home-2` so sticky work cards feel closer to the reference demo. */
export function Home2Lenis({ children }: Home2LenisProps) {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

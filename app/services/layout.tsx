import type { ReactNode } from "react";

import { Home2Lenis } from "@/components/sandspire/Home2Lenis";

/** Smooth scroll for /services so the cinematic scroll moments feel premium (matches /home-3). */
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <Home2Lenis>{children}</Home2Lenis>;
}

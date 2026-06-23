import type { ReactNode } from "react";

import { Home2Lenis } from "@/components/sandspire/Home2Lenis";

/** Smooth scroll for /about so the cinematic scroll moments feel premium. */
export default function AboutLayout({ children }: { children: ReactNode }) {
  return <Home2Lenis>{children}</Home2Lenis>;
}

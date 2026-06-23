import type { ReactNode } from "react";

import { Home2Lenis } from "@/components/sandspire/Home2Lenis";

/** Smooth scroll for /work so the cinematic reveals + parallax match /home-3. */
export default function WorkLayout({ children }: { children: ReactNode }) {
  return <Home2Lenis>{children}</Home2Lenis>;
}

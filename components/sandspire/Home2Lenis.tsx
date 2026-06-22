import type { ReactNode } from "react";

import { SiteLenis } from "@/components/sandspire/SiteLenis";

type Home2LenisProps = {
  children: ReactNode;
};

/** Kept for `/home-2` layout — smooth scroll now lives in the root layout via `SiteLenis`. */
export function Home2Lenis({ children }: Home2LenisProps) {
  return children;
}

import type { ReactNode } from "react";

import { Home2Lenis } from "@/components/sandspire/Home2Lenis";

export default function Home2Layout({ children }: { children: ReactNode }) {
  return <Home2Lenis>{children}</Home2Lenis>;
}

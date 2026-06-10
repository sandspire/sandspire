import type { ReactNode } from "react";
import { DM_Serif_Text } from "next/font/google";

import { Home2Lenis } from "@/components/sandspire/Home2Lenis";

const dmSerif = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-serif-section",
  display: "swap",
});

export default function Home2Layout({ children }: { children: ReactNode }) {
  return (
    <div className={dmSerif.variable}>
      <Home2Lenis>{children}</Home2Lenis>
    </div>
  );
}

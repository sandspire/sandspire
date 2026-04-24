import { sandspireNavLinks } from "@/components/sandspire/sandspireNav";
import { SiteNavBar } from "@/components/sandspire/SiteNavBar";

export { sandspireNavLinks };

type SandspireHeaderProps = {
  /** Primary CTA in the bar (defaults to dedicated contact page). */
  ctaHref?: string;
};

export function SandspireHeader({ ctaHref = "/contact" }: SandspireHeaderProps) {
  return (
    <SiteNavBar
      ctaHref={ctaHref}
      className="sticky top-0 z-30 h-[54px] bg-gradient-to-b from-[#141414]/75 to-[#0d0d0d]/65 px-5 backdrop-blur-[6px] lg:px-7"
    />
  );
}

import { siteContentDefaults } from "@/lib/siteContentDefaults";
import { SiteNavBar } from "@/components/sandspire/SiteNavBar";

export const sandspireNavLinks = siteContentDefaults.nav.links;

type SandspireHeaderProps = {
  /** Primary CTA in the bar (defaults to dedicated contact page). */
  ctaHref?: string;
  ctaLabel?: string;
  links?: { label: string; href: string }[];
  logoSrc?: string;
};

export function SandspireHeader({
  ctaHref,
  ctaLabel,
  links,
  logoSrc,
}: SandspireHeaderProps = {}) {
  const nav = siteContentDefaults.nav;
  return (
    <SiteNavBar
      ctaHref={ctaHref ?? nav.ctaHref}
      ctaLabel={ctaLabel ?? nav.ctaLabel}
      links={links ?? nav.links}
      logoSrc={logoSrc}
      className="sticky top-0 z-30 h-[54px] bg-gradient-to-b from-[#141414]/75 to-[#0d0d0d]/65 px-5 backdrop-blur-[6px] lg:px-7"
    />
  );
}

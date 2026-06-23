import { siteContentDefaults } from "@/lib/siteContentDefaults";
import { SandspireNavBar } from "@/components/sandspire/SandspireNavBar";

export const sandspireNavLinks = siteContentDefaults.nav.links;

type SandspireHeaderProps = {
  /** Primary CTA in the bar (defaults to dedicated contact page). */
  ctaHref?: string;
  ctaLabel?: string;
  links?: { label: string; href: string }[];
  logoSrc?: string;
};

/**
 * Site header. Now renders the premium global `SandspireNavBar` (fixed,
 * transparent-over-hero → dark-glass-on-scroll). Kept as a thin wrapper so the
 * inner pages that already import `SandspireHeader` pick up the new nav with no
 * changes.
 */
export function SandspireHeader({
  ctaHref,
  ctaLabel,
  links,
  logoSrc,
}: SandspireHeaderProps = {}) {
  const nav = siteContentDefaults.nav;
  return (
    <SandspireNavBar
      ctaHref={ctaHref ?? nav.ctaHref}
      ctaLabel={ctaLabel ?? nav.ctaLabel}
      links={links ?? nav.links}
      logoSrc={logoSrc}
      logoLoading="eager"
    />
  );
}

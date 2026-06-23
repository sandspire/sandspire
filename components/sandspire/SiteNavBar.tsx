import { SandspireNavBar } from "@/components/sandspire/SandspireNavBar";
import { sandspireNavLinks } from "@/components/sandspire/sandspireNav";

export type SiteNavBarProps = {
  /** @deprecated positioning is owned by the fixed `SandspireNavBar` now. */
  className?: string;
  ctaHref?: string;
  ctaLabel?: string | null;
  logoLoading?: "eager" | "lazy";
  logoHref?: string;
  logoSrc?: string;
  links?: { label: string; href: string }[];
};

/**
 * Compatibility shim. The site now uses the premium fixed `SandspireNavBar`
 * everywhere; this forwards to it so any remaining/future imports of
 * `SiteNavBar` keep working. The legacy `className` positioning prop is ignored.
 */
export function SiteNavBar({
  ctaHref = "/contact",
  ctaLabel = "Get in touch",
  logoLoading = "lazy",
  logoHref = "/",
  logoSrc,
  links = sandspireNavLinks,
}: SiteNavBarProps) {
  return (
    <SandspireNavBar
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      links={links}
      logoHref={logoHref}
      logoSrc={logoSrc}
      logoLoading={logoLoading}
    />
  );
}

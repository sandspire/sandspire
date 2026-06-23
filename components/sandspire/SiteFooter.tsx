import { SandspireFooter } from "@/components/sandspire/SandspireFooter";
import { siteContentDefaults } from "@/lib/siteContentDefaults";

export type SiteFooterProps = {
  /** @deprecated no longer used — kept for call-site compatibility. */
  variant?: "default" | "home2";
  /** @deprecated no longer used. */
  homeHref?: string;
  /** @deprecated no longer used. */
  sticky?: boolean;
  navLinks?: { label: string; href: string }[];
  taglineLine1?: string;
  taglineLine2?: string;
  blurb?: string;
  copyright?: string;
  socialLinks?: { label: string; href: string }[];
  logoSrc?: string;
};

/**
 * Compatibility shim. The site now uses the premium `SandspireFooter`
 * everywhere; this maps the old prop shape onto it so existing call sites
 * (and `SiteFooterFromCms`) keep working without edits. The legacy
 * `variant` / `sticky` / `homeHref` props are intentionally ignored.
 */
export function SiteFooter({
  navLinks = siteContentDefaults.nav.links,
  taglineLine1 = siteContentDefaults.footer.taglineLine1,
  taglineLine2 = siteContentDefaults.footer.taglineLine2,
  blurb = siteContentDefaults.footer.blurb,
  copyright = siteContentDefaults.footer.copyright,
  socialLinks = siteContentDefaults.footer.socialLinks,
  logoSrc,
}: SiteFooterProps = {}) {
  return (
    <SandspireFooter
      navLinks={navLinks}
      socialLinks={socialLinks}
      headline={[taglineLine1, taglineLine2]}
      blurb={blurb}
      credit={copyright}
      logoSrc={logoSrc}
    />
  );
}

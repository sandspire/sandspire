import { getSiteSettings } from "@/sanity/lib/queries/siteContent";
import { SiteFooter, type SiteFooterProps } from "@/components/sandspire/SiteFooter";

export async function SiteFooterFromCms(props: SiteFooterProps = {}) {
  const site = await getSiteSettings();
  return (
    <SiteFooter
      {...props}
      navLinks={site.nav.links}
      taglineLine1={site.footer.taglineLine1}
      taglineLine2={site.footer.taglineLine2}
      blurb={site.footer.blurb}
      copyright={site.footer.copyright}
      socialLinks={site.footer.socialLinks}
      logoSrc={site.siteLogoPath}
    />
  );
}

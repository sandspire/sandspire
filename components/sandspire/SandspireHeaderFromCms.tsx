import { getSiteSettings } from "@/sanity/lib/queries/siteContent";
import { SandspireHeader } from "@/components/sandspire/SandspireHeader";

type Props = {
  ctaHref?: string;
};

export async function SandspireHeaderFromCms({ ctaHref }: Props = {}) {
  const site = await getSiteSettings();
  return (
    <SandspireHeader
      ctaHref={ctaHref ?? site.nav.ctaHref}
      ctaLabel={site.nav.ctaLabel}
      links={site.nav.links}
      logoSrc={site.siteLogoPath}
    />
  );
}

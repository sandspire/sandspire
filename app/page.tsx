import { CaseStudies } from "@/components/sandspire/CaseStudies";
import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { Hero } from "@/components/sandspire/Hero";
import { ServicesBento } from "@/components/sandspire/ServicesBento";
import { SiteFooterFromCms } from "@/components/sandspire/SiteFooterFromCms";
import { WhoIsSandspire } from "@/components/sandspire/WhoIsSandspire";
import {
  getClientLogos,
  getHomepageContent,
  getSiteSettings,
} from "@/sanity/lib/queries/siteContent";

export const revalidate = 60;

export default async function Home() {
  const [site, homepage, logos] = await Promise.all([
    getSiteSettings(),
    getHomepageContent(),
    getClientLogos(),
  ]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Hero
        content={homepage}
        navLinks={site.nav.links}
        ctaHref={site.nav.ctaHref}
        ctaLabel={site.nav.ctaLabel}
        logos={logos}
      />

      <div className="relative mt-0 rounded-t-[32px] bg-[var(--background)] pt-16 sm:rounded-t-[48px] sm:pt-20 lg:rounded-t-[70px] lg:pt-[84px]">
        <main>
          <WhoIsSandspire title={homepage.whoTitle} body={homepage.whoBody} />
          <ServicesBento
            eyebrow={homepage.servicesEyebrow}
            title={homepage.servicesTitle}
            serviceCards={homepage.serviceCards}
            analyticsVideoPath={homepage.analyticsVideoPath}
            analyticsVideoPosterPath={homepage.analyticsVideoPosterPath}
          />
          <CaseStudies title={homepage.caseStudiesTitle} cases={homepage.featuredCases} />
          <ContactFAQ
            faqItems={site.contact.faqDefault}
            eyebrow={site.contact.eyebrow}
            headline={site.contact.headline}
            intro={site.contact.intro}
            phone={site.phone}
            socialLinks={site.footer.socialLinks}
          />
          <SiteFooterFromCms
            navLinks={site.nav.links}
            taglineLine1={site.footer.taglineLine1}
            taglineLine2={site.footer.taglineLine2}
            blurb={site.footer.blurb}
            copyright={site.footer.copyright}
            socialLinks={site.footer.socialLinks}
          />
        </main>
      </div>
    </div>
  );
}

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

// Previous (v1) homepage — kept here so the original CMS-driven design stays
// available for comparison after /home-3 became the main homepage at "/".
export default async function HomeOne() {
  const [site, homepage, logos] = await Promise.all([
    getSiteSettings(),
    getHomepageContent(),
    getClientLogos(),
  ]);

  return (
    <div className="home-web min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <Hero
        content={homepage}
        navLinks={site.nav.links}
        ctaHref={site.nav.ctaHref}
        ctaLabel={site.nav.ctaLabel}
        logos={logos}
        logoSrc={site.siteLogoPath}
      />

      <main>
        {/* Who is Sandspire + What we do — brand black */}
        <div className="bg-[#0d0d0d] pt-12 sm:pt-16 lg:pt-20">
          <WhoIsSandspire title={homepage.whoTitle} body={homepage.whoBody} />
          <ServicesBento
            eyebrow={homepage.servicesEyebrow}
            title={homepage.servicesTitle}
            serviceCards={homepage.serviceCards}
            analyticsVideoPath={homepage.analyticsVideoPath}
            analyticsVideoPosterPath={homepage.analyticsVideoPosterPath}
            webDesignImages={homepage.webDesignImages}
            serviceFlowDiagramImagePath={homepage.serviceFlowDiagramImagePath}
          />
        </div>

        {/* Recent work — white section with rounded top corners */}
        <CaseStudies title={homepage.caseStudiesTitle} cases={homepage.featuredCases} />
        <ContactFAQ
            variant="home2"
            faqItems={site.contact.faqDefault}
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
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { SandspireHeaderFromCms } from "@/components/sandspire/SandspireHeaderFromCms";
import { SiteFooterFromCms } from "@/components/sandspire/SiteFooterFromCms";
import { WorkProjectGrid } from "@/components/sandspire/WorkProjectGrid";
import { getSiteSettings, getWorkPageSettings } from "@/sanity/lib/queries/siteContent";
import { getWorkIndexCards } from "@/sanity/lib/queries/workIndex";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWorkPageSettings();
  return {
    title: settings.metaTitle,
    description: settings.metaDescription,
  };
}

export default async function WorkPage() {
  const [projects, site, workPage] = await Promise.all([
    getWorkIndexCards(),
    getSiteSettings(),
    getWorkPageSettings(),
  ]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FAF3E8]">
      <SandspireHeaderFromCms />

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-0 pt-20 sm:px-6 sm:pt-24 lg:px-0">
        <Suspense
          fallback={
            <div
              className="mx-auto w-full max-w-[995px] space-y-6 py-2"
              aria-hidden
            >
              <div className="mx-auto h-9 w-2/3 max-w-xs animate-pulse rounded-lg bg-white/10" />
              <div className="mx-auto h-11 w-full max-w-2xl animate-pulse rounded-2xl bg-white/10" />
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="h-80 animate-pulse rounded-[14px] bg-white/10" />
                <div className="h-80 animate-pulse rounded-[14px] bg-white/10" />
              </div>
            </div>
          }
        >
          <WorkProjectGrid
            projects={projects}
            headline={workPage.headline}
            subheadline={workPage.subheadline}
            emptyFilterMessage={workPage.emptyFilterMessage}
          />
        </Suspense>
      </main>

      <ContactFAQ
        faqItems={site.contact.faqDefault}
        eyebrow={site.contact.eyebrow}
        headline={site.contact.headline}
        intro={site.contact.intro}
        phone={site.phone}
        socialLinks={site.footer.socialLinks}
      />
      <SiteFooterFromCms />
    </div>
  );
}

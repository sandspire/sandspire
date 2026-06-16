import type { Metadata } from "next";
import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { SandspireHeaderFromCms } from "@/components/sandspire/SandspireHeaderFromCms";
import { SiteFooterFromCms } from "@/components/sandspire/SiteFooterFromCms";
import { getSiteSettings } from "@/sanity/lib/queries/siteContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: `Contact — ${site.siteTitle}`,
    description:
      "Start a project with Sandspire — websites, brand, social, and AI automation. Send a note or read answers to the questions we hear most.",
  };
}

export default async function ContactPage() {
  const site = await getSiteSettings();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <SandspireHeaderFromCms ctaHref="#contact" />

      <main>
        <ContactFAQ
          className="rounded-none pt-14 lg:pt-20"
          faqItems={site.contact.faqDefault}
          eyebrow={site.contact.eyebrow}
          headline={site.contact.headline}
          intro={site.contact.intro}
          phone={site.phone}
          socialLinks={site.footer.socialLinks}
        />
      </main>

      <SiteFooterFromCms />
    </div>
  );
}

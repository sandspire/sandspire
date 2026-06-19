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
    <div className="site-jakarta min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <SandspireHeaderFromCms ctaHref="#contact" />

      <main>
        <ContactFAQ
          variant="home2"
          className="rounded-none px-5 pt-12 sm:px-6 sm:pt-16 lg:px-12 lg:pt-20"
          faqItems={site.contact.faqDefault}
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

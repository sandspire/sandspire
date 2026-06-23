import type { Metadata } from "next";

import { SandspireNavBar } from "@/components/sandspire/SandspireNavBar";
import { SiteFooterFromCms } from "@/components/sandspire/SiteFooterFromCms";
import { Home3Faq } from "@/components/sandspire/home3/Home3Faq";
import { ContactHero } from "@/components/sandspire/contact/ContactHero";
import { ContactStatement } from "@/components/sandspire/contact/ContactStatement";
import { ContactStudio } from "@/components/sandspire/contact/ContactStudio";
import { getSiteSettings } from "@/sanity/lib/queries/siteContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: `Contact — ${site.siteTitle}`,
    description:
      "Start a project with Sandspire. Reels, photos, social, websites and AI for UAE brands. Send one message and we'll come back with a plan, a quote, and a month of ideas worth filming.",
  };
}

export default async function ContactPage() {
  const site = await getSiteSettings();

  // Build a wa.me link from the studio's phone number (digits only, no "+").
  const waDigits = site.phone.replace(/[^\d]/g, "");
  const whatsappHref = `https://wa.me/${waDigits}`;

  return (
    <div className="contact-root relative w-full overflow-x-clip bg-[#faf3e8] text-[#0d0d0d] selection:bg-[#ff5e00] selection:text-[#faf3e8]">
      {/* Global nav — transparent over the dark hero, dark glass on scroll */}
      <SandspireNavBar ctaHref="#start" ctaLabel="Start a project" logoLoading="eager" />

      {/* Hero */}
      <ContactHero whatsappHref={whatsappHref} />

      {/* Kinetic promise — what happens after you hit send */}
      <ContactStatement />

      {/* The studio — direct channels + the working form */}
      <ContactStudio
        headline="Let's make your brand worth following."
        intro="Tell us what you do, where you are, and what you're trying to grow. We'll come back with a plan, a quote, and the ideas we'd shoot first. The form takes a minute. WhatsApp is faster."
        phone={site.phone}
        whatsappHref={whatsappHref}
        socialLinks={site.footer.socialLinks}
      />

      {/* FAQ */}
      <section className="relative border-t border-[#0d0d0d]/10 bg-[#faf3e8]">
        <div className="mx-auto max-w-[1220px] px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="flex items-center justify-center gap-2 font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#ff5e00]">
              <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
              Before you ask
            </p>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.02em] text-[#0d0d0d]">
              Questions, answered.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[#0d0d0d]/60">
              The things brands usually want to know before they get in touch. If
              yours isn&apos;t here, just ask.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[760px]">
            <Home3Faq />
            <p className="mt-8 text-center font-[family-name:var(--font-body)] text-[14px] text-[#0d0d0d]/55">
              Still not sure?{" "}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#ff5e00] underline decoration-[#ff5e00]/30 underline-offset-4 transition-colors hover:decoration-[#ff5e00]"
              >
                Message us on WhatsApp
              </a>{" "}
              and we&apos;ll talk it through.
            </p>
          </div>
        </div>
      </section>

      <SiteFooterFromCms />
    </div>
  );
}

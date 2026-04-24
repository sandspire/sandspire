import { CaseStudies } from "@/components/sandspire/CaseStudies";
import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { Hero } from "@/components/sandspire/Hero";
import { ServicesBento } from "@/components/sandspire/ServicesBento";
import { SiteFooter } from "@/components/sandspire/SiteFooter";
import { WhoIsSandspire } from "@/components/sandspire/WhoIsSandspire";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Hero />

      {/* Cream band with large rounded top corners (matches Figma’s 336:1208 treatment). */}
      <div className="relative mt-0 rounded-t-[32px] bg-[var(--background)] pt-16 sm:rounded-t-[48px] sm:pt-20 lg:rounded-t-[70px] lg:pt-[84px]">
        <main>
          <WhoIsSandspire />
          <ServicesBento />
          <CaseStudies />
          <ContactFAQ />
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}

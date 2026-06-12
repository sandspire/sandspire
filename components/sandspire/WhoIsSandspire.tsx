import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { siteContentDefaults } from "@/lib/siteContentDefaults";

type WhoIsSandspireProps = {
  title?: string;
  body?: string;
};

export function WhoIsSandspire({
  title = siteContentDefaults.homepage.whoTitle,
  body = siteContentDefaults.homepage.whoBody,
}: WhoIsSandspireProps) {
  return (
    <section id="who" className="mx-auto max-w-[1180px] px-6 py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-[960px] gap-8 lg:grid-cols-2 lg:gap-14">
        <ScrollReveal className="min-h-[45px]">
          <h2 className="font-display text-[32px] font-light leading-[1.05] tracking-[-0.02em] text-[var(--foreground)] lg:text-[34px]">
            {title}
          </h2>
        </ScrollReveal>
        <ScrollReveal className="min-h-[78px]" delay={0.1}>
          <p className="text-[20px] font-light leading-[1.35] text-[var(--foreground)] lg:text-[22px]">
            {body}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

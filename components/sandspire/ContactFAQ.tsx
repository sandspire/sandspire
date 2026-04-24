import Link from "next/link";
import { ContactForm } from "@/components/sandspire/ContactForm";
import { FaqAccordion } from "@/components/sandspire/FaqAccordion";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { COMING_SOON_HREF } from "@/lib/comingSoon";
import { cn } from "@/lib/utils";

type ContactFAQProps = {
  className?: string;
};

export function ContactFAQ({ className }: ContactFAQProps) {
  const faqItems = [
    {
      question: "How long does a project take?",
      answer:
        "Most projects take 4–8 weeks after discovery. Timeline depends on scope, approvals, and how quickly assets are ready.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes. We collaborate with teams worldwide and keep things smooth with async updates and scheduled check-ins.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes. We can structure work into milestones so you pay in phases as deliverables are completed.",
    },
    {
      question: "What do I need to get started?",
      answer:
        "A short brief (goals + audience), any brand assets you already have, and a target launch window. If you’re missing pieces, we’ll guide you.",
    },
  ];

  return (
    <section
      id="contact"
      className={cn(
        "w-full overflow-hidden rounded-t-[70px] bg-[#0d0d0d] px-6 pb-16 pt-20 lg:px-12 lg:pb-[72px] lg:pt-[100px] xl:px-[72px]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1013px] flex-col items-center gap-24 lg:gap-[140px]">
        <ScrollReveal className="flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:gap-8">
          <div className="flex w-full max-w-[508px] flex-col gap-16 lg:gap-24">
            <div className="flex flex-col gap-1.5">
              <p className="font-[family-name:var(--font-body)] text-[22px] font-light leading-[1.4] tracking-[-0.03em] text-[#ff5e00]">
                Contact us
              </p>
              <div className="flex flex-col gap-8">
                <h2 className="font-[family-name:var(--font-body)] text-[32px] font-light leading-[1.08] tracking-[-0.02em] text-[#faf3e8] lg:text-[34px]">
                  Let&apos;s Create Something Meaningful
                </h2>
                <p className="max-w-[320px] text-[17px] font-normal leading-[1.45] text-[#818181]">
                  Whether you&apos;re starting from scratch or need a brand refresh, we&apos;re here to
                  help bring your vision to life.
                </p>
                <a
                  href="tel:+971561980747"
                  className="inline-flex text-[17px] font-medium leading-[1.45] text-[#faf3e8] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf3e8]/50"
                >
                  +971 56 198 0747
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <SocialIcon href={COMING_SOON_HREF} label="Instagram">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </SocialIcon>
              <SocialIcon href={COMING_SOON_HREF} label="LinkedIn" variant="muted">
                <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
                  <path d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5.5A1.5 1.5 0 0 0 6.5 8.5ZM5 10h3v9H5zM10 10h2.9v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3v-3.8c0-.9 0-2-1.2-2s-1.4.9-1.4 2V19h-3z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={COMING_SOON_HREF} label="X (Twitter)" variant="muted">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.205 2.25h3.308l-7.227 8.26 8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="w-full max-w-[505px] shrink-0 rounded-[30px] border border-[#919191] bg-[rgba(85,85,85,0.08)] px-6 pb-8 pt-5 transition-[box-shadow,border-color] duration-300 ease-out hover:border-[#a8a8a8] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] lg:min-h-[433px] lg:px-7 lg:pb-8 lg:pt-5">
            <ContactForm />
          </div>
        </ScrollReveal>

        <ScrollReveal className="flex w-full flex-col items-center gap-16 lg:gap-14" delay={0.12}>
          <h3 className="text-center font-[family-name:var(--font-body)] text-[clamp(1.65rem,4vw,2.5rem)] font-light leading-tight tracking-[-0.02em] text-[#e6ddd0]">
            Frequently Asked Questions
          </h3>
          <FaqAccordion items={faqItems} />
          <a
            href="#contact"
            className="text-center font-[family-name:var(--font-body)] text-sm font-light tracking-[-0.02em] text-[#e6ddd0] underline decoration-solid underline-offset-4 transition-colors duration-200 hover:text-white"
          >
            Have more questions? Contact us
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
  variant = "default",
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  variant?: "default" | "muted";
}) {
  const className = [
    "inline-flex size-[50px] items-center justify-center rounded-[32px] text-[#faf3e8] transition-all duration-200 ease-out hover:scale-110 hover:ring-2 hover:ring-white/20 active:scale-95",
    variant === "muted" ? "bg-[rgba(13,13,13,0.4)]" : "bg-black/30 ring-1 ring-white/10",
  ].join(" ");

  if (href.startsWith("/")) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} aria-label={label} className={className}>
      {children}
    </a>
  );
}

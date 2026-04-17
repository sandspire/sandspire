import { ContactForm } from "@/components/sandspire/ContactForm";
import { FaqAccordion } from "@/components/sandspire/FaqAccordion";

export function ContactFAQ() {
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
    <section id="contact" className="w-full bg-[#0D0D0D] px-6 py-[96px] lg:px-0">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mx-auto flex w-full max-w-[940px] flex-col gap-8 lg:flex-row">
          <div className="w-full max-w-[468px]">
            <div className="space-y-5">
              <p className="text-[34px] font-bold leading-[1.1] text-[var(--accent)]">
                Contact us
              </p>
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-[34px] font-medium leading-[1.05] text-[#FAF3E8] lg:text-[44px]">
                  Let’s Create Something Meaningful
                </h2>
                <p className="max-w-[250px] text-[20px] leading-[1.25] text-[#818181]">
                  Whether you&apos;re starting from scratch or need a brand refresh, we’re here to help bring your vision to life.
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <SocialIcon href="#" label="Instagram">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5.5A1.5 1.5 0 0 0 6.5 8.5ZM5 10h3v9H5zM10 10h2.9v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3v-3.8c0-.9 0-2-1.2-2s-1.4.9-1.4 2V19h-3z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="w-full max-w-[470px] rounded-[24px] border border-white/15 bg-white/[0.08] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.24)] backdrop-blur-[14px] lg:p-6">
            <ContactForm />
          </div>
        </div>

        <div className="mx-auto mt-[120px] w-full max-w-[940px]">
          <h3 className="text-center font-[family-name:var(--font-display)] text-[42px] font-light leading-[1.05] text-[#E6DDD0]">
            Frequently Asked Questions
          </h3>
          <div className="mt-10">
            <FaqAccordion items={faqItems} />
          </div>
          <p className="mt-10 text-center font-[family-name:var(--font-display)] text-[30px] font-light text-[#E6DDD0]">
            Have more questions? Contact us
          </p>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-[#FAF3E8] ring-1 ring-white/15"
    >
      {children}
    </a>
  );
}


import { ScrollReveal } from "@/components/sandspire/ScrollReveal";

/* "Behind the brand" — the build + automation services that back up the feed.
   Numbered 06–09 to continue the content index (01–05). On cream to alternate
   against the dark content-studio section above it. */

type Card = { no: string; title: string; body: string; tags: string[] };

const CARDS: Card[] = [
  {
    no: "06",
    title: "Web design & development",
    body: "Fast, sharp websites that turn a visit into a booking. Designed, built and live in 4–6 weeks.",
    tags: ["Next.js", "CMS", "E-commerce"],
  },
  {
    no: "07",
    title: "Brand & strategy",
    body: "Names, logos, voice and the story that holds it together, so everything you post looks like you.",
    tags: ["Identity", "Voice", "Guidelines"],
  },
  {
    no: "08",
    title: "SEO",
    body: "Show up when people search, not just when they scroll. The slow, compounding kind of growth.",
    tags: ["Technical", "Local", "Content"],
  },
  {
    no: "09",
    title: "AI automation",
    body: "The robots get the grunt work: replies, follow-ups, reporting and the busywork no one wants to do.",
    tags: ["Workflows", "Chatbots", "Reporting"],
  },
];

export function ServicesSecondary() {
  return (
    <section className="relative bg-[#faf3e8] py-24 text-[#0d0d0d] lg:py-32">
      <div className="mx-auto max-w-[1220px] px-5 sm:px-6 lg:px-8">
        <div className="max-w-[46ch]">
          <ScrollReveal>
            <p className="flex items-center gap-2.5 font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ff5e00]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
              And behind the brand
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5.4vw,3.8rem)] font-bold leading-[1.0] tracking-[-0.03em]">
              The build & automation studio
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[#0d0d0d]/65">
              Once the feed is working, here&apos;s what keeps the rest of the brand
              sharp, and your week quieter.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <ScrollReveal key={c.no} delay={0.06 + i * 0.06} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#0d0d0d]/12 bg-white/55 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff5e00]/40 hover:shadow-[0_28px_60px_-30px_rgba(255,94,0,0.5)] sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#ff5e00]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#ff5e00]/10"
                />
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3.4vw,2.8rem)] font-medium leading-none text-[#ff5e00]">
                    {c.no}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0d0d0d]/15 text-[#0d0d0d] transition-all duration-300 group-hover:-rotate-45 group-hover:border-[#ff5e00] group-hover:bg-[#ff5e00] group-hover:text-[#faf3e8]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <h3 className="mt-7 font-[family-name:var(--font-display)] text-[clamp(1.4rem,2.4vw,1.85rem)] font-bold leading-[1.1] tracking-[-0.01em]">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-[42ch] font-[family-name:var(--font-body)] text-[14.5px] leading-[1.6] text-[#0d0d0d]/65">
                  {c.body}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#0d0d0d]/12 bg-[#faf3e8]/60 px-3 py-1 font-[family-name:var(--font-body)] text-[12px] font-medium text-[#0d0d0d]/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

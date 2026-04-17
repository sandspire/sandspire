import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { SiteFooter } from "@/components/sandspire/SiteFooter";

const navLinks: { label: string; href: string }[] = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Use Cases", href: "/#who" },
];

const categories = ["Branding", "Web Development"];

const challengePoints = [
  "The original website looked static and didn't reflect the speed and energy of SLRP's in-store experience.",
  "Navigation and content hierarchy felt fragmented, making it harder for customers to discover what to order first.",
  "Visual identity assets were inconsistent across social and web touchpoints, reducing brand recall.",
];

const solutionPoints = [
  "We rebuilt the experience around clear product categories, a stronger visual rhythm, and conversion-first sections.",
  "A high-contrast design system and bold typography were introduced to mirror the Tokyo-inspired brand personality.",
  "Reusable visual blocks made campaign launches and menu updates faster without losing consistency.",
];

export default function SlrpWorkPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FAF3E8]">
      <header className="sticky top-0 z-30 h-[54px] bg-gradient-to-b from-[#141414]/75 to-[#0d0d0d]/65 px-5 backdrop-blur-[6px] lg:px-7">
        <div className="mx-auto flex h-full w-full max-w-[1220px] items-center justify-between gap-5">
          <a href="/" aria-label="Go to homepage">
            <img src="/logos/sandspire.svg" alt="Sandspire" className="h-7 w-auto" />
          </a>

          <nav className="hidden items-center justify-center gap-[38px] md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium capitalize tracking-[0.12px] text-white/90 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="/#contact"
            className="inline-flex h-9 items-center rounded-full bg-[var(--background)] px-5 text-[13px] font-semibold text-[var(--foreground)]"
          >
            Get in touch
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-white/10 pb-0 pt-14">
          <div className="mx-auto w-full max-w-[1220px] px-6 lg:px-10">
            <div className="mx-auto mt-12 grid w-full max-w-[995px] gap-0 lg:grid-cols-[0.73fr_330px] lg:items-stretch lg:justify-center">
              <article className="overflow-hidden rounded-t-[20px] rounded-b-none border border-white/20 bg-[#181818] px-3 pb-0 pt-3">
                <img
                  src="/images/projects/slrp/slrp_header.png"
                  alt="SLRP website visual"
                  className="-mb-12 h-auto w-full rounded-t-[14px] rounded-b-none object-cover"
                />
              </article>

              <div className="space-y-4 rounded-t-[18px] rounded-b-none p-6 lg:rounded-l-none">
                <div>
                  <h1 className="font-[family-name:var(--font-display)] text-[34px] font-light leading-[1.05] text-[#FAF3E8]">
                    SLRP Ramen
                  </h1>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-[#3A3A3A] bg-[#1B1B1B] px-3 py-1 text-[11px] font-medium tracking-[0.02em] text-[#ECE2D6]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#8C847A]">
                    Industry
                  </p>
                  <p className="mt-1 text-[15px] text-[#F0E7DB]">Restaurant</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#8C847A]">
                    Location
                  </p>
                  <p className="mt-1 text-[15px] text-[#F0E7DB]">
                    United Arab Emirates
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#8C847A]">
                    About
                  </p>
                  <p className="mt-1 text-[15px] leading-[1.45] text-[#F0E7DB]">
                    High-energy ramen and rolls inspired by Tokyo street culture,
                    built for busy malls, bold flavors, and fast-moving crowds.
                  </p>
                </div>
                <a
                  href="https://slrpramen.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#4B3D34] bg-[#1D1D1D] px-5 py-2.5 text-[12px] font-medium text-[#F4EBDD] transition hover:border-[#FF7A2D] hover:text-white"
                >
                  Visit Website
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#EAE3D9] py-[120px] text-[#171513]">
          <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-10">
            <div className="grid gap-[120px]">
              <div className="grid gap-8 md:grid-cols-[260px_minmax(0,70ch)] md:justify-between">
                <h2 className="font-[family-name:var(--font-display)] text-[44px] font-light leading-[1.03] tracking-[-0.02em]">
                  The challenge
                </h2>
                <div className="space-y-4 text-[19px] leading-[1.7] text-[#47413A]">
                  {challengePoints.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-[260px_minmax(0,70ch)] md:justify-between">
                <h2 className="font-[family-name:var(--font-display)] text-[44px] font-light leading-[1.03] tracking-[-0.02em]">
                  The solution
                </h2>
                <div className="space-y-4 text-[19px] leading-[1.7] text-[#47413A]">
                  {solutionPoints.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
                <div className="grid gap-8">
                  <div className="overflow-hidden rounded-[14px]">
                    <img
                      src="/images/projects/slrp/slrpBento1.png"
                      alt="SLRP dominant visual"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[14px]">
                    <img
                      src="/images/projects/slrp/slrpBento3.png"
                      alt="SLRP supporting visual"
                      className="h-full min-h-[320px] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-[14px] border-x border-[#D5CBBF]">
                  <img
                    src="/images/projects/slrp/slrpBento2.png"
                    alt="SLRP portrait visual"
                    className="h-full min-h-[780px] w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-8">
                <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                  <h2 className="font-[family-name:var(--font-display)] text-[46px] font-light leading-[1.03] tracking-[-0.02em]">
                    The result
                  </h2>
                  <div className="max-w-[62ch] text-[19px] leading-[1.7] text-[#47413A]">
                    The updated direction improved clarity, reduced friction across key
                    paths, and made the brand feel consistent from first click to final
                    order. The structure now supports faster decisions while keeping the
                    visual tone distinctive and memorable.
                  </div>
                </div>

                <div className="mx-auto grid w-full max-w-[860px] gap-6 md:grid-cols-[0.3fr_0.7fr] md:items-stretch">
                  <article className="overflow-hidden">
                    <img
                      src="/images/projects/slrp/slrpBento5.png"
                      alt="SLRP result hero visual"
                      className="h-full w-full object-cover"
                    />
                  </article>
                  <article className="overflow-hidden rounded-[14px]">
                    <img
                      src="/images/projects/slrp/slrpBento4.png"
                      alt="SLRP result detail one"
                      className="h-full w-full object-cover"
                    />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactFAQ />
      <SiteFooter />
    </div>
  );
}

import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { SandspireHeader } from "@/components/sandspire/SandspireHeader";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { SiteFooter } from "@/components/sandspire/SiteFooter";

const categories = ["All", "Branding", "Web Development", "Social Media"];

const pillGlowByLabel: Record<string, string> = {
  Branding: "#FE4F18",
  "Social Media": "#FE4F18",
  "Web Development": "#FFBE00",
  "AI Automation": "#F4F4F4",
};

function getPillStyle(label: string) {
  const glow = pillGlowByLabel[label] ?? "#F4F4F4";

  return {
    borderColor: "rgba(255,255,255,0.28)",
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.12), 0 0 10px ${glow}1F`,
  };
}

const projects = [
  {
    title: "3 Fils",
    slug: "3-fils",
    description: "Award-winning Asian restaurant.",
    imageSrc: "/images/projects/3fils/3fils_img.png",
    tags: ["Branding", "Web Development"],
  },
  {
    title: "Brix Journey",
    slug: "brix-journey",
    description: "A premium dining journey and digital booking flow.",
    imageSrc: "/images/projects/brixjourney/brixjourney_img.png",
    tags: ["Branding", "Web Development"],
  },
  {
    title: "Slrp",
    slug: "slrp",
    description: "Japanese concept with a bold modern identity.",
    imageSrc: "/images/projects/slrp/slrp_img.png",
    tags: ["Branding", "Web Development"],
  },
  {
    title: "Bordo Mavi",
    slug: "bordo-mavi",
    description: "Mediterranean experience with immersive storytelling.",
    imageSrc: "/images/projects/bordomavi/bordomavi_img.png",
    tags: ["Branding", "Social Media"],
  },
  {
    title: "Brix Cafe",
    slug: "brix-cafe",
    description: "Cafe identity, website, and campaign launch assets.",
    imageSrc: "/images/projects/brixcafe/brixcafe_img.png",
    tags: ["Branding", "Web Development"],
  },
  {
    title: "Konbini",
    slug: "konbini",
    description: "Retail-inspired visual system and conversion pages.",
    imageSrc: "/images/projects/konbini/konbini_img.png",
    tags: ["Branding", "Web Development"],
  },
  {
    title: "Kanji",
    slug: "kanji",
    description: "Editorial-inspired food brand with campaign rollout.",
    imageSrc: "/images/projects/kanji/kanji_img.png",
    tags: ["Branding"],
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FAF3E8]">
      <SandspireHeader />

      <main className="mx-auto w-full max-w-[1280px] px-6 pb-0 pt-24 lg:px-0">
        <section className="mx-auto w-full max-w-[995px]">
          <ScrollReveal className="w-full">
            <h1 className="text-center font-[family-name:var(--font-display)] text-[44px] font-light leading-[1.05] text-[#FAF3E8]">
              Selected Work
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-center text-[18px] leading-[1.35] text-[#919191]">
              A curated set of brand, web, and campaign projects crafted for teams
              that care about details.
            </p>
          </ScrollReveal>

          <div className="mt-8 rounded-full bg-white/10 p-1.5">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {categories.map((category, idx) => (
                <button
                  type="button"
                  key={category}
                  className={[
                    "rounded-full px-4 py-2 text-[12px] transition-colors",
                    idx === 0
                      ? "bg-white/20 text-[#FAF3E8]"
                      : "text-[#B5B5B5] hover:bg-white/10 hover:text-[#FAF3E8]",
                  ].join(" ")}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 grid w-full max-w-[995px] gap-x-[47px] gap-y-[52px] md:grid-cols-2">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.title} className="h-full" delay={0.05 + idx * 0.06}>
              <article className="h-full rounded-[14px] border border-white/10 bg-white/[0.06] p-[18px] shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
              <div className="overflow-hidden rounded-[12px] bg-black/30">
                <img
                  src={project.imageSrc}
                  alt={`${project.title} project preview`}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <h2 className="font-[family-name:var(--font-display)] text-[34px] font-light leading-[1.02] text-[#FAF3E8]">
                  {project.title}
                </h2>
                <p className="max-w-[250px] text-right text-[14px] leading-[1.35] text-[#8A847B]">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 h-px w-full bg-white/15" />

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.title}-${tag}`}
                      className="rounded-full border bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-[#F4ECE0] backdrop-blur-[8px]"
                      style={getPillStyle(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`/work/${project.slug}`}
                  className="text-[12px] font-medium text-[#A9A095] underline underline-offset-4 hover:text-[#FAF3E8]"
                >
                  View Project
                </a>
              </div>
            </article>
            </ScrollReveal>
          ))}
        </section>
      </main>

      <ContactFAQ />
      <SiteFooter />
    </div>
  );
}

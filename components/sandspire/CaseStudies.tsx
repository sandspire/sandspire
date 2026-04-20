export function CaseStudies() {
  const cases = [
    {
      title: "3 Fils",
      description: "Award-winning Asian restaurant.",
      imageSrc: "/images/projects/3fils/3fils_img.png",
    },
    {
      title: "Brix Journey",
      description: "Cafe with a curated dessert dining experience.",
      imageSrc: "/images/projects/brixjourney/brixjourney_img.png",
    },
    {
      title: "Slrp",
      description: "Japanese restaurant combining quality ingredients with a casual dining experience.",
      imageSrc: "/images/projects/slrp/slrp_img.png",
    },
  ];

  return (
    <section
      id="work"
      className="w-full bg-[#F5F0E8] px-6 py-12 lg:px-10 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[940px]">
        <h2 className="text-center font-[family-name:var(--font-display)] text-[42px] font-light leading-[1.06] tracking-[-0.02em] text-[#111111]">
          Crafting legacy for teams that scale
        </h2>

        <div className="mt-10 space-y-8">
          {cases.map((c) => (
            <article
              key={c.title}
              className="grid items-start gap-5 lg:grid-cols-[520px_1fr] lg:gap-6"
            >
              <div className="relative aspect-[3/2] w-full">
                <div className="absolute inset-0 overflow-hidden rounded-[14px] border border-black/15 bg-[#d7cec0] shadow-[0_5px_14px_rgba(0,0,0,0.14)]">
                  <img
                    src={c.imageSrc}
                    alt={`${c.title} preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex h-full flex-col justify-start pt-1">
                <h3 className="font-[family-name:var(--font-display)] text-[38px] font-light leading-[1.03] tracking-[-0.02em] text-[#111111]">
                  {c.title}
                </h3>
                <p className="mt-2 max-w-[320px] text-[19px] font-normal leading-[1.2] text-[#8A847B]">
                  {c.description}
                </p>

                <a
                  href="#contact"
                  className="mt-4 inline-flex h-7 w-fit items-center gap-2 rounded-full bg-[#242424] pl-1 pr-3.5 text-[9px] font-semibold text-white"
                >
                  <span className="inline-flex h-4 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" aria-hidden="true">
                      <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="2.4" />
                    </svg>
                  </span>
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


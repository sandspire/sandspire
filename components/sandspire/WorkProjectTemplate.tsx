import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { SandspireHeader } from "@/components/sandspire/SandspireHeader";
import { SiteFooter } from "@/components/sandspire/SiteFooter";

const pillShadowByLabel: Record<string, string> = {
  Branding: "0 0 5.14px rgba(247, 148, 29, 0.25)",
  "Social Media": "0 0 5.14px rgba(247, 148, 29, 0.25)",
  "Web Development": "0 0 5.14px rgba(247, 76, 29, 0.25)",
};

function pillShadow(label: string) {
  return pillShadowByLabel[label] ?? pillShadowByLabel.Branding;
}

function TagPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex h-8 items-center justify-center rounded-full bg-[rgba(27,27,27,0.2)] px-4 text-[12.5px] font-light tracking-[-0.99px] text-[#e6ddd0] transition-[transform,box-shadow] duration-200 ease-out will-change-transform hover:scale-[1.04] active:scale-[0.97]"
      style={{ boxShadow: pillShadow(label) }}
    >
      {label}
    </span>
  );
}

function ExternalLinkGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <path
        d="M8.5 5.5V8.5H1.5V1.5H4.5M6.5 1.5H8.5V3.5M4 6L8.5 1.5"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function hasUsableProjectUrl(projectUrl: string) {
  try {
    const url = new URL(projectUrl);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname !== "example.com"
    );
  } catch {
    return false;
  }
}

export type WorkProjectTemplateProps = {
  serviceTags: string[];
  fieldLabel: string;
  industry: string;
  locationLabel: string;
  location: string;
  about: string;
  projectUrl: string;
  ctaLabel: string;
  challengeTitle: string;
  challengeBody: string;
  solutionTitle: string;
  solutionBody: string;
  invertLogo: boolean;
  heroSrc: string;
  heroAlt: string;
  logoSrc: string | null;
  logoAlt: string;
  wordmarkTitle: string;
  galleryStackTopSrc: string;
  galleryStackTopAlt: string;
  galleryStackBottomSrc: string | null;
  galleryStackBottomAlt: string;
  galleryHeroTallSrc: string;
  galleryHeroTallAlt: string;
  resultTallSrc: string;
  resultTallAlt: string;
};

export function WorkProjectTemplate({
  serviceTags,
  fieldLabel,
  industry,
  locationLabel,
  location,
  about,
  projectUrl,
  ctaLabel,
  challengeTitle,
  challengeBody,
  solutionTitle,
  solutionBody,
  invertLogo,
  heroSrc,
  heroAlt,
  logoSrc,
  logoAlt,
  wordmarkTitle,
  galleryStackTopSrc,
  galleryStackTopAlt,
  galleryStackBottomSrc,
  galleryStackBottomAlt,
  galleryHeroTallSrc,
  galleryHeroTallAlt,
  resultTallSrc,
  resultTallAlt,
}: WorkProjectTemplateProps) {
  const showVisitButton = hasUsableProjectUrl(projectUrl);
  const hasSecondGalleryImage = Boolean(galleryStackBottomSrc);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <SandspireHeader />

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-b-[20px] bg-[#0d0d0d] md:mx-auto md:max-w-[1279px]">
            <div
              className="absolute -left-[20%] -top-[40%] h-[140%] w-[140%] opacity-[0.14] mix-blend-lighten"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(250,243,232,0.55) 1px, transparent 0)",
                backgroundSize: "5px 5px",
              }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-[1220px] px-6 pb-0 pt-8 md:pt-12 lg:px-10">
            <div className="mx-auto flex max-w-[1100px] flex-col-reverse items-center gap-10 lg:flex-row lg:justify-center lg:gap-[72px] xl:gap-[100px]">
              <div className="w-full max-w-[418px] shrink-0 rounded-t-[28px] bg-[rgba(217,217,217,0.2)] px-2 pb-0 pt-1 transition-[box-shadow,transform] duration-300 ease-out lg:hover:-translate-y-0.5 lg:hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div className="relative w-full overflow-hidden rounded-t-[24px] bg-[#1f1f1f]">
                  <img
                    src={heroSrc}
                    alt={heroAlt}
                    className="block h-auto w-full"
                  />
                </div>
              </div>

              <div className="flex w-full max-w-[min(100%,320px)] flex-col gap-[22px] sm:max-w-[260px] lg:shrink-0">
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={logoAlt}
                    className={`h-[30px] w-auto max-w-[140px] object-contain object-left transition-opacity duration-200 hover:opacity-85 ${invertLogo ? "brightness-0 invert" : ""}`}
                  />
                ) : (
                  <p className="font-[family-name:var(--font-display)] text-[26px] font-light leading-tight tracking-[-0.04em] text-[#e6ddd0]">
                    {wordmarkTitle}
                  </p>
                )}
                <div className="flex flex-wrap gap-2.5">
                  {serviceTags.map((category) => (
                    <TagPill key={category} label={category} />
                  ))}
                </div>
                <div className="space-y-3.5 font-[family-name:var(--font-display)] text-[12.5px] font-light leading-[1.2]">
                  <div>
                    <p className="tracking-[-0.87px] text-[#818181]">
                      {fieldLabel}
                    </p>
                    <p className="mt-2.5 tracking-[-0.5px] text-[#e6ddd0]">
                      {industry}
                    </p>
                  </div>
                  <div>
                    <p className="tracking-[-0.87px] text-[#818181]">
                      {locationLabel}
                    </p>
                    <p className="mt-2.5 tracking-[-0.5px] text-[#e6ddd0]">
                      {location}
                    </p>
                  </div>
                  <div>
                    <p className="tracking-[-0.87px] text-[#818181]">About</p>
                    <p className="mt-2.5 max-w-[249px] tracking-[-0.5px] text-[#e6ddd0]">
                      {about}
                    </p>
                  </div>
                </div>
                {showVisitButton ? (
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex h-8 w-fit items-center justify-center gap-2.5 rounded-full bg-[rgba(27,27,27,0.2)] px-4 text-[12.5px] font-light tracking-[-0.99px] text-[#e6ddd0] transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[rgba(27,27,27,0.42)] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6ddd0]/50"
                    style={{ boxShadow: pillShadowByLabel["Web Development"] }}
                  >
                    {ctaLabel}
                    <ExternalLinkGlyph className="text-[#e6ddd0] transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-px" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#faf3e8] py-16 text-black md:py-[72px]">
          <div className="mx-auto w-full max-w-[1220px] px-6 lg:px-10">
            <div className="mx-auto flex w-full max-w-[773px] flex-col gap-[72px] md:gap-[88px]">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-[72px] lg:gap-[116px]">
                <h2 className="shrink-0 font-[family-name:var(--font-display)] text-[32px] font-light leading-[1.15] tracking-[-1.13px] md:text-[36px] md:leading-[45px]">
                  {challengeTitle}
                </h2>
                <p className="max-w-[397px] text-[17px] leading-[1.67] text-[#171513] md:text-[18px] md:leading-[30px]">
                  {challengeBody}
                </p>
              </div>

              <div className="flex w-full flex-col gap-5 md:flex-row md:items-start md:gap-[21px]">
                <div className="flex w-full flex-col gap-6 md:w-[255px] md:shrink-0">
                  <div className="group relative w-full overflow-hidden rounded-[14px] bg-[#faf3e8] md:w-[255px]">
                    <img
                      src={galleryStackTopSrc}
                      alt={galleryStackTopAlt}
                      className="block h-auto w-full origin-center transition-[transform,filter] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.02] group-hover:brightness-[1.02]"
                    />
                  </div>
                  {hasSecondGalleryImage ? (
                    <div className="group relative w-full overflow-hidden rounded-[14px] bg-[#faf3e8] md:w-[255px]">
                      <img
                        src={galleryStackBottomSrc!}
                        alt={galleryStackBottomAlt}
                        className="block h-auto w-full origin-center transition-[transform,filter] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.02] group-hover:brightness-[1.02]"
                      />
                    </div>
                  ) : null}
                  <div className="group relative w-full overflow-hidden rounded-[14px] bg-[#faf3e8] md:w-[255px]">
                    <img
                      src={resultTallSrc}
                      alt={resultTallAlt}
                      className="block h-auto w-full origin-center transition-[transform,filter] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.02] group-hover:brightness-[1.02]"
                    />
                  </div>
                </div>
                <div className="group relative w-full flex-1 overflow-hidden rounded-[14px] bg-[#faf3e8] md:max-w-[498px]">
                  <img
                    src={galleryHeroTallSrc}
                    alt={galleryHeroTallAlt}
                    className="block h-auto w-full origin-center transition-[transform,filter] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.015] group-hover:brightness-[1.02]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-[72px] lg:gap-[116px]">
                <h2 className="shrink-0 font-[family-name:var(--font-display)] text-[32px] font-light leading-[1.15] tracking-[-1.13px] md:w-[232px] md:text-[36px] md:leading-[45px]">
                  {solutionTitle}
                </h2>
                <p className="max-w-[397px] text-[17px] leading-[1.67] text-[#171513] md:text-[18px] md:leading-[30px]">
                  {solutionBody}
                </p>
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

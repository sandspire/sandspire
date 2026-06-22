import { RevealText } from "@/components/sandspire/RevealText";
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
        <div className="min-h-[45px]">
          <RevealText
            tag="h2"
            variant="headline"
            text={title}
            className="font-[family-name:var(--font-display)] not-italic text-[32px] font-light leading-[1.05] tracking-[-0.02em] text-[#faf3e8] lg:text-[34px]"
          />
        </div>
        <div className="min-h-[78px]">
          <RevealText
            tag="p"
            variant="paragraph"
            text={body}
            className="font-[family-name:var(--font-body)] text-[20px] font-light leading-[1.35] text-[#faf3e8]/85 lg:text-[22px]"
          />
        </div>
      </div>
    </section>
  );
}

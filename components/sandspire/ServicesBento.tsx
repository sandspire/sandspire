import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ServicesBento() {
  const brandStrategyImages = [
    "/images/Frame%201618872692-1.svg",
    "/images/Frame%201618872694-1.svg",
    "/images/Frame%201618872695-1.svg",
    "/images/Frame%201618872693-1.svg",
    "/images/Frame%201618872692.svg",
    "/images/Frame%201618872694.svg",
    "/images/Frame%201618872695.svg",
    "/images/Frame%201618872693.svg",
  ];

  return (
    <section
      id="services"
      className="mx-auto min-h-screen max-w-[1200px] px-6 py-12 lg:px-[110px] lg:py-16"
    >
      <div className="mx-auto w-full max-w-[940px]">
        <p className="text-sm font-medium uppercase tracking-[0.14px] text-[var(--accent)]">
          Agency Services
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-[42px] font-light leading-[1.02] tracking-[-0.02em] text-[var(--foreground)]">
          What we do
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-[590px_305px]">
          <div className="grid gap-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <ServiceMediaCard
                className="mt-3 h-[310px]"
                title=""
                priceLine=""
                accent="from-[#A31F11]/80 to-[#FF5E00]"
              >
                <div className="absolute left-4 top-12 text-[19px] font-semibold leading-[1.15] text-white">
                  Workflow
                  <br />
                  Performance
                </div>
                <video
                  className="absolute bottom-3 left-4 h-[184px] w-[246px] rounded-[12px] object-cover shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
                  src="/videos/InstagramInteractionsAnalytics.mp4"
                  poster="/images/InstagramViewsAnalyticsFallback1.png"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </ServiceMediaCard>

              <ServiceInfoCard
                className="mt-3 h-[310px]"
                title="AI Automation"
                priceLine="Starting from AED 10,000"
              >
                <img
                  src="/images/Service%20Icon%20Group.svg"
                  alt=""
                  className="mx-auto mt-6 h-[130px] w-auto rounded-[14px] object-contain opacity-90"
                  loading="lazy"
                />
              </ServiceInfoCard>
            </div>

            <ServiceInfoCard
              className="mt-3 h-[320px]"
              title="Web Design"
              priceLine="Starting from AED 5,000"
            >
              <ThreeDMarquee
                images={brandStrategyImages}
                compact
                className="h-[210px]"
              />
            </ServiceInfoCard>
          </div>

          <ServiceMediaCard
            className="mt-3 h-[640px]"
            title="Social Media Marketing"
            priceLine="Starting from AED 5,000"
            accent="from-[#7A231B]/65 via-[#C74519]/55 to-[#8E170E]/70"
          >
            <video
              className="absolute bottom-7 left-1/2 h-[420px] w-[196px] -translate-x-1/2 rounded-[15px] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.5)]"
              src="/videos/InstagramViewsAnalytics.mp4"
              poster="/images/InstagramViewsAnalyticsFallback2.png"
              autoPlay
              muted
              loop
              playsInline
            />
          </ServiceMediaCard>
        </div>
      </div>
    </section>
  );
}

function ServiceMediaCard(props: {
  className?: string;
  title: string;
  priceLine: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  const {
    className = "",
    title,
    priceLine,
    accent = "from-[#141414]/80 to-[#232323]/75",
    children,
  } = props;

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-[rgba(129,129,129,0.58)] ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full p-6 pt-9">
        {priceLine ? <p className="text-[11.5px] font-semibold text-white/90">{priceLine}</p> : null}
        {title ? <h3 className="mt-1 text-[27px] font-light leading-[1.1] text-white">{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}

function ServiceInfoCard(props: {
  className?: string;
  title: string;
  priceLine: string;
  children?: React.ReactNode;
}) {
  const { className = "", title, priceLine, children } = props;

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-[rgba(129,129,129,0.58)] bg-[linear-gradient(134deg,rgba(255,255,255,0.08)_0%,rgba(16,16,16,0.26)_100%)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_48%)]" />
      <div className="relative h-full p-6 pt-9">
        {priceLine ? <p className="text-[11.5px] font-semibold text-white/90">{priceLine}</p> : null}
        {title ? <h3 className="mt-1 text-[27px] font-light leading-[1.1] text-white">{title}</h3> : null}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}


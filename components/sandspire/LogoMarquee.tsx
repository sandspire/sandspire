type LogoMarqueeProps = {
  variant?: "default" | "hero";
};

export const LogoMarquee = ({ variant = "default" }: LogoMarqueeProps) => {
  const logos: { src: string; alt: string }[] = [
    { src: "/logos/3fils.svg", alt: "3 Fils" },
    { src: "/logos/brix.svg", alt: "Brix Journey" },
    { src: "/logos/konbini.svg", alt: "Konbini" },
    { src: "/logos/slrp.svg", alt: "Slrp" },
    { src: "/logos/kanji.svg", alt: "Kanji" },
    { src: "/logos/bordomavi.svg", alt: "Bordo Mavi" },
    { src: "/logos/brix.svg", alt: "Brix Journey" },
    { src: "/logos/konbini.svg", alt: "Konbini duplicate" },
  ];

  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "relative w-full overflow-hidden bg-[#141414]"
          : "relative w-full overflow-hidden rounded-[72px] bg-gradient-to-r from-[#141414] via-[#141414]/0 to-[#141414]"
      }
    >
      <div
        className={
          isHero
            ? "w-full overflow-hidden px-4 py-5 sm:px-8 lg:px-12"
            : "mx-auto w-full max-w-[1180px] overflow-hidden px-6 py-5"
        }
      >
        <div
          className={`logo-marquee-track flex w-max opacity-95 ${isHero ? "gap-[110px] sm:gap-[130px]" : "gap-[90px]"}`}
        >
          {logos.concat(logos).map((logo, idx) => (
            <img
              key={`${logo.src}-${idx}`}
              src={logo.src}
              alt={logo.alt}
              className="h-[24px] w-auto shrink-0 select-none object-contain"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
      {!isHero ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#141414] via-[#141414]/80 to-transparent" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#141414] to-transparent sm:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#141414] to-transparent sm:w-14" />
        </>
      )}
    </div>
  );
};

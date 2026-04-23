import Link from "next/link";

export const sandspireNavLinks: { label: string; href: string }[] = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type SandspireHeaderProps = {
  /** Primary CTA in the bar (defaults to dedicated contact page). */
  ctaHref?: string;
};

export function SandspireHeader({ ctaHref = "/contact" }: SandspireHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-[54px] bg-gradient-to-b from-[#141414]/75 to-[#0d0d0d]/65 px-5 backdrop-blur-[6px] lg:px-7">
      <div className="mx-auto flex h-full w-full max-w-[1220px] items-center justify-between gap-5">
        <Link href="/" aria-label="Go to homepage">
          <img src="/logos/sandspire.svg" alt="Sandspire" className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center justify-center gap-[38px] md:flex">
          {sandspireNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[12px] font-normal capitalize tracking-[0.12px] text-white/90 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={ctaHref}
          className="inline-flex h-9 shrink-0 items-center rounded-full bg-[var(--background)] px-5 text-[12px] font-medium text-[var(--foreground)]"
        >
          Get in touch
        </Link>
      </div>
    </header>
  );
}

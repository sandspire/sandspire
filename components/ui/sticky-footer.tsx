"use client";

import { Link } from "next-view-transitions";
import { motion, useReducedMotion } from "motion/react";

import { StickyScrollShell } from "@/components/ui/sticky-scroll-shell";
import { cn } from "@/lib/utils";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<"footer"> & {
  heightClass?: string;
};

export function StickyFooter({
  className,
  heightClass = "h-[720px]",
  ...props
}: StickyFooterProps) {
  return (
    <footer className={cn("relative w-full", className)} {...props}>
      <StickyScrollShell heightClass={heightClass} pin="bottom">
        <div className="relative flex size-full flex-col justify-between gap-5 border-t border-white/10 bg-[#0d0d0d] px-4 py-8 font-body text-[#faf3e8] md:px-12">
          <div aria-hidden className="absolute inset-0 isolate z-0 contain-strict">
            <div className="absolute top-0 left-0 h-80 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,hsla(0,0%,55%,0.02)_50%,rgba(255,255,255,0.01)_80%)]" />
            <div className="absolute top-0 left-0 h-80 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)]" />
          </div>
          <div className="relative z-10 mt-10 flex flex-col gap-8 md:flex-row xl:mt-0">
            <AnimatedContainer className="w-full min-w-2xs max-w-sm space-y-4">
              <p className="text-sm text-[#beb7b7]">
                Innovative creative studio empowering brands with strategy, design, and
                automation worldwide.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-[#beb7b7]">
                {socialLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="transition-colors hover:text-[#faf3e8]"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </AnimatedContainer>
            {footerLinkGroups.map((group, index) => (
              <AnimatedContainer
                key={group.label}
                delay={0.1 + index * 0.1}
                className="w-full"
              >
                <div className="mb-10 md:mb-0">
                  <h3 className="font-body text-sm uppercase tracking-wide text-[#f7941d]">
                    {group.label}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-[#beb7b7] md:text-xs lg:text-sm">
                    {group.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center transition-all duration-300 hover:text-[#faf3e8]"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
          <div className="relative z-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-2 text-sm text-[#beb7b7] md:flex-row">
            <p>© {new Date().getFullYear()} Sandspire. All rights reserved.</p>
            <p>Design by Jabrni</p>
          </div>
        </div>
      </StickyScrollShell>
    </footer>
  );
}

const socialLinks = [
  { title: "Instagram", href: "#" },
  { title: "LinkedIn", href: "#" },
  { title: "X", href: "#" },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: "Services",
    links: [
      { title: "Brand Strategy", href: "/#services" },
      { title: "Web Design", href: "/#services" },
      { title: "Social Media", href: "/#services" },
      { title: "AI Automation", href: "/#services" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Work", href: "/work" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "FAQ", href: "/#contact" },
      { title: "Case Studies", href: "/#work" },
    ],
  },
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
};

function AnimatedContainer({
  delay = 0.1,
  children,
  className,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

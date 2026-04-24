import type { Metadata } from "next";
import Link from "next/link";
import { SandspireHeader } from "@/components/sandspire/SandspireHeader";
import { SiteFooter } from "@/components/sandspire/SiteFooter";

export const metadata: Metadata = {
  title: "Coming soon — Sandspire",
  description: "This link will go live soon.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <SandspireHeader />
      <main className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <p className="font-[family-name:var(--font-body)] text-sm font-normal text-[#ff5e00]">Sandspire</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-[-0.02em] text-[#faf3e8]">
          Coming soon
        </h1>
        <p className="max-w-sm text-[17px] leading-[1.5] text-[#919191]">
          We&apos;re preparing this channel. In the meantime, reach us through the contact form or the phone
          number on the contact page.
        </p>
        <Link
          href="/contact"
          className="mt-2 inline-flex h-10 items-center rounded-full bg-[var(--background)] px-6 text-sm font-medium text-[var(--foreground)] transition-transform hover:-translate-y-px"
        >
          Get in touch
        </Link>
        <Link href="/" className="text-sm text-[#a9a095] underline underline-offset-4 transition-colors hover:text-[#faf3e8]">
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

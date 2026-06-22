import type { Metadata } from "next";
import Link from "next/link";
import { SandspireHeaderFromCms } from "@/components/sandspire/SandspireHeaderFromCms";
import { SiteFooterFromCms } from "@/components/sandspire/SiteFooterFromCms";

export const metadata: Metadata = {
  title: "Coming soon — Sandspire",
  description: "This one's still in the works.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <div className="site-jakarta min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <SandspireHeaderFromCms />
      <main className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <p className="font-[family-name:var(--font-body)] text-sm font-normal tracking-[0] text-[#ff5e00]">
          Sandspire
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#faf3e8]">
          Coming soon
        </h1>
        <p className="max-w-sm text-[17px] leading-[1.5] tracking-[0] text-[#919191]">
          We&apos;re still setting this one up. In the meantime, the fastest way to reach us is the contact
          form or the phone number on the contact page.
        </p>
        <Link
          href="/contact"
          className="mt-2 inline-flex h-10 items-center rounded-full bg-[#faf3e8] px-6 text-sm font-medium text-[#0d0d0d] transition-transform hover:-translate-y-px"
        >
          Start a project
        </Link>
        <Link
          href="/"
          className="text-sm tracking-[0] text-[#a9a095] underline underline-offset-4 transition-colors hover:text-[#faf3e8]"
        >
          Back to home
        </Link>
      </main>
      <SiteFooterFromCms />
    </div>
  );
}

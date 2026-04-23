import type { Metadata } from "next";
import Link from "next/link";

/**
 * A full embedded Sanity Studio is too large for Cloudflare Workers’ script limit (3–10 MB).
 * Edit content in Sanity’s hosted dashboard, or run the Studio locally (`npx sanity dev`).
 */

export const metadata: Metadata = {
  title: "Content (Sanity)",
  robots: { index: false, follow: false },
};

function projectPreviewHref(): string {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (projectId && dataset) {
    return `https://www.sanity.io/studio/preview/${projectId}/${dataset}/`;
  }
  return "https://www.sanity.io/manage";
}

export default function StudioInfoPage() {
  const manageHref = projectPreviewHref();
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#FAF3E8] px-6 py-16 text-center text-[#0D0D0D]">
      <p className="text-sm font-medium tracking-wide text-[#999999]">
        Sanity content
      </p>
      <h1 className="mt-2 max-w-md font-sans text-2xl font-light tracking-tight sm:text-3xl">
        The editing UI isn’t bundled on this site
      </h1>
      <p className="mt-4 max-w-md text-balance text-sm leading-relaxed text-[#0D0D0D]/80">
        The live worker stays small for Cloudflare. Open your project in Sanity or run the
        Studio on your computer instead.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <a
          href="https://www.sanity.io/manage"
          className="inline-flex items-center justify-center rounded-full bg-[#0D0D0D] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#333]"
        >
          Sanity Manage
        </a>
        <a
          href={manageHref}
          className="text-sm font-medium text-[#0D0D0D] underline decoration-[#0D0D0D]/30 underline-offset-4 hover:decoration-[#0D0D0D]"
        >
          {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
            ? "Project preview"
            : "Open Sanity"}
        </a>
      </div>
      <p className="mt-10 max-w-lg text-pretty text-xs text-[#999999]">
        Local Studio: in the project folder run{" "}
        <code className="rounded bg-black/[0.06] px-1.5 py-0.5 font-mono text-[#0D0D0D]">
          npx sanity dev
        </code>{" "}
        then open the URL it prints (the config still uses <code className="font-mono">/studio</code>).
      </p>
      <p className="mt-6">
        <Link
          href="/"
          className="text-sm text-[#0D0D0D] underline decoration-[#0D0D0D]/30 underline-offset-4 hover:decoration-[#0D0D0D]"
        >
          Back to site
        </Link>
      </p>
    </main>
  );
}

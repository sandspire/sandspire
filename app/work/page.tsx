import { Suspense } from "react";
import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { SandspireHeader } from "@/components/sandspire/SandspireHeader";
import { SiteFooter } from "@/components/sandspire/SiteFooter";
import { WorkProjectGrid } from "@/components/sandspire/WorkProjectGrid";
import { getWorkIndexCards } from "@/sanity/lib/queries/workIndex";

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getWorkIndexCards();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FAF3E8]">
      <SandspireHeader />

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-0 pt-20 sm:px-6 sm:pt-24 lg:px-0">
        <Suspense
          fallback={
            <div
              className="mx-auto w-full max-w-[995px] space-y-6 py-2"
              aria-hidden
            >
              <div className="mx-auto h-9 w-2/3 max-w-xs animate-pulse rounded-lg bg-white/10" />
              <div className="mx-auto h-11 w-full max-w-2xl animate-pulse rounded-2xl bg-white/10" />
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="h-80 animate-pulse rounded-[14px] bg-white/10" />
                <div className="h-80 animate-pulse rounded-[14px] bg-white/10" />
              </div>
            </div>
          }
        >
          <WorkProjectGrid projects={projects} />
        </Suspense>
      </main>

      <ContactFAQ />
      <SiteFooter />
    </div>
  );
}

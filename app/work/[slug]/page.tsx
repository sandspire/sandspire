import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkProjectTemplate } from "@/components/sandspire/WorkProjectTemplate";
import { buildWorkProjectPageProps } from "@/lib/buildWorkProjectPageProps";
import {
  getWorkProjectFallback,
  WORK_PROJECT_SLUGS,
} from "@/lib/workProjectDefaults";
import { getWorkProjectBySlug } from "@/sanity/lib/queries/workProject";
import { getAllWorkProjectSlugsForStaticParams } from "@/sanity/lib/queries/workIndex";

export const revalidate = 60;

export async function generateStaticParams() {
  const fromSanity = await getAllWorkProjectSlugsForStaticParams();
  const slugs = [...new Set([...WORK_PROJECT_SLUGS, ...fromSanity])];
  return slugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const base = getWorkProjectFallback(slug);
  const doc = await getWorkProjectBySlug(slug);
  if (!base && !doc) return { title: "Work" };
  const title = doc?.internalTitle ?? base?.internalTitle ?? "Work";
  const about = doc?.about ?? base?.about ?? "";
  const description = about.slice(0, 155);
  return {
    title: `${title} — Sandspire`,
    description,
  };
}

export default async function WorkProjectPage({ params }: Props) {
  const { slug } = await params;
  const d = getWorkProjectFallback(slug);
  const doc = await getWorkProjectBySlug(slug);

  const props = buildWorkProjectPageProps(slug, doc, d);
  if (!props) notFound();

  return <WorkProjectTemplate {...props} />;
}

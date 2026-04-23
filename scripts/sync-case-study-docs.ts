import { getCliClient } from "sanity/cli";

import { CASE_STUDY_PROJECTS } from "../lib/caseStudyProjectDefaults";

const client = getCliClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-23",
});

type ExistingCaseStudy = {
  _id: string;
  slug?: string;
};

async function main() {
  const existing = await client.fetch<ExistingCaseStudy[]>(
    `*[_type == "caseStudy"]{_id, "slug": slug.current}`,
  );

  const existingBySlug = new Map(
    existing
      .filter((doc): doc is ExistingCaseStudy & { slug: string } => Boolean(doc.slug))
      .map((doc) => [doc.slug, doc]),
  );

  const transaction = client.transaction();

  for (const project of CASE_STUDY_PROJECTS) {
    const existingDoc = existingBySlug.get(project.slug);
    if (!existingDoc) {
      console.log("Skipped missing document", project.slug);
      continue;
    }

    const patchOps: {
      set: Record<string, string>;
      setIfMissing: Record<string, string>;
      unset?: string[];
    } = {
      set: {
        projectUrl: project.projectUrl,
        ctaLabel: project.ctaLabel,
      },
      setIfMissing: {
        heroImagePath: project.images.hero,
        galleryStackTopPath: project.images.galleryStackTop,
        galleryHeroTallPath: project.images.galleryHeroTall,
        resultImageWidePath: project.images.resultWide,
        resultImageTallPath: project.images.resultTall,
      },
    };

    if (project.images.galleryStackBottom) {
      patchOps.set.galleryStackBottomPath = project.images.galleryStackBottom;
    } else {
      patchOps.unset = ["galleryStackBottomPath"];
    }

    transaction.patch(existingDoc._id, patchOps);
  }

  const result = await transaction.commit();
  console.log("Committed transaction", result.transactionId);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { defineField, defineType } from "sanity";

/**
 * One document per case-study page (e.g. slug "slrp" → /work/slrp).
 * Images are optional: when empty, the site uses built-in SLRP assets.
 */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal title",
      type: "string",
      description: "Label in Studio only (e.g. SLRP Ramen).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: 'Must match the URL segment (e.g. "slrp" for /work/slrp).',
      options: { source: "internalTitle", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroImage",
      title: "Hero — browser / device shot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "clientLogo",
      title: "Client logo",
      type: "image",
      description: "Optional. Prefer PNG/SVG on transparent background.",
      options: { hotspot: true },
    }),
    defineField({
      name: "invertClientLogo",
      title: "Invert logo on dark hero",
      type: "boolean",
      description: "Turn on for dark logos on the black hero (SLRP-style).",
      initialValue: true,
    }),

    defineField({
      name: "serviceTags",
      title: "Service tags (pills)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (Rule) => Rule.min(1).max(8),
      initialValue: ["Branding", "Web Development"],
    }),

    defineField({
      name: "fieldLabel",
      title: 'Label above "industry" row',
      type: "string",
      initialValue: "Field",
    }),
    defineField({
      name: "industry",
      title: "Industry / field value",
      type: "string",
      initialValue: "Restaurant",
    }),
    defineField({
      name: "locationLabel",
      title: "Location row label",
      type: "string",
      initialValue: "Company Location",
    }),
    defineField({
      name: "location",
      title: "Location value",
      type: "string",
      initialValue: "United Arab Emirates",
    }),
    defineField({
      name: "about",
      title: "About paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "projectUrl",
      title: "Project / client website URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "ctaLabel",
      title: "Primary button label",
      type: "string",
      initialValue: "Visit Website",
    }),

    defineField({
      name: "challengeTitle",
      title: "Challenge section title",
      type: "string",
      initialValue: "The challenge",
    }),
    defineField({
      name: "challengeBody",
      title: "Challenge body",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "solutionTitle",
      title: "Solution section title",
      type: "string",
      initialValue: "The solution",
    }),
    defineField({
      name: "solutionBody",
      title: "Solution body",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "resultTitle",
      title: "Result section title",
      type: "string",
      initialValue: "The result",
    }),

    defineField({
      name: "galleryStackTop",
      title: "Gallery — small top image (left column)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "galleryStackBottom",
      title: "Gallery — small bottom image (left column)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "galleryHeroTall",
      title: "Gallery — tall image (right)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resultImageWide",
      title: "Result — wide image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resultImageTall",
      title: "Result — narrow image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "internalTitle", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title: title || "Case study", subtitle: slug ? `/${slug}` : "" };
    },
  },
});

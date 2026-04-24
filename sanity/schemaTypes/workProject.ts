import { defineArrayMember, defineField, defineType } from "sanity";

const publicPathDescription =
  'Optional `/public` asset path, for example `/images/projects/slrp/slrp_header.png`.';

function validatePublicPath(value: unknown) {
  if (!value) return true;
  if (typeof value !== "string") return "Public asset paths must be strings";
  return value.startsWith("/") ? true : "Public asset paths must start with /";
}

/**
 * One document per /work/[slug] page (e.g. slug "slrp" → /work/slrp).
 * (Renamed from an earlier "case study" type; true case studies may be modeled separately later.)
 */
export const workProject = defineType({
  name: "workProject",
  title: "Work project",
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
      name: "workIndexOrder",
      title: "Order on /work",
      type: "number",
      description: "Lower numbers appear first on the work listing. Default 0.",
      initialValue: 0,
    }),
    defineField({
      name: "showOnWorkIndex",
      title: "Show on /work",
      type: "boolean",
      initialValue: true,
      description:
        "If off, this project is hidden from the work grid (the /work/slug page can still work).",
    }),
    defineField({
      name: "listingTitle",
      title: "Work listing — title",
      type: "string",
      description: "Optional. Card title; defaults to internal title if empty.",
    }),
    defineField({
      name: "listingSummary",
      title: "Work listing — short description",
      type: "text",
      rows: 2,
      description:
        "Card blurb on /work. If empty, the first line of the about paragraph is used when possible.",
    }),
    defineField({
      name: "listingImage",
      title: "Work listing — card image",
      type: "image",
      options: { hotspot: true },
      description: "Optional. Falls back to the hero image or site defaults when empty.",
    }),
    defineField({
      name: "listingImagePath",
      title: "Work listing — card image path",
      type: "string",
      description: publicPathDescription,
      validation: (Rule) => Rule.custom(validatePublicPath),
    }),

    defineField({
      name: "heroImage",
      title: "Hero — browser / device shot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImagePath",
      title: "Hero image path",
      type: "string",
      description: publicPathDescription,
      validation: (Rule) => Rule.custom(validatePublicPath),
    }),
    defineField({
      name: "clientLogo",
      title: "Client logo",
      type: "image",
      description: "Optional. Prefer PNG/SVG on transparent background.",
      options: { hotspot: true },
    }),
    defineField({
      name: "clientLogoPath",
      title: "Client logo path",
      type: "string",
      description:
        "Optional `/public` logo path when the asset already lives in the Next.js app.",
      validation: (Rule) => Rule.custom(validatePublicPath),
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
      of: [defineArrayMember({ type: "string" })],
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
      name: "galleryStackTopPath",
      title: "Gallery — small top image path",
      type: "string",
      description: publicPathDescription,
      validation: (Rule) => Rule.custom(validatePublicPath),
    }),
    defineField({
      name: "galleryStackBottom",
      title: "Gallery — small bottom image (left column)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "galleryStackBottomPath",
      title: "Gallery — small bottom image path",
      type: "string",
      description: publicPathDescription,
      validation: (Rule) => Rule.custom(validatePublicPath),
    }),
    defineField({
      name: "galleryHeroTall",
      title: "Gallery — tall image (right)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "galleryHeroTallPath",
      title: "Gallery — tall image path",
      type: "string",
      description: publicPathDescription,
      validation: (Rule) => Rule.custom(validatePublicPath),
    }),
    defineField({
      name: "resultImageWide",
      title: "Result — wide image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resultImageWidePath",
      title: "Result — wide image path",
      type: "string",
      description: publicPathDescription,
      validation: (Rule) => Rule.custom(validatePublicPath),
    }),
    defineField({
      name: "resultImageTall",
      title: "Result — narrow image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resultImageTallPath",
      title: "Result — narrow image path",
      type: "string",
      description: publicPathDescription,
      validation: (Rule) => Rule.custom(validatePublicPath),
    }),
  ],
  preview: {
    select: { title: "internalTitle", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title: title || "Work project", subtitle: slug ? `/${slug}` : "" };
    },
  },
});

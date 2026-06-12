import { defineField, defineType } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Navigation link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
    defineField({ name: "href", title: "Link URL", type: "string", validation: (R) => R.required() }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (R) => R.required() }),
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
    defineField({ name: "href", title: "URL", type: "string", validation: (R) => R.required() }),
  ],
});

export const mediaPath = defineType({
  name: "mediaPath",
  title: "Media path",
  type: "object",
  fields: [
    defineField({
      name: "path",
      title: "Public path",
      type: "string",
      description: "Path under /public, e.g. /videos/HeroVideo.mp4 or /images/hero.png",
      validation: (R) => R.required().custom((v) => (v?.startsWith("/") ? true : "Must start with /")),
    }),
    defineField({
      name: "image",
      title: "Or upload image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

export const serviceCardContent = defineType({
  name: "serviceCardContent",
  title: "Service card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "priceLine", title: "Price line (homepage 1)", type: "string" }),
    defineField({ name: "flipDescription", title: "Flip card back text (home 2)", type: "text", rows: 2 }),
  ],
});

export const featuredWorkScrollItem = defineType({
  name: "featuredWorkScrollItem",
  title: "Featured work scroll item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "href", title: "Project link", type: "string" }),
    defineField({ name: "videoPath", title: "Video path", type: "string" }),
    defineField({ name: "iconPath", title: "Icon path", type: "string" }),
    defineField({ name: "socialLabel", title: "Phone card label", type: "string" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

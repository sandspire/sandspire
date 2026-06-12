import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage (version 1)",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string" }),
    defineField({ name: "heroSubheadline", title: "Hero subheadline", type: "text", rows: 2 }),
    defineField({ name: "heroBodyTitle", title: "Hero right column title", type: "string" }),
    defineField({ name: "heroBodyText", title: "Hero right column text", type: "text", rows: 3 }),
    defineField({ name: "heroVideoPath", title: "Hero video path", type: "string" }),
    defineField({ name: "heroVideoPosterPath", title: "Hero video poster path", type: "string" }),
    defineField({ name: "analyticsVideoPath", title: "Services bento analytics video", type: "string" }),
    defineField({
      name: "analyticsVideoPosterPath",
      title: "Services bento analytics poster",
      type: "string",
    }),
    defineField({
      name: "heroServices",
      title: "Hero service labels",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "num", title: "Number", type: "string" }),
        defineField({ name: "label", title: "Label", type: "string" }),
      ]}],
    }),
    defineField({ name: "whoTitle", title: "Who we are — title", type: "string" }),
    defineField({ name: "whoBody", title: "Who we are — body", type: "text", rows: 3 }),
    defineField({ name: "servicesEyebrow", title: "Services eyebrow", type: "string" }),
    defineField({ name: "servicesTitle", title: "Services title", type: "string" }),
    defineField({ name: "caseStudiesTitle", title: "Case studies section title", type: "string" }),
    defineField({
      name: "featuredCases",
      title: "Featured case studies",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "slug", title: "Work slug", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        defineField({ name: "imagePath", title: "Image path", type: "string" }),
      ]}],
    }),
    defineField({
      name: "serviceCards",
      title: "Service bento cards",
      type: "array",
      of: [{ type: "serviceCardContent" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage (version 1)" };
    },
  },
});

import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", title: "Page title (SEO)", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 4 }),
    defineField({ name: "section1Title", title: "Section 1 title", type: "string" }),
    defineField({ name: "section1Body", title: "Section 1 body", type: "text", rows: 4 }),
    defineField({ name: "section2Title", title: "Section 2 title", type: "string" }),
    defineField({ name: "section2Body", title: "Section 2 body", type: "text", rows: 4 }),
    defineField({ name: "ctaPrefix", title: "Bottom CTA prefix", type: "string" }),
    defineField({ name: "ctaLinkLabel", title: "Bottom CTA link label", type: "string" }),
    defineField({ name: "ctaLinkHref", title: "Bottom CTA link URL", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});

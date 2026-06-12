import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      description: "Used in browser tab and SEO when pages do not override.",
    }),
    defineField({
      name: "siteDescription",
      title: "Site description",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "phone", title: "Phone number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      of: [{ type: "navLink" }],
    }),
    defineField({ name: "ctaLabel", title: "Header CTA label", type: "string" }),
    defineField({ name: "ctaHref", title: "Header CTA link", type: "string" }),
    defineField({
      name: "footerTaglineLine1",
      title: "Footer tagline — line 1",
      type: "string",
    }),
    defineField({
      name: "footerTaglineLine2",
      title: "Footer tagline — line 2",
      type: "string",
    }),
    defineField({ name: "footerBlurb", title: "Footer description", type: "text", rows: 3 }),
    defineField({ name: "footerCopyright", title: "Footer copyright", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({ name: "contactEyebrow", title: "Contact eyebrow (homepage 1)", type: "string" }),
    defineField({ name: "contactHeadline", title: "Contact headline", type: "string" }),
    defineField({ name: "contactIntro", title: "Contact intro", type: "text", rows: 3 }),
    defineField({
      name: "faqDefault",
      title: "FAQ — default (homepage & contact)",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
    defineField({
      name: "faqHome2",
      title: "FAQ — home page 2",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});

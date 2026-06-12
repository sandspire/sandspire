import { defineField, defineType } from "sanity";

export const workPageSettings = defineType({
  name: "workPageSettings",
  title: "Work listing page",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", title: "Page title (SEO)", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 2 }),
    defineField({ name: "emptyFilterMessage", title: "Empty filter message", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Work listing page" };
    },
  },
});

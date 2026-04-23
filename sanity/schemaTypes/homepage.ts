import { defineField, defineType } from "sanity";

/** Starter document; extend fields and GROQ queries as you wire pages to Sanity. */
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      description: "Optional — connect app/page.tsx to this field when ready.",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero subheadline",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "heroHeadline" },
    prepare({ title }) {
      return { title: title || "Homepage" };
    },
  },
});

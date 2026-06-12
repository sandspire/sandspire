import { defineField, defineType } from "sanity";

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client logo",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Client name", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "logoPath",
      title: "Logo path",
      type: "string",
      description: "Path under /public, e.g. /logos/3fils.svg",
    }),
    defineField({
      name: "logoImage",
      title: "Or upload logo",
      type: "image",
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({ name: "showInMarquee", title: "Show in logo marquee", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", media: "logoImage" },
  },
});

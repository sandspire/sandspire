import { defineField, defineType } from "sanity";

export const homepageV2 = defineType({
  name: "homepageV2",
  title: "Homepage (version 2)",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", title: "Page title (SEO)", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string" }),
    defineField({ name: "heroSubheadline", title: "Hero subheadline", type: "text", rows: 2 }),
    defineField({ name: "heroImagePath", title: "Hero image path", type: "string" }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary CTA label", type: "string" }),
    defineField({ name: "heroPrimaryCtaHref", title: "Primary CTA link", type: "string" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA label", type: "string" }),
    defineField({ name: "heroSecondaryCtaHref", title: "Secondary CTA link", type: "string" }),
    defineField({ name: "workTitle", title: "Our Work — title", type: "string" }),
    defineField({ name: "workSubtitle", title: "Our Work — subtitle", type: "text", rows: 2 }),
    defineField({ name: "workViewAllLabel", title: "View all work button", type: "string" }),
    defineField({ name: "workViewAllHref", title: "View all work link", type: "string" }),
    defineField({
      name: "workScrollItems",
      title: "Our Work scroll items",
      type: "array",
      of: [{ type: "featuredWorkScrollItem" }],
    }),
    defineField({ name: "servicesTitle", title: "Service Suite title", type: "string" }),
    defineField({
      name: "serviceCards",
      title: "Service flip cards",
      type: "array",
      of: [{ type: "serviceCardContent" }],
    }),
    defineField({ name: "showreelTitle", title: "Showreel title", type: "string" }),
    defineField({ name: "showreelVideoPath", title: "Showreel video path", type: "string" }),
    defineField({ name: "showreelPosterPath", title: "Showreel poster path", type: "string" }),
    defineField({ name: "showreelCtaLabel", title: "Showreel CTA label", type: "string" }),
    defineField({ name: "showreelCtaHref", title: "Showreel CTA link", type: "string" }),
    defineField({ name: "analyticsVideoPath", title: "Service bento analytics video", type: "string" }),
    defineField({ name: "analyticsVideoPosterPath", title: "Analytics video poster", type: "string" }),
    defineField({ name: "bentoCocktailImagePath", title: "Bento cocktail image path", type: "string" }),
    defineField({ name: "bentoFoodImagePath", title: "Bento food image path", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage (version 2)" };
    },
  },
});

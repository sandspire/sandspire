import type { StructureResolver } from "sanity/structure";

const singletonId = (type: string) => `${type}`;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId(singletonId("siteSettings"))),
      S.divider(),
      S.listItem()
        .title("Homepage (version 1)")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId(singletonId("homepage"))),
      S.listItem()
        .title("Homepage (version 2)")
        .id("homepageV2")
        .child(S.document().schemaType("homepageV2").documentId(singletonId("homepageV2"))),
      S.listItem()
        .title("About page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId(singletonId("aboutPage"))),
      S.listItem()
        .title("Work listing page")
        .id("workPageSettings")
        .child(
          S.document().schemaType("workPageSettings").documentId(singletonId("workPageSettings")),
        ),
      S.divider(),
      S.documentTypeListItem("workProject").title("Work projects"),
      S.documentTypeListItem("clientLogo").title("Client logos"),
    ]);

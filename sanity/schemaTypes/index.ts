import { type SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { clientLogo } from "./clientLogo";
import { homepage } from "./homepage";
import { homepageV2 } from "./homepageV2";
import {
  faqItem,
  featuredWorkScrollItem,
  mediaPath,
  navLink,
  serviceCardContent,
  socialLink,
} from "./objects";
import { siteSettings } from "./siteSettings";
import { workPageSettings } from "./workPageSettings";
import { workProject } from "./workProject";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    navLink,
    faqItem,
    socialLink,
    mediaPath,
    serviceCardContent,
    featuredWorkScrollItem,
    siteSettings,
    homepage,
    homepageV2,
    aboutPage,
    workPageSettings,
    clientLogo,
    workProject,
  ],
};

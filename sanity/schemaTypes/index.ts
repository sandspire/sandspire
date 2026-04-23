import { type SchemaTypeDefinition } from "sanity";

import { caseStudy } from "./caseStudy";
import { homepage } from "./homepage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, caseStudy],
};

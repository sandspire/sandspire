import { type SchemaTypeDefinition } from "sanity";

import { homepage } from "./homepage";
import { workProject } from "./workProject";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, workProject],
};

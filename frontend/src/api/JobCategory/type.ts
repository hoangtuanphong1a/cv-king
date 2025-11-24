import type { z } from "zod";
import {
  JobCategorySchema,
  JobCategoryCreateRequestSchema,
  JobCategoryUpdateRequestSchema,
} from "./schema";

/** Response item */
export type JobCategory = z.infer<typeof JobCategorySchema>;

/** Request bodies (PascalCase) */
export type JobCategoryCreateRequest = z.infer<typeof JobCategoryCreateRequestSchema>;
export type JobCategoryUpdateRequest = z.infer<typeof JobCategoryUpdateRequestSchema>;

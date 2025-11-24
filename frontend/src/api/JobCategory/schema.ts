import { z } from "zod";

/** REQUEST (PascalCase) */
export const JobCategoryCreateRequestSchema = z.object({
  Name: z.string().trim().min(1).max(200),
});

export const JobCategoryUpdateRequestSchema = z.object({
  Id: z.string(), // id không ràng buộc
  Name: z.string().trim().min(1).max(200),
});

/** RESPONSE (camel đầu thường) */
export const JobCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  updated_at: z.union([z.string(), z.date()]).nullable().optional(),
});

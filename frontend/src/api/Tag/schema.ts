// @/api/job-tags/schema.ts
import { z } from "zod";

export const JobTagCreateRequestSchema = z.object({
  Name: z.string().trim().min(1).max(200),
});

export const JobTagUpdateRequestSchema = z.object({
  Id: z.string(), // id không ràng buộc
  Name: z.string().trim().min(1).max(200),
});

export const JobTagSchema = z.object({
  id: z.string(), // không ràng buộc
  name: z.string(),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  updated_at: z.union([z.string(), z.date()]).nullable().optional(),
});

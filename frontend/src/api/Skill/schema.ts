import { z } from "zod";

export const SkillCreateRequestSchema = z.object({
  Name: z.string().trim().min(1).max(200),
});

export const SkillUpdateRequestSchema = z.object({
  Id: z.string(), // id không ràng buộc
  Name: z.string().trim().min(1).max(200),
});

export const SkillSchema = z.object({
  id: z.string(), // không ràng buộc
  name: z.string(),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  updated_at: z.union([z.string(), z.date()]).nullable().optional(),
});

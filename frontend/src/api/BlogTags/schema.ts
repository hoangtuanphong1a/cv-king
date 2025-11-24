import { z } from "zod";

export const ApiResponseSchema = <T extends z.ZodTypeAny = z.ZodUnknown>(
  dataSchema?: T
) =>
  z.object({
    status: z.enum(["success", "error"]),
    message: z.string(),
    data: z.union([
      dataSchema ?? z.unknown(),
      (dataSchema ?? z.unknown()).array(),
      z.null(),
    ]),
    meta: z
      .object({
        count: z.number().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
        totalPages: z.number().optional(),
      })
      .optional(),
  });

export const BlogTagSchema = z.object({
  id: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
  name: z.string(),
});

export const BlogTagsSchema = z.array(BlogTagSchema);

export const CreateBlogTagSchema = z.object({
  name: z.string().trim().min(1).max(200),
});

export const UpdateBlogTagSchema = z.object({
  name: z.string().trim().max(200).optional(),
});

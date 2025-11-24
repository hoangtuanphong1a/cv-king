import { z } from "zod";

export const SavedBlogSchema = z.object({
  id: z.string(),
  blogPostId: z.string(),
  userId: z.string(),
  savedAt: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable().optional(),
  coverImageUrl: z.string().nullable().optional(),
  authorName: z.string(),
  blogCreatedAt: z.string(),
  blogViewsCount: z.number(),
});

export const SavedBlogsSchema = z.array(SavedBlogSchema);

export const SavedBlogFilterSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(['savedAt', 'title', 'createdAt']).default('savedAt'),
  sortOrder: z.enum(['ASC', 'DESC']).default('DESC'),
});

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

export const SavedBlogApiResponseSchema = ApiResponseSchema(z.unknown());

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

export const BlogCommentSchema = z.object({
  id: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
  blogPostId: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  content: z.string(),
  isApproved: z.boolean(),
});

export const BlogCommentsSchema = z.array(BlogCommentSchema);

export const CreateBlogCommentSchema = z.object({
  BlogPostId: z.string().uuid().optional(),
  UserId: z.string().uuid().optional(),
  Content: z.string().trim().min(1),
});

export const UpdateBlogCommentSchema = z.object({
  Content: z.string().trim().optional(),
  IsApproved: z.boolean().optional(),
});

export const BlogCommentFilterSchema = z.object({
  blogPostId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  isApproved: z.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

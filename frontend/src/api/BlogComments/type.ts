import { z } from "zod";
import {
  ApiResponseSchema,
  BlogCommentSchema,
  CreateBlogCommentSchema,
  UpdateBlogCommentSchema,
  BlogCommentFilterSchema,
} from "./schema";

export type BlogComment = z.infer<typeof BlogCommentSchema>;
export type CreateBlogCommentRequest = z.input<typeof CreateBlogCommentSchema>;
export type UpdateBlogCommentRequest = z.input<typeof UpdateBlogCommentSchema>;
export type BlogCommentFilter = z.input<typeof BlogCommentFilterSchema>;
export type BlogCommentApiResponse = z.infer<ReturnType<typeof ApiResponseSchema>>;

import { z } from "zod";
import {
  ApiResponseSchema,
  CreateBlogPostSchema,
  UpdateBlogPostSchema,
  BlogPostSchema,
  BlogPostWithRelationsSchema,
  BlogPostFilterSchema,
} from "./schema";

export type BlogPost = z.infer<typeof BlogPostSchema>;
export type BlogPostWithRelations = z.infer<typeof BlogPostWithRelationsSchema>;
export type CreateBlogPostRequest = z.input<typeof CreateBlogPostSchema>;
export type UpdateBlogPostRequest = z.input<typeof UpdateBlogPostSchema>;
export type BlogPostFilter = z.input<typeof BlogPostFilterSchema>;
export type BlogPostApiResponse = z.infer<ReturnType<typeof ApiResponseSchema>>;

// Type aliases để tương thích với Jobs API pattern
export type CreateBlogPostFormData = CreateBlogPostRequest;
export type UpdateBlogPostFormData = UpdateBlogPostRequest;

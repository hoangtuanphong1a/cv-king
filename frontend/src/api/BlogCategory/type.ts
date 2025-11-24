import { z } from "zod";
import {
  ApiResponseSchema,
  BlogCategorySchema,
  CreateBlogCategorySchema,
  UpdateBlogCategorySchema,
} from "./schema";

export type BlogCategory = z.infer<typeof BlogCategorySchema>;
export type CreateBlogCategoryRequest = z.input<typeof CreateBlogCategorySchema>;
export type UpdateBlogCategoryRequest = z.input<typeof UpdateBlogCategorySchema>;
export type BlogCategoryApiResponse = z.infer<ReturnType<typeof ApiResponseSchema>>;

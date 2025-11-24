import { z } from "zod";
import {
  ApiResponseSchema,
  BlogTagSchema,
  CreateBlogTagSchema,
  UpdateBlogTagSchema,
} from "./schema";

export type BlogTag = z.infer<typeof BlogTagSchema>;
export type CreateBlogTagRequest = z.input<typeof CreateBlogTagSchema>;
export type UpdateBlogTagRequest = z.input<typeof UpdateBlogTagSchema>;
export type BlogTagApiResponse = z.infer<ReturnType<typeof ApiResponseSchema>>;

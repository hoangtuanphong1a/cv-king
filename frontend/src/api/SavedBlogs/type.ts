import z from "zod";
import { SavedBlogSchema, SavedBlogFilterSchema, SavedBlogApiResponseSchema } from "./schema";

export type SavedBlog = z.infer<typeof SavedBlogSchema>;
export type SavedBlogFilter = z.infer<typeof SavedBlogFilterSchema>;
export type SavedBlogApiResponse = z.infer<typeof SavedBlogApiResponseSchema>;

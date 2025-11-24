import httpInstance from "../axios";
import {
  ApiResponseSchema,
  BlogCategorySchema,
  BlogCategoriesSchema,
  CreateBlogCategorySchema,
  UpdateBlogCategorySchema,
} from "./schema";
import type {
  BlogCategory,
  CreateBlogCategoryRequest,
  UpdateBlogCategoryRequest,
} from "./type";

/** GET /blog-categories */
export async function getBlogCategoriesRequest(): Promise<BlogCategory[]> {
  const res = await httpInstance.get("/blog-categories");
  const ListResp = ApiResponseSchema(BlogCategoriesSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
      ? [parsedResp.data]
      : [];
  return list;
}

/** GET /blog-categories/:id */
export async function getBlogCategoryByIdRequest(id: string): Promise<BlogCategory> {
  const res = await httpInstance.get(`/blog-categories/${id}`);
  const SingleResp = ApiResponseSchema(BlogCategorySchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogCategorySchema.parse(parsedResp.data);
}

/** GET /blog-categories/search/:name */
export async function searchBlogCategoriesByNameRequest(name: string): Promise<BlogCategory[]> {
  const res = await httpInstance.get(`/blog-categories/search/${encodeURIComponent(name)}`);
  const ListResp = ApiResponseSchema(BlogCategoriesSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
      ? [parsedResp.data]
      : [];
  return list;
}

/** POST /blog-categories */
export async function createBlogCategoryRequest(input: CreateBlogCategoryRequest): Promise<BlogCategory> {
  const body = CreateBlogCategorySchema.parse(input);
  const res = await httpInstance.post("/blog-categories", body);
  const SingleResp = ApiResponseSchema(BlogCategorySchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogCategorySchema.parse(parsedResp.data);
}

/** PUT /blog-categories/:id */
export async function updateBlogCategoryRequest(params: {
  id: string;
  data: UpdateBlogCategoryRequest;
}): Promise<BlogCategory> {
  const { id, data } = params;
  const body = UpdateBlogCategorySchema.parse(data);
  const res = await httpInstance.put(`/blog-categories/${id}`, body);
  const SingleResp = ApiResponseSchema(BlogCategorySchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogCategorySchema.parse(parsedResp.data);
}

/** DELETE /blog-categories/:id */
export async function deleteBlogCategoryRequest(id: string): Promise<void> {
  await httpInstance.delete(`/blog-categories/${id}`);
}

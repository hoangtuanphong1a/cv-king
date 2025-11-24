import httpInstance from "../axios";
import {
  ApiResponseSchema,
  BlogTagSchema,
  BlogTagsSchema,
  CreateBlogTagSchema,
  UpdateBlogTagSchema,
} from "./schema";
import type {
  BlogTag,
  CreateBlogTagRequest,
  UpdateBlogTagRequest,
} from "./type";

/** GET /blog-tags */
export async function getBlogTagsRequest(): Promise<BlogTag[]> {
  const res = await httpInstance.get("/blog-tags");
  const ListResp = ApiResponseSchema(BlogTagsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
      ? [parsedResp.data]
      : [];
  return list;
}

/** GET /blog-tags/:id */
export async function getBlogTagByIdRequest(id: string): Promise<BlogTag> {
  const res = await httpInstance.get(`/blog-tags/${id}`);
  const SingleResp = ApiResponseSchema(BlogTagSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogTagSchema.parse(parsedResp.data);
}

/** GET /blog-tags/search/:name */
export async function searchBlogTagsByNameRequest(name: string): Promise<BlogTag[]> {
  const res = await httpInstance.get(`/blog-tags/search/${encodeURIComponent(name)}`);
  const ListResp = ApiResponseSchema(BlogTagsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
      ? [parsedResp.data]
      : [];
  return list;
}

/** POST /blog-tags */
export async function createBlogTagRequest(input: CreateBlogTagRequest): Promise<BlogTag> {
  const body = CreateBlogTagSchema.parse(input);
  const res = await httpInstance.post("/blog-tags", body);
  const SingleResp = ApiResponseSchema(BlogTagSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogTagSchema.parse(parsedResp.data);
}

/** PUT /blog-tags/:id */
export async function updateBlogTagRequest(params: {
  id: string;
  data: UpdateBlogTagRequest;
}): Promise<BlogTag> {
  const { id, data } = params;
  const body = UpdateBlogTagSchema.parse(data);
  const res = await httpInstance.put(`/blog-tags/${id}`, body);
  const SingleResp = ApiResponseSchema(BlogTagSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogTagSchema.parse(parsedResp.data);
}

/** DELETE /blog-tags/:id */
export async function deleteBlogTagRequest(id: string): Promise<void> {
  await httpInstance.delete(`/blog-tags/${id}`);
}

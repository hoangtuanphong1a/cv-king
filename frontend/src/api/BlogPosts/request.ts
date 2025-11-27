import httpInstance from "../axios";
import {
  ApiResponseSchema,
  BlogPostSchema,
  BlogPostWithRelationsSchema,
  BlogPostsSchema,
  CreateBlogPostSchema,
  UpdateBlogPostSchema,
  BlogPostFilterSchema,
} from "./schema";
import type {
  BlogPost,
  BlogPostWithRelations,
  CreateBlogPostFormData,
  UpdateBlogPostFormData,
  BlogPostFilter,
} from "./type";

/** GET /blog-posts → BlogPost[] */
export async function getBlogPostsRequest(
  filter?: Partial<BlogPostFilter>
): Promise<BlogPost[]> {
  // Dùng schema đầy đủ để áp dụng default values
  const parsed = BlogPostFilterSchema.parse(filter ?? {});

  // Chỉ gửi param có giá trị (lọc theo trường đã nhập)
  const params: Record<string, string | number | boolean> = {};
  if (parsed.keyword) params.keyword = parsed.keyword;
  if (parsed.categoryId) params.categoryId = parsed.categoryId;
  if (parsed.authorId) params.authorId = parsed.authorId;
  if (parsed.tagIds) params.tagIds = parsed.tagIds;
  if (parsed.status) params.status = parsed.status;
  if (parsed.isPublished !== undefined) params.isPublished = parsed.isPublished;
  if (parsed.viewsCountMin !== undefined) params.viewsCountMin = parsed.viewsCountMin;
  if (parsed.dateFrom) params.dateFrom = parsed.dateFrom;
  if (parsed.dateTo) params.dateTo = parsed.dateTo;
  params.sortBy = parsed.sortBy;
  params.sortOrder = parsed.sortOrder;
  params.page = parsed.page;
  params.limit = parsed.limit;

  const res = await httpInstance.get("/blog-posts", { params });

  // Parse response với ApiResponseSchema
  const ListResp = ApiResponseSchema(BlogPostsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
    ? [parsedResp.data]
    : [];
  return list;
}

/** GET /blog-posts/:id → BlogPostWithRelations */
export async function getBlogPostByIdRequest(
  id: string
): Promise<BlogPostWithRelations> {
  const res = await httpInstance.get(`/blog-posts/${id}`);
  const SingleResp = ApiResponseSchema(BlogPostWithRelationsSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogPostWithRelationsSchema.parse(parsedResp.data);
}

/** GET /blog-posts/slug/:slug → BlogPostWithRelations */
export async function getBlogPostBySlugRequest(
  slug: string
): Promise<BlogPostWithRelations> {
  const res = await httpInstance.get(`/blog-posts/slug/${slug}`);
  const SingleResp = ApiResponseSchema(BlogPostWithRelationsSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogPostWithRelationsSchema.parse(parsedResp.data);
}

/** GET /blog-posts/search/title?title= → BlogPost[] */
export async function searchBlogPostsByTitleRequest(
  title: string
): Promise<BlogPost[]> {
  const res = await httpInstance.get(
    `/blog-posts/search/title?title=${encodeURIComponent(title)}`
  );
  const ListResp = ApiResponseSchema(BlogPostsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
    ? [parsedResp.data]
    : [];
  return list;
}

/** POST /blog-posts → BlogPost */
export async function createBlogPostRequest(
  input: CreateBlogPostFormData
): Promise<BlogPost> {
  const body = CreateBlogPostSchema.parse(input);
  const res = await httpInstance.post("/blog-posts", body);
  const SingleResp = ApiResponseSchema(BlogPostSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogPostSchema.parse(parsedResp.data);
}

/** PUT /blog-posts → BlogPost */
export async function updateBlogPostRequest(params: {
  id: string;
  data: UpdateBlogPostFormData;
}): Promise<BlogPost> {
  const { id, data } = params;
  const body = UpdateBlogPostSchema.parse({ id, ...data });
  const res = await httpInstance.put('/blog-posts', body);
  const SingleResp = ApiResponseSchema(BlogPostSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogPostSchema.parse(parsedResp.data);
}

/** DELETE /blog-posts/:id → void */
export async function deleteBlogPostRequest(id: string): Promise<void> {
  await httpInstance.delete(`/blog-posts/${id}`);
}

/** POST /blog-posts/:id/tags → void */
export async function addTagsToBlogPostRequest(
  id: string,
  tagIds: string[]
): Promise<void> {
  await httpInstance.post(`/blog-posts/${id}/tags`, { tagIds });
}

/** DELETE /blog-posts/:id/tags/:tagId → void */
export async function removeTagFromBlogPostRequest(
  id: string,
  tagId: string
): Promise<void> {
  await httpInstance.delete(`/blog-posts/${id}/tags/${tagId}`);
}

/** PUT /blog-posts/:id/publish → BlogPost */
export async function publishBlogPostRequest(id: string): Promise<BlogPost> {
  const res = await httpInstance.put(`/blog-posts/${id}/publish`);
  const SingleResp = ApiResponseSchema(BlogPostSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogPostSchema.parse(parsedResp.data);
}

/** PUT /blog-posts/:id/unpublish → BlogPost */
export async function unpublishBlogPostRequest(id: string): Promise<BlogPost> {
  const res = await httpInstance.put(`/blog-posts/${id}/unpublish`);
  const SingleResp = ApiResponseSchema(BlogPostSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogPostSchema.parse(parsedResp.data);
}

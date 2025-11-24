import httpInstance from "../axios";
import {
  ApiResponseSchema,
  BlogCommentSchema,
  BlogCommentsSchema,
  CreateBlogCommentSchema,
  UpdateBlogCommentSchema,
} from "./schema";
import type {
  BlogComment,
  CreateBlogCommentRequest,
  UpdateBlogCommentRequest,
  BlogCommentFilter,
} from "./type";

/** GET /blog-comments */
export async function getBlogCommentsRequest(filter?: BlogCommentFilter): Promise<BlogComment[]> {
  const params = new URLSearchParams();
  if (filter?.blogPostId) params.append('blogPostId', filter.blogPostId);
  if (filter?.userId) params.append('userId', filter.userId);
  if (filter?.isApproved !== undefined) params.append('isApproved', filter.isApproved.toString());

  const res = await httpInstance.get(`/blog-comments?${params.toString()}`);
  const ListResp = ApiResponseSchema(BlogCommentsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
      ? [parsedResp.data]
      : [];
  return list;
}

/** GET /blog-comments/:id */
export async function getBlogCommentByIdRequest(id: string): Promise<BlogComment> {
  const res = await httpInstance.get(`/blog-comments/${id}`);
  const SingleResp = ApiResponseSchema(BlogCommentSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogCommentSchema.parse(parsedResp.data);
}

/** GET /blog-comments/post/:blogPostId */
export async function getBlogCommentsByPostRequest(blogPostId: string, approvedOnly?: boolean): Promise<BlogComment[]> {
  const params =approvedOnly !== undefined ? `?approvedOnly=${approvedOnly}` : '';
  const res = await httpInstance.get(`/blog-comments/post/${blogPostId}${params}`);
  const ListResp = ApiResponseSchema(BlogCommentsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
      ? [parsedResp.data]
      : [];
  return list;
}

/** GET /blog-comments/user/:userId */
export async function getBlogCommentsByUserRequest(userId: string, approvedOnly?: boolean): Promise<BlogComment[]> {
  const params =approvedOnly !== undefined ? `?approvedOnly=${approvedOnly}` : '';
  const res = await httpInstance.get(`/blog-comments/user/${userId}${params}`);
  const ListResp = ApiResponseSchema(BlogCommentsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
      ? [parsedResp.data]
      : [];
  return list;
}

/** POST /blog-comments */
export async function createBlogCommentRequest(input: CreateBlogCommentRequest): Promise<BlogComment> {
  const body = CreateBlogCommentSchema.parse(input);
  const res = await httpInstance.post("/blog-comments", body);
  const SingleResp = ApiResponseSchema(BlogCommentSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogCommentSchema.parse(parsedResp.data);
}

/** PUT /blog-comments/:id */
export async function updateBlogCommentRequest(params: { id: string; data: UpdateBlogCommentRequest }): Promise<BlogComment> {
  const { id, data } = params;
  const body = UpdateBlogCommentSchema.parse(data);
  const res = await httpInstance.put(`/blog-comments/${id}`, body);
  const SingleResp = ApiResponseSchema(BlogCommentSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogCommentSchema.parse(parsedResp.data);
}

/** DELETE /blog-comments/:id */
export async function deleteBlogCommentRequest(id: string): Promise<void> {
  await httpInstance.delete(`/blog-comments/${id}`);
}

/** PATCH /blog-comments/:id/approve */
export async function approveBlogCommentRequest(id: string): Promise<BlogComment> {
  const res = await httpInstance.patch(`/blog-comments/${id}/approve`);
  const SingleResp = ApiResponseSchema(BlogCommentSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogCommentSchema.parse(parsedResp.data);
}

/** PATCH /blog-comments/:id/reject */
export async function rejectBlogCommentRequest(id: string): Promise<BlogComment> {
  const res = await httpInstance.patch(`/blog-comments/${id}/reject`);
  const SingleResp = ApiResponseSchema(BlogCommentSchema);
  const parsedResp = SingleResp.parse(res.data);
  return BlogCommentSchema.parse(parsedResp.data);
}

/** PATCH /blog-comments/bulk/approve */
export async function bulkApproveBlogCommentsRequest(commentIds: string[]): Promise<BlogComment[]> {
  const res = await httpInstance.patch(`/blog-comments/bulk/approve`, { commentIds });
  const ListResp = ApiResponseSchema(BlogCommentsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data)
    ? parsedResp.data
    : parsedResp.data
      ? [parsedResp.data]
      : [];
  return list;
}

/** DELETE /blog-comments/bulk/delete */
export async function bulkDeleteBlogCommentsRequest(commentIds: string[]): Promise<{ deletedCount: number }> {
  const res = await httpInstance.delete(`/blog-comments/bulk/delete`, { data: { commentIds } });
  const SingleResp = ApiResponseSchema();
  const parsedResp = SingleResp.parse(res.data);
  return parsedResp.data as { deletedCount: number };
}

import instance, { getSuccessResponse } from "../axios";
import { ApiResponseSchema, SavedBlogSchema, SavedBlogsSchema, SavedBlogFilterSchema } from "./schema";
import { SavedBlog, SavedBlogFilter } from "./type";

// API Functions
export const getSavedBlogsRequest = async (filter?: Partial<SavedBlogFilter>): Promise<SavedBlog[]> => {
  const parsed = SavedBlogFilterSchema.parse(filter ?? {});

  const params: Record<string, string | number> = {};
  params.sortBy = parsed.sortBy;
  params.sortOrder = parsed.sortOrder;
  params.page = parsed.page;
  params.limit = parsed.limit;

  const res = await instance.get("/saved-blogs", { params });

  const ListResp = ApiResponseSchema(SavedBlogsSchema);
  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data) ? parsedResp.data : (parsedResp.data ? [parsedResp.data] : []);
  return list;
};

export const getSavedBlogByIdRequest = async (id: string): Promise<SavedBlog> => {
  const res = await instance.get(`/saved-blogs/${id}`);
  const payload = res?.data?.data;
  const raw = Array.isArray(payload) ? payload[0] : payload;
  if (!raw) throw new Error("Saved blog not found");
  return SavedBlogSchema.parse(raw);
};

export const saveBlogRequest = async (blogPostId: string): Promise<SavedBlog> => {
  const response = await instance.post(`/saved-blogs/${blogPostId}`);
  return getSuccessResponse<SavedBlog>(response);
};

export const removeSavedBlogRequest = async (id: string): Promise<void> => {
  await instance.delete(`/saved-blogs/${id}`);
};

export const removeSavedBlogByBlogIdRequest = async (blogPostId: string): Promise<void> => {
  await instance.delete(`/saved-blogs/blog/${blogPostId}`);
};

export const checkBlogSavedRequest = async (blogPostId: string): Promise<{ isSaved: boolean }> => {
  const response = await instance.get(`/saved-blogs/blog/${blogPostId}/check`);
  return response.data.data;
};

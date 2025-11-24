import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getBlogCommentsRequest,
  getBlogCommentByIdRequest,
  getBlogCommentsByPostRequest,
  getBlogCommentsByUserRequest,
  createBlogCommentRequest,
  updateBlogCommentRequest,
  deleteBlogCommentRequest,
  approveBlogCommentRequest,
  rejectBlogCommentRequest,
} from "./request";
import { onMutateError } from "@/lib/utils";
import type {
  BlogComment,
  CreateBlogCommentRequest,
  UpdateBlogCommentRequest,
  BlogCommentFilter,
} from "./type";

export const BlogCommentQueryKey = {
  all: (filter?: BlogCommentFilter) => ["blog-comments", filter ?? {}] as const,
  detail: (id: string) => ["blog-comments", "detail", id] as const,
  byPost: (blogPostId: string, approvedOnly?: boolean) =>
    ["blog-comments", "by-post", blogPostId, { approvedOnly }] as const,
  byUser: (userId: string, approvedOnly?: boolean) =>
    ["blog-comments", "by-user", userId, { approvedOnly }] as const,
};

export const useGetBlogCommentsQuery = (filter?: BlogCommentFilter) =>
  useQuery<BlogComment[]>({
    queryKey: BlogCommentQueryKey.all(filter),
    queryFn: () => getBlogCommentsRequest(filter),
  });

export const useGetBlogCommentByIdQuery = (id?: string) =>
  useQuery<BlogComment>({
    queryKey: BlogCommentQueryKey.detail(id || "unknown"),
    queryFn: () => getBlogCommentByIdRequest(id as string),
    enabled: !!id,
  });

export const useGetBlogCommentsByPostQuery = (
  blogPostId?: string,
  approvedOnly?: boolean
) =>
  useQuery<BlogComment[]>({
    queryKey: BlogCommentQueryKey.byPost(blogPostId || "unknown", approvedOnly),
    queryFn: () =>
      getBlogCommentsByPostRequest(blogPostId as string, approvedOnly),
    enabled: !!blogPostId,
  });

export const useGetBlogCommentsByUserQuery = (
  userId?: string,
  approvedOnly?: boolean
) =>
  useQuery<BlogComment[]>({
    queryKey: BlogCommentQueryKey.byUser(userId || "unknown", approvedOnly),
    queryFn: () => getBlogCommentsByUserRequest(userId as string, approvedOnly),
    enabled: !!userId,
  });

export const useCreateBlogCommentMutation = (
  options?: UseMutationOptions<
    BlogComment,
    Error,
    CreateBlogCommentRequest,
    unknown
  >
) => {
  const qc = useQueryClient();
  return useMutation<BlogComment, Error, CreateBlogCommentRequest>({
    mutationFn: createBlogCommentRequest,
    onSuccess: (created) => {
      if (created.blogPostId) {
        qc.invalidateQueries({
          queryKey: BlogCommentQueryKey.byPost(created.blogPostId),
        });
      }
      qc.setQueryData(BlogCommentQueryKey.detail(created.id), created);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useUpdateBlogCommentMutation = (
  options?: UseMutationOptions<
    BlogComment,
    Error,
    { id: string; data: UpdateBlogCommentRequest },
    unknown
  >
) => {
  const qc = useQueryClient();
  return useMutation<
    BlogComment,
    Error,
    { id: string; data: UpdateBlogCommentRequest }
  >({
    mutationFn: updateBlogCommentRequest,
    onSuccess: (updated) => {
      qc.setQueryData(BlogCommentQueryKey.detail(updated.id), updated);
      if (updated.blogPostId) {
        qc.invalidateQueries({
          queryKey: BlogCommentQueryKey.byPost(updated.blogPostId),
        });
      }
    },
    onError: onMutateError,
    ...options,
  });
};

export const useDeleteBlogCommentMutation = (
  options?: UseMutationOptions<void, Error, string, unknown>
) => {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteBlogCommentRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-comments"] });
    },
    onError: onMutateError,
    ...options,
  });
};

export const useApproveBlogCommentMutation = (
  options?: UseMutationOptions<BlogComment, Error, string, unknown>
) => {
  const qc = useQueryClient();
  return useMutation<BlogComment, Error, string>({
    mutationFn: approveBlogCommentRequest,
    onSuccess: (approved) => {
      qc.setQueryData(BlogCommentQueryKey.detail(approved.id), approved);
      if (approved.blogPostId) {
        qc.invalidateQueries({
          queryKey: BlogCommentQueryKey.byPost(approved.blogPostId),
        });
      }
    },
    onError: onMutateError,
    ...options,
  });
};

export const useRejectBlogCommentMutation = (
  options?: UseMutationOptions<BlogComment, Error, string, unknown>
) => {
  const qc = useQueryClient();
  return useMutation<BlogComment, Error, string>({
    mutationFn: rejectBlogCommentRequest,
    onSuccess: (rejected) => {
      qc.setQueryData(BlogCommentQueryKey.detail(rejected.id), rejected);
      if (rejected.blogPostId) {
        qc.invalidateQueries({
          queryKey: BlogCommentQueryKey.byPost(rejected.blogPostId),
        });
      }
    },
    onError: onMutateError,
    ...options,
  });
};

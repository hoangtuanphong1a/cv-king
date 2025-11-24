import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getBlogPostsRequest,
  getBlogPostByIdRequest,
  getBlogPostBySlugRequest,
  searchBlogPostsByTitleRequest,
  createBlogPostRequest,
  updateBlogPostRequest,
  deleteBlogPostRequest,
  addTagsToBlogPostRequest,
  removeTagFromBlogPostRequest,
  publishBlogPostRequest,
  unpublishBlogPostRequest,
} from "./request";
import { onMutateError } from "@/lib/utils";
import type {
  BlogPost,
  BlogPostWithRelations,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  BlogPostFilter,
} from "./type";

export const BlogPostQueryKey = {
  all: (filter?: BlogPostFilter) => ["blog-posts", filter ?? {}] as const,
  detail: (id: string) => ["blog-posts", "detail", id] as const,
  slug: (slug: string) => ["blog-posts", "slug", slug] as const,
  search: (title: string) => ["blog-posts", "search", title] as const,
};

export const useGetBlogPostsQuery = (filter?: BlogPostFilter) =>
  useQuery<BlogPost[]>({
    queryKey: BlogPostQueryKey.all(filter),
    queryFn: () => getBlogPostsRequest(filter),
  });

export const useGetBlogPostByIdQuery = (id?: string) =>
  useQuery<BlogPostWithRelations>({
    queryKey: BlogPostQueryKey.detail(id || "unknown"),
    queryFn: () => getBlogPostByIdRequest(id as string),
    enabled: !!id,
  });

export const useGetBlogPostBySlugQuery = (slug?: string) =>
  useQuery<BlogPostWithRelations>({
    queryKey: BlogPostQueryKey.slug(slug || "unknown"),
    queryFn: () => getBlogPostBySlugRequest(slug as string),
    enabled: !!slug,
  });

export const useSearchBlogPostsByTitleQuery = (title?: string) =>
  useQuery<BlogPost[]>({
    queryKey: BlogPostQueryKey.search(title || ""),
    queryFn: () => searchBlogPostsByTitleRequest(title as string),
    enabled: !!title,
  });

export const useCreateBlogPostMutation = (
  options?: UseMutationOptions<BlogPost, Error, CreateBlogPostRequest, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<BlogPost, Error, CreateBlogPostRequest>({
    mutationFn: createBlogPostRequest,
    onSuccess: (created) => {
      qc.setQueryData<BlogPost[]>(BlogPostQueryKey.all(), (old) =>
        old ? [...old, created] : [created]
      );
      qc.setQueryData(BlogPostQueryKey.detail(created.id), created);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useUpdateBlogPostMutation = (
  options?: UseMutationOptions<
    BlogPost,
    Error,
    { id: string; data: UpdateBlogPostRequest },
    unknown
  >
) => {
  const qc = useQueryClient();

  return useMutation<
    BlogPost,
    Error,
    { id: string; data: UpdateBlogPostRequest }
  >({
    mutationFn: updateBlogPostRequest,
    onSuccess: (updated) => {
      qc.setQueryData<BlogPost[]>(BlogPostQueryKey.all(), (old) =>
        (old || []).map((c) => (c.id === updated.id ? updated : c))
      );
      qc.setQueryData(BlogPostQueryKey.detail(updated.id), updated);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useDeleteBlogPostMutation = (
  options?: UseMutationOptions<void, Error, string, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteBlogPostRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
    onError: onMutateError,
    ...options,
  });
};

export const useAddTagsToBlogPostMutation = (
  options?: UseMutationOptions<
    void,
    Error,
    { id: string; tagIds: string[] },
    unknown
  >
) => {
  const qc = useQueryClient();

  return useMutation<void, Error, { id: string; tagIds: string[] }>({
    mutationFn: ({ id, tagIds }) => addTagsToBlogPostRequest(id, tagIds),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: BlogPostQueryKey.detail(id) });
    },
    onError: onMutateError,
    ...options,
  });
};

export const useRemoveTagFromBlogPostMutation = (
  options?: UseMutationOptions<
    void,
    Error,
    { id: string; tagId: string },
    unknown
  >
) => {
  const qc = useQueryClient();

  return useMutation<void, Error, { id: string; tagId: string }>({
    mutationFn: ({ id, tagId }) => removeTagFromBlogPostRequest(id, tagId),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: BlogPostQueryKey.detail(id) });
    },
    onError: onMutateError,
    ...options,
  });
};

export const usePublishBlogPostMutation = (
  options?: UseMutationOptions<BlogPost, Error, string, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<BlogPost, Error, string>({
    mutationFn: publishBlogPostRequest,
    onSuccess: (updated, id) => {
      qc.setQueryData(BlogPostQueryKey.detail(id), updated);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useUnpublishBlogPostMutation = (
  options?: UseMutationOptions<BlogPost, Error, string, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<BlogPost, Error, string>({
    mutationFn: unpublishBlogPostRequest,
    onSuccess: (updated, id) => {
      qc.setQueryData(BlogPostQueryKey.detail(id), updated);
    },
    onError: onMutateError,
    ...options,
  });
};

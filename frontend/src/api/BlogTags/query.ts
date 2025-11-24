import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getBlogTagsRequest,
  getBlogTagByIdRequest,
  searchBlogTagsByNameRequest,
  createBlogTagRequest,
  updateBlogTagRequest,
  deleteBlogTagRequest,
} from "./request";
import { onMutateError } from "@/lib/utils";
import type {
  BlogTag,
  CreateBlogTagRequest,
  UpdateBlogTagRequest,
} from "./type";

export const BlogTagQueryKey = {
  all: ["blog-tags"] as const,
  detail: (id: string) => ["blog-tags", "detail", id] as const,
  search: (name: string) => ["blog-tags", "search", name] as const,
};

export const useGetBlogTagsQuery = () =>
  useQuery<BlogTag[]>({
    queryKey: BlogTagQueryKey.all,
    queryFn: getBlogTagsRequest,
  });

export const useGetBlogTagByIdQuery = (id?: string) =>
  useQuery<BlogTag>({
    queryKey: BlogTagQueryKey.detail(id || "unknown"),
    queryFn: () => getBlogTagByIdRequest(id as string),
    enabled: !!id,
  });

export const useSearchBlogTagsByNameQuery = (name?: string) =>
  useQuery<BlogTag[]>({
    queryKey: BlogTagQueryKey.search(name || ""),
    queryFn: () => searchBlogTagsByNameRequest(name as string),
    enabled: !!name,
  });

export const useCreateBlogTagMutation = (
  options?: UseMutationOptions<
    BlogTag,
    Error,
    CreateBlogTagRequest,
    unknown
  >
) => {
  const qc = useQueryClient();
  return useMutation<BlogTag, Error, CreateBlogTagRequest>({
    mutationFn: createBlogTagRequest,
    onSuccess: (created) => {
      qc.setQueryData<BlogTag[]>(BlogTagQueryKey.all, (old) =>
        old ? [...old, created] : [created]
      );
      qc.setQueryData(BlogTagQueryKey.detail(created.id), created);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useUpdateBlogTagMutation = (
  options?: UseMutationOptions<
    BlogTag,
    Error,
    { id: string; data: UpdateBlogTagRequest },
    unknown
  >
) => {
  const qc = useQueryClient();
  return useMutation<
    BlogTag,
    Error,
    { id: string; data: UpdateBlogTagRequest }
  >({
    mutationFn: updateBlogTagRequest,
    onSuccess: (updated) => {
      qc.setQueryData<BlogTag[]>(BlogTagQueryKey.all, (old) =>
        (old || []).map((c) => (c.id === updated.id ? updated : c))
      );
      qc.setQueryData(BlogTagQueryKey.detail(updated.id), updated);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useDeleteBlogTagMutation = (
  options?: UseMutationOptions<void, Error, string, unknown>
) => {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteBlogTagRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-tags"] });
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
    onError: onMutateError,
    ...options,
  });
};

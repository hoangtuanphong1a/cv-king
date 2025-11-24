import {
  type UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { SavedBlog, SavedBlogFilter } from './type';
import { getSavedBlogsRequest, getSavedBlogByIdRequest, saveBlogRequest, removeSavedBlogRequest, removeSavedBlogByBlogIdRequest, checkBlogSavedRequest } from './request';
import { onMutateError } from '@/lib/utils';

export const SavedBlogQueryKey = {
  all: (filter?: Partial<SavedBlogFilter>) => ["saved-blogs", filter ?? {}] as const,
  detail: (id: string) => ["saved-blogs", "detail", id] as const,
  check: (blogPostId: string) => ["saved-blogs", "check", blogPostId] as const,
};

export const useSavedBlogsQuery = (filter?: Partial<SavedBlogFilter>) =>
  useQuery<SavedBlog[]>({
    queryKey: SavedBlogQueryKey.all(filter),
    queryFn: () => getSavedBlogsRequest(filter),
  });

export const useSavedBlogByIdQuery = (id?: string) =>
  useQuery<SavedBlog>({
    queryKey: SavedBlogQueryKey.detail(id || "unknown"),
    queryFn: () => getSavedBlogByIdRequest(id as string),
    enabled: !!id,
  });

export const useCheckBlogSavedQuery = (blogPostId?: string) =>
  useQuery<{ isSaved: boolean }>({
    queryKey: SavedBlogQueryKey.check(blogPostId || "unknown"),
    queryFn: () => checkBlogSavedRequest(blogPostId as string),
    enabled: !!blogPostId,
  });

export const useSaveBlogMutation = (options?: UseMutationOptions<SavedBlog, Error, string, unknown>) =>
  useMutation({
    mutationFn: saveBlogRequest,
    onError: onMutateError,
    ...options,
  });

export const useRemoveSavedBlogMutation = (options?: UseMutationOptions<void, Error, string, unknown>) =>
  useMutation({
    mutationFn: removeSavedBlogRequest,
    onError: onMutateError,
    ...options,
  });

export const useRemoveSavedBlogByBlogIdMutation = (options?: UseMutationOptions<void, Error, string, unknown>) =>
  useMutation({
    mutationFn: removeSavedBlogByBlogIdRequest,
    onError: onMutateError,
    ...options,
  });

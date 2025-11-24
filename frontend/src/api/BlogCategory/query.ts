import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBlogCategoriesRequest,
  getBlogCategoryByIdRequest,
  searchBlogCategoriesByNameRequest,
  createBlogCategoryRequest,
  updateBlogCategoryRequest,
  deleteBlogCategoryRequest,
} from "./request";
import type { UpdateBlogCategoryRequest } from "./type";

export const blogCategoriesKeys = {
  all: ["blogCategories"] as const,
  lists: () => [...blogCategoriesKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) => [...blogCategoriesKeys.lists(), filters] as const,
  details: () => [...blogCategoriesKeys.all, "detail"] as const,
  detail: (id: string) => [...blogCategoriesKeys.details(), id] as const,
  search: (name: string) => [...blogCategoriesKeys.all, "search", name] as const,
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: blogCategoriesKeys.list(),
    queryFn: getBlogCategoriesRequest,
  });
};

export const useBlogCategory = (id: string) => {
  return useQuery({
    queryKey: blogCategoriesKeys.detail(id),
    queryFn: () => getBlogCategoryByIdRequest(id),
    enabled: !!id,
  });
};

export const useSearchBlogCategories = (name: string) => {
  return useQuery({
    queryKey: blogCategoriesKeys.search(name),
    queryFn: () => searchBlogCategoriesByNameRequest(name),
    enabled: !!name,
  });
};

export const useCreateBlogCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlogCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogCategoriesKeys.lists() });
    },
  });
};

export const useUpdateBlogCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: string; data: UpdateBlogCategoryRequest }) =>
      updateBlogCategoryRequest(params),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: blogCategoriesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogCategoriesKeys.detail(id) });
    },
  });
};

export const useDeleteBlogCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogCategoriesKeys.lists() });
    },
  });
};

import { useMutation, useQuery, type UseMutationOptions } from "@tanstack/react-query";
import {
  getJobCategoriesRequest,
  getJobCategoryByIdRequest,
  createJobCategoryRequest,
  updateJobCategoryRequest,
  deleteJobCategoryRequest,
} from "./request";
import { onMutateError } from "@/lib/utils";
import type {
  JobCategory,
  JobCategoryCreateRequest,
  JobCategoryUpdateRequest,
} from "./type";

export const JobCategoryQueryKey = {
  all: ["job-categories"] as const,
  detail: (id: string) => ["job-categories", "detail", id] as const,
};

// QUERIES
export const useJobCategoriesQuery = () =>
  useQuery<JobCategory[]>({
    queryKey: JobCategoryQueryKey.all,
    queryFn: getJobCategoriesRequest,
  });

export const useJobCategoryByIdQuery = (id?: string) =>
  useQuery<JobCategory>({
    queryKey: JobCategoryQueryKey.detail(id || "unknown"),
    queryFn: () => getJobCategoryByIdRequest(id as string),
    enabled: !!id,
  });

// MUTATIONS (Order style, KHÔNG dùng useQueryClient)
export const useCreateJobCategoryMutation = (
  options?: UseMutationOptions<JobCategory, Error, JobCategoryCreateRequest, unknown>
) =>
  useMutation({
    mutationFn: createJobCategoryRequest,
    onError: onMutateError,
    ...options, // nếu cần invalidate list, truyền onSuccess ở nơi gọi
  });

export const useUpdateJobCategoryMutation = (
  options?: UseMutationOptions<JobCategory, Error, JobCategoryUpdateRequest, unknown>
) =>
  useMutation({
    mutationFn: updateJobCategoryRequest,
    onError: onMutateError,
    ...options, // nếu cần invalidate, truyền onSuccess ở nơi gọi
  });

export const useDeleteJobCategoryMutation = (
  options?: UseMutationOptions<void, Error, string, unknown>
) =>
  useMutation({
    mutationFn: deleteJobCategoryRequest,
    onError: onMutateError,
    ...options,
  });

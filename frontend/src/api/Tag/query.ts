// @/api/job-tags/query.ts
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  getJobTagsRequest,
  getJobTagByIdRequest,
  createJobTagRequest,
  updateJobTagRequest,
  deleteJobTagRequest,
} from "./request";
import { onMutateError } from "@/lib/utils";
import type { JobTag, JobTagCreateRequest, JobTagUpdateRequest } from "./type";

export const JobTagQueryKey = {
  all: ["job-tags"] as const,
  detail: (id: string) => ["job-tags", "detail", id] as const,
};

// QUERIES
export const useJobTagsQuery = () =>
  useQuery<JobTag[]>({
    queryKey: JobTagQueryKey.all,
    queryFn: getJobTagsRequest,
  });

export const useJobTagByIdQuery = (id?: string) =>
  useQuery<JobTag>({
    queryKey: JobTagQueryKey.detail(id || "unknown"),
    queryFn: () => getJobTagByIdRequest(id as string),
    enabled: !!id,
  });


export const useCreateJobTagMutation = (
  options?: UseMutationOptions<JobTag, Error, JobTagCreateRequest, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<JobTag, Error, JobTagCreateRequest>({
    mutationFn: createJobTagRequest,
    onSuccess: (created) => {
      qc.setQueryData<JobTag[]>(JobTagQueryKey.all, (old) =>
        old ? [...old, created] : [created]
      );
      qc.setQueryData(JobTagQueryKey.detail(created.id), created);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useUpdateJobTagMutation = (
  options?: UseMutationOptions<JobTag, Error, JobTagUpdateRequest, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<JobTag, Error, JobTagUpdateRequest>({
    mutationFn: updateJobTagRequest,
    onSuccess: (updated) => {
      qc.setQueryData<JobTag[]>(JobTagQueryKey.all, (old) =>
        (old || []).map((t) => (t.id === updated.id ? updated : t))
      );
      qc.setQueryData(JobTagQueryKey.detail(updated.id), updated);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useDeleteJobTagMutation = (
  options?: UseMutationOptions<void, Error, string, unknown>
) =>
  useMutation({
    mutationFn: deleteJobTagRequest,
    onError: onMutateError,
    ...options,
  });

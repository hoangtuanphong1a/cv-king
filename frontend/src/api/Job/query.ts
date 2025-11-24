
import {
  type UseMutationOptions,
//   type UseQueryOptions,
  useMutation,
  useQuery,
//   useQuery,
//   useQueryClient,
} from '@tanstack/react-query';
import { CreateJobFormData, Job, JobApiResponse, JobFilter } from './type';
import { createJobRequest, getJobByIdRequest, getJobsRequest } from './request';
import { onMutateError } from '@/lib/utils';

export const JobQueryKey = {
  all: (filter?: Partial<JobFilter>) => ["jobs", filter ?? {}] as const,
  detail: (id: string) => ["jobs", "detail", id] as const,
};

export const useCreateJobMutation = (options?: UseMutationOptions<JobApiResponse, Error, CreateJobFormData, unknown>) =>
  useMutation({
    mutationFn: createJobRequest,
    onError: onMutateError,
    ...options,
  });

  export const useJobsQuery = (filter?: Partial<JobFilter>) =>
  useQuery<Job[]>({
    queryKey: JobQueryKey.all(filter),
    queryFn: () => getJobsRequest(filter),
  });


/* ===== Find One ===== */
export const useJobByIdQuery = (id?: string) =>
  useQuery<Job>({
    queryKey: JobQueryKey.detail(id || "unknown"),
    queryFn: () => getJobByIdRequest(id as string),
    enabled: !!id,
  });
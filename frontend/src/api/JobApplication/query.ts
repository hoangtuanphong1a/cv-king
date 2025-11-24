import {
    useQuery,
    useMutation,
    useQueryClient,
    type UseMutationOptions,
} from "@tanstack/react-query";
import {
    getJobApplicationsRequest,
    getJobApplicationByIdRequest,
    createJobApplicationRequest,
    updateJobApplicationRequest,
    deleteJobApplicationRequest,
    getJobApplicationsByJobSeekerIdRequest,
    getApplicationsByCompanyIdRequest,
} from "./request";
import { onMutateError } from "@/lib/utils";
import type {
    JobApplicationResponse,
    JobApplicationCreateRequest,
    JobApplicationUpdateRequest,
} from "./type";

export const JobApplicationQueryKey = {
    all: ["job-applications"] as const,
    detail: (id: string) => ["job-applications", "detail", id] as const,
    byJobSeeker: (jobSeekerId: string) =>
        ["job-applications", "by-jobseeker", jobSeekerId] as const,
};

/** QUERIES */
export const useJobApplicationsQuery = () =>
    useQuery<JobApplicationResponse[]>({
        queryKey: JobApplicationQueryKey.all,
        queryFn: getJobApplicationsRequest,
    });

export const useJobApplicationByIdQuery = (id?: string) =>
    useQuery<JobApplicationResponse>({
        queryKey: JobApplicationQueryKey.detail(id || "unknown"),
        queryFn: () => getJobApplicationByIdRequest(id as string),
        enabled: !!id,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

export const useJobApplicationsByJobSeekerQuery = (jobSeekerId?: string) =>
    useQuery<JobApplicationResponse[]>({
        queryKey: JobApplicationQueryKey.byJobSeeker(jobSeekerId || "unknown"),
        queryFn: () => getJobApplicationsByJobSeekerIdRequest(jobSeekerId as string),
        enabled: !!jobSeekerId,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

export const useJobApplicationsByCompanyQuery = (companyId?: string) =>
    useQuery({
        queryKey: ['job-applications', 'company', companyId ?? 'none'],
        queryFn: async () => {
            if (!companyId) return [];
            const data = await getApplicationsByCompanyIdRequest(companyId);
            console.log(" Data returned to React Query:", data);
            return data;
        },
        enabled: !!companyId,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: 0,
        gcTime: 0,
    });

/** MUTATIONS */
export const useCreateJobApplicationMutation = (
    options?: UseMutationOptions<JobApplicationResponse, Error, JobApplicationCreateRequest, unknown>
) => {
    const qc = useQueryClient();

    return useMutation<JobApplicationResponse, Error, JobApplicationCreateRequest>({
        mutationFn: createJobApplicationRequest,
        onSuccess: (created) => {
            qc.setQueryData<JobApplicationResponse[]>(JobApplicationQueryKey.all, (old) =>
                old ? [...old, created] : [created]
            );
            qc.setQueryData(JobApplicationQueryKey.detail(created.id), created);
        },
        onError: onMutateError,
        ...options,
    });
};

export const useUpdateJobApplicationMutation = (
    options?: UseMutationOptions<JobApplicationResponse, Error, JobApplicationUpdateRequest, unknown>
) => {
    const qc = useQueryClient();

    return useMutation<JobApplicationResponse, Error, JobApplicationUpdateRequest>({
        mutationFn: updateJobApplicationRequest,
        onSuccess: (updated) => {
            qc.setQueryData<JobApplicationResponse[]>(JobApplicationQueryKey.all, (old) =>
                (old || []).map((a) => (a.id === updated.id ? updated : a))
            );
            qc.setQueryData(JobApplicationQueryKey.detail(updated.id), updated);
        },
        onError: onMutateError,
        ...options,
    });
};

export const useDeleteJobApplicationMutation = (
    options?: UseMutationOptions<void, Error, string, unknown>
) =>
    useMutation({
        mutationFn: deleteJobApplicationRequest,
        onError: onMutateError,
        ...options,
    });

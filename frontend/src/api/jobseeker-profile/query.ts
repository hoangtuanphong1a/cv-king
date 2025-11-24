import {
    useQuery,
    useMutation,
    useQueryClient,
    type UseMutationOptions,
} from "@tanstack/react-query";
import {
    getJobSeekerProfilesRequest,
    getJobSeekerProfileByIdRequest,
    createJobSeekerProfileRequest,
    updateJobSeekerProfileRequest,
    deleteJobSeekerProfileRequest,
    getJobSeekerProfileByUserIdRequest,
} from "./request";
import {
    JobSeekerProfileResponse,
    JobSeekerProfileCreateRequest,
    JobSeekerProfileUpdateRequest,
} from "./type";
import { onMutateError } from "@/lib/utils";

export const JobSeekerProfileQueryKey = {
    all: ["job-seeker-profiles"] as const,
    detail: (id: string) => ["job-seeker-profiles", "detail", id] as const,
};

/** QUERIES */
export const useJobSeekerProfilesQuery = () =>
    useQuery<JobSeekerProfileResponse[]>({
        queryKey: JobSeekerProfileQueryKey.all,
        queryFn: getJobSeekerProfilesRequest,
    });

export const useJobSeekerProfileByIdQuery = (id?: string) =>
    useQuery<JobSeekerProfileResponse>({
        queryKey: JobSeekerProfileQueryKey.detail(id || "unknown"),
        queryFn: () => getJobSeekerProfileByIdRequest(id as string),
        enabled: !!id,
    });

export const useJobSeekerProfileByUserIdQuery = (userId?: string) =>
    useQuery<JobSeekerProfileResponse>({
        queryKey: JobSeekerProfileQueryKey.detail(userId || "unknown"),
        queryFn: () => getJobSeekerProfileByUserIdRequest(userId as string),
        enabled: !!userId,
    });


/** MUTATIONS */
export const useCreateJobSeekerProfileMutation = (
    options?: UseMutationOptions<JobSeekerProfileResponse, Error, JobSeekerProfileCreateRequest, unknown>
) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createJobSeekerProfileRequest,
        onSuccess: (created) => {
            qc.invalidateQueries({ queryKey: JobSeekerProfileQueryKey.all });
            qc.setQueryData(JobSeekerProfileQueryKey.detail(created.id), created);
        },
        onError: onMutateError,
        ...options,
    });
};

export const useUpdateJobSeekerProfileMutation = (
    options?: UseMutationOptions<JobSeekerProfileResponse, Error, JobSeekerProfileUpdateRequest, unknown>
) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: updateJobSeekerProfileRequest,
        onSuccess: (updated) => {
            qc.invalidateQueries({ queryKey: JobSeekerProfileQueryKey.all });
            qc.setQueryData(JobSeekerProfileQueryKey.detail(updated.id), updated);
        },
        onError: onMutateError,
        ...options,
    });
};

export const useDeleteJobSeekerProfileMutation = (
    options?: UseMutationOptions<void, Error, string, unknown>
) =>
    useMutation({
        mutationFn: deleteJobSeekerProfileRequest,
        onError: onMutateError,
        ...options,
    });

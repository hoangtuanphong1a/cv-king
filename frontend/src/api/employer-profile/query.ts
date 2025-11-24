
import { useQuery, useMutation, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import {
    getEmployerProfileRequest,
    getEmployerProfileByIdRequest,
    createEmployerProfileRequest,
    updateEmployerProfileRequest,
    deleteEmployerProfileRequest,
    UpdateEmployerCompanyRequest,
    getEmployerProfileByUserIdRequest,
} from './request';
import type {
    EmployerProfileResponse,
    EmployerProfileListResponse,
    CreateEmployerProfileRequest,
    UpdateEmployerProfileRequest,
    UpdateEmployerAndCompanyRequest,
} from './type';

export const useEmployerProfilesQuery = (
    options?: UseQueryOptions<EmployerProfileListResponse, Error>
) =>
    useQuery<EmployerProfileListResponse, Error>({
        queryKey: ['employer-profiles'],
        queryFn: getEmployerProfileRequest,
        ...options,
    });

export const useEmployerProfileByIdQuery = (
    id: string | undefined,
    options?: UseQueryOptions<EmployerProfileResponse, Error>
) =>
    useQuery({
        queryKey: ['employer-profiles', id],
        queryFn: () => getEmployerProfileByIdRequest(id as string),
        enabled: !!id,
        ...options,
    });


export const useEmployerProfileByUserIdQuery = (
    userId: string | undefined,
    options?: UseQueryOptions<EmployerProfileResponse, Error>
) =>
    useQuery<EmployerProfileResponse, Error>({
        queryKey: ['employer-profile-by-user', userId],
        queryFn: () => getEmployerProfileByUserIdRequest(userId as string),
        enabled: !!userId,
        ...options,
    });
    
export const useCreateEmployerProfileMutation = (
    options?: UseMutationOptions<EmployerProfileResponse, Error, CreateEmployerProfileRequest>
) =>
    useMutation({
        mutationFn: (payload) => createEmployerProfileRequest(payload),
        ...options,
    });

export const useUpdateEmployerProfileMutation = (
    options?: UseMutationOptions<EmployerProfileResponse, Error, { id: string; data: UpdateEmployerProfileRequest }>
) =>
    useMutation({
        mutationFn: ({ id, data }) => updateEmployerProfileRequest(id, data),
        ...options,
    });


export const useUpdateEmployerAndCompanyMutation = (
    options?: UseMutationOptions<EmployerProfileResponse, Error, { id: string, data: UpdateEmployerAndCompanyRequest }>
) =>
    useMutation({
        mutationFn: ({ id, data }) => UpdateEmployerCompanyRequest(id, data),
        ...options,
    });

export const useDeleteEmployerProfileMutation = (
    options?: UseMutationOptions<null | { success: boolean }, Error, { id: string }>
) =>
    useMutation({
        mutationFn: ({ id }) => deleteEmployerProfileRequest(id),
        ...options,
    });

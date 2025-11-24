import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UpdateUser, UserResponse, UsersListQuery, UsersListResponse } from "../user/type";
import {
  getUserByIdRequest,
    getUsersRequest,
    updateUserRequest,
    deleteUserRequest,
} from './request';

export const useUsersQuery = (
  params?: UsersListQuery,
  options?: UseQueryOptions<UsersListResponse, Error>
) =>
  useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsersRequest(params),
    ...options,
  });

export const useUserByIdQuery = (
    id: string | undefined,
    options?: UseQueryOptions<UserResponse, Error>
) =>
    useQuery({
        queryKey: ['users', id],
        queryFn: () => getUserByIdRequest(id as string),
        enabled: !!id,
        ...options,
    });

export const useUpdateUserMutation = (
    options?: UseMutationOptions<UserResponse, Error, UpdateUser, unknown>
) =>
    useMutation({
        mutationFn: (id: UpdateUser) => updateUserRequest(id),
        ...options,
    });

export const useDeleteUserMutation = (
  options?: UseMutationOptions<null | { success: boolean }, Error, { id: string }, unknown>
) =>
  useMutation({
    mutationFn: ({ id }) => deleteUserRequest(id),
    ...options,
  });

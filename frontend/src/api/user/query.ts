// import { useAuthStore } from '@/stores/authStore';
// import { type UseMutationOptions, useMutation, useQuery } from '@tanstack/react-query';
// import {
//   createUserRequest,
//   deleteUserRequest,
//   getCurrentUserRequest,
//   // getLocationRequest,
//   getUserByIdRequest,
//   getUsersRequest,
//   updateUserRequest,
//   uploadAvatarRequest,
// } from './request';
// import type { UserCreateInput, UserFilter, UserIdParam, UserResponseData, UserUpdateInput } from './type';

// export enum UserQueryKey {
//   USERS = 'users',
//   CURRENT_USER = 'current_user',
//   USER_BY_ID = 'user_by_id',
// }

// export const useUsersQuery = (filter?: UserFilter) => {
//   return useQuery({
//     queryKey: [UserQueryKey.USERS, filter],
//     queryFn: () => getUsersRequest(filter),
//   });
// };

// // export const useLocationUserQuery = () => {
// //   return useQuery({
// //     queryKey: [UserQueryKey.USER_LOCATION],
// //     queryFn: getLocationRequest,
// //   });
// // };

// export const useCurrentUserQuery = () => {
//   const { token, refreshToken } = useAuthStore();
//   return useQuery({
//     queryKey: [UserQueryKey.CURRENT_USER],
//     queryFn: getCurrentUserRequest,
//     enabled: !!token && !!refreshToken,
//   });
// };

// export const useUserByIdQuery = ({ userId }: UserIdParam) => {
//   return useQuery({
//     queryKey: [UserQueryKey.USER_BY_ID, userId],
//     queryFn: () => getUserByIdRequest({ userId }),
//   });
// };

// export const useCreateUserMutation = (options?: UseMutationOptions<UserResponseData, Error, UserCreateInput>) => {
//   return useMutation({
//     mutationFn: (params: UserCreateInput) => createUserRequest(params),
//     ...options,
//   });
// };

// export const useUpdateUserMutation = (
//   options?: UseMutationOptions<UserResponseData, Error, UserIdParam & Partial<UserUpdateInput>>
// ) => {
//   return useMutation({
//     mutationFn: (params: UserIdParam & Partial<UserUpdateInput>) => updateUserRequest(params),
//     ...options,
//   });
// };

// export const useDeleteUserMutation = (options?: UseMutationOptions<UserResponseData, Error, UserIdParam>) => {
//   return useMutation({
//     mutationFn: (params: UserIdParam) => deleteUserRequest(params),
//     ...options,
//   });
// };

// export const useUploadAvatarMutation = (
//   options?: UseMutationOptions<UserResponseData, Error, UserIdParam & { file: File }>
// ) => {
//   return useMutation({
//     mutationFn: (params: UserIdParam & { file: File }) => uploadAvatarRequest(params),
//     ...options,
//   });
// };
import { useQuery, useMutation, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import {
  createUserRequest,
  deleteUserRequest,
  getMyProfileRequest,
  getUserByIdRequest,
  getUsersRequest,
  updateUserRequest,
} from './request';
import type { CreateUser, UpdateUser, UserResponse, UsersListQuery, UsersListResponse } from './type';

// Queries
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

export const useMyProfileQuery = (
  options?: UseQueryOptions<UserResponse, Error>
) =>
  useQuery({
    queryKey: ['users', 'my-profile'],
    queryFn: () => getMyProfileRequest(),
    ...options,
  });

// Mutations
export const useCreateUserMutation = (
  options?: UseMutationOptions<UserResponse, Error, CreateUser, unknown>
) =>
  useMutation({
    mutationFn: (payload: CreateUser) => createUserRequest(payload),
    ...options,
  });

export const useUpdateUserMutation = (
  options?: UseMutationOptions<UserResponse, Error, UpdateUser, unknown>
) =>
  useMutation({
    mutationFn: (data: UpdateUser) => updateUserRequest(data),
    ...options,
  });

export const useDeleteUserMutation = (
  options?: UseMutationOptions<null | { success: boolean }, Error, { id: string }, unknown>
) =>
  useMutation({
    mutationFn: ({ id }) => deleteUserRequest(id),
    ...options,
  });

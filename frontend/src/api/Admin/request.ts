// import { AxiosResponse } from "axios";

import instance, { getSuccessResponse } from "@/api/axios";
import { JobTag, JobTagCreateRequest, JobTagUpdateRequest } from "../Tag/type";
import { UpdateUser, UserResponse, UsersListQuery, UsersListResponse } from "../user/type";
import z from "zod";
import { JobTagCreateRequestSchema, JobTagSchema, JobTagUpdateRequestSchema } from "../Tag/schema";
import { EmployerProfileResponse, UpdateEmployerAndCompanyRequest } from "../employer-profile/type";

export const getUsersRequest = async (params?: UsersListQuery) => {
  const response = await instance.get('/users', { params });
  return getSuccessResponse<UsersListResponse>(response);
};

export const getUserByIdRequest = async (id: string) => {
    const response = await instance.get(`/users/${id}`);
    return getSuccessResponse<UserResponse>(response);
};

export const updateUserRequest = async (id: UpdateUser) => {
    const response = await instance.put(`/users/${id}`);
    return getSuccessResponse<UserResponse>(response);
};

export const deleteUserRequest = async (id: string) => {
  const response = await instance.delete(`/users/${id}`);
  return getSuccessResponse<null | { success: boolean }>(response);
};

export async function getJobTagsRequest(): Promise<JobTag[]> {
    const res = await instance.get("/job-tags");
    // API của bạn trả ApiResponse<T>; helper này trả về .data (T)
    const data = getSuccessResponse<JobTag[]>(res);
    // validate shape trả về (key thường)
    return z.array(JobTagSchema).parse(data);
}

export async function getJobTagByIdRequest(id: string): Promise<JobTag> {
  const res = await instance.get(`/job-tags/${id}`);
  const data = getSuccessResponse<JobTag>(res);
  return JobTagSchema.parse(data);
}

export async function createJobTagRequest(input: JobTagCreateRequest): Promise<JobTag> {
    // Inline map + validate body (không cần helper riêng)
    const body = JobTagCreateRequestSchema.parse({ Name: input.Name });
    const res = await instance.post("/job-tags", body);
    const data = getSuccessResponse<JobTag>(res);
    return JobTagSchema.parse(data);
}

export async function updateJobTagRequest(input: JobTagUpdateRequest): Promise<JobTag> {
    const body = JobTagUpdateRequestSchema.parse({ Id: input.Id, Name: input.Name });
    const res = await instance.put("/job-tags", body);
    const data = getSuccessResponse<JobTag>(res);
    return JobTagSchema.parse(data);
}

export async function deleteJobTagRequest(id: string): Promise<void> {
    await instance.delete(`/job-tags/${id}`);
}

export const getEmployerProfileRequest = async () => {
    const res = await instance.get(`/employer-profiles`);
    const data = getSuccessResponse<EmployerProfileResponse[]>(res);
    return { items: data };
};

export const UpdateEmployerCompanyRequest = async (
    id: string,
    data: UpdateEmployerAndCompanyRequest
) => {
    const res = await instance.put(`/employer-profiles/${id}`, data);
    return getSuccessResponse<EmployerProfileResponse>(res);
}

export const deleteEmployerProfileRequest = async (id: string) => {
    const res = await instance.delete(`/employer-profiles/${id}`);
    return getSuccessResponse<null | { success: boolean }>(res);
};


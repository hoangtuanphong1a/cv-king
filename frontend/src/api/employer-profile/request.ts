import instance, { getSuccessResponse } from "../axios"
import { CreateEmployerProfileRequest, EmployerProfileResponse, UpdateEmployerAndCompanyRequest, UpdateEmployerProfileRequest } from "./type";

export const getEmployerProfileRequest = async () => {
    const res = await instance.get(`/employer-profiles`);
    const data = getSuccessResponse<EmployerProfileResponse[]>(res);
    return { items: data };
};

export const getEmployerProfileByIdRequest = async (id: string) => {
    const res = await instance.get(`/employer-profiles/${id}`);
    return getSuccessResponse<EmployerProfileResponse>(res);
};

export const getEmployerProfileByUserIdRequest = async (userId: string) => {
    const res = await instance.get(`/employer-profiles/by-user/${userId}`);
    return getSuccessResponse<EmployerProfileResponse>(res);
};

export const createEmployerProfileRequest = async (data: CreateEmployerProfileRequest) => {
    const res = await instance.post('/employer-profiles', data);
    return getSuccessResponse<EmployerProfileResponse>(res);
};

export const updateEmployerProfileRequest = async (
    id: string,
    data: UpdateEmployerProfileRequest
) => {
    const res = await instance.put(`/employer-profiles/${id}`, data);
    return getSuccessResponse<EmployerProfileResponse>(res);
};

export const UpdateEmployerCompanyRequest = async (
    id: string,
    data: UpdateEmployerAndCompanyRequest
) => {
    const res = await instance.put(`/employer-profiles/${id}/edit-company`, data);
    return getSuccessResponse<EmployerProfileResponse>(res);
}

export const deleteEmployerProfileRequest = async (id: string) => {
    const res = await instance.delete(`/employer-profiles/${id}`);
    return getSuccessResponse<null | { success: boolean }>(res);
};
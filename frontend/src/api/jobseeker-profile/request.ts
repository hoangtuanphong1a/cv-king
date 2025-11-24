import z from "zod";
import httpInstance, { getSuccessResponse } from "@/api/axios";
import {
    JobSeekerProfileSchema,
    JobSeekerProfileCreateRequestSchema,
    JobSeekerProfileUpdateRequestSchema,
} from "./schema";
import {
    JobSeekerProfileResponse,
    JobSeekerProfileCreateRequest,
    JobSeekerProfileUpdateRequest,
} from "./type";

// ✅ Lấy tất cả JobSeekerProfiles
export async function getJobSeekerProfilesRequest(): Promise<JobSeekerProfileResponse[]> {
    const res = await httpInstance.get(`/job-seeker-profiles`);
    const data = getSuccessResponse<JobSeekerProfileResponse[]>(res);
    return z.array(JobSeekerProfileSchema).parse(data);
}

// ✅ Lấy 1 JobSeekerProfile theo ID
export async function getJobSeekerProfileByIdRequest(id: string): Promise<JobSeekerProfileResponse> {
    const res = await httpInstance.get(`/job-seeker-profiles/${id}`);
    const data = getSuccessResponse<JobSeekerProfileResponse>(res);
    return JobSeekerProfileSchema.parse(data);
}
export async function getJobSeekerProfileByUserIdRequest(userId: string) {
    const res = await httpInstance.get(`/job-seeker-profiles/by-user/${userId}`);
    const data = getSuccessResponse<JobSeekerProfileResponse>(res);
    return JobSeekerProfileSchema.parse(data);
}

// ✅ Tạo JobSeekerProfile
export async function createJobSeekerProfileRequest(
    input: JobSeekerProfileCreateRequest
): Promise<JobSeekerProfileResponse> {
    const body = JobSeekerProfileCreateRequestSchema.parse(input);
    const res = await httpInstance.post(`/job-seeker-profiles`, body);
    const data = getSuccessResponse<JobSeekerProfileResponse>(res);
    return JobSeekerProfileSchema.parse(data);
}

// ✅ Cập nhật JobSeekerProfile
export async function updateJobSeekerProfileRequest(
    input: JobSeekerProfileUpdateRequest
): Promise<JobSeekerProfileResponse> {
    const body = JobSeekerProfileUpdateRequestSchema.parse(input);
    const res = await httpInstance.put(`/job-seeker-profiles/${input.id}`, body);
    const data = getSuccessResponse<JobSeekerProfileResponse>(res);
    return JobSeekerProfileSchema.parse(data);
}

// ✅ Xóa JobSeekerProfile
export async function deleteJobSeekerProfileRequest(id: string): Promise<void> {
    await httpInstance.delete(`/job-seeker-profiles/${id}`);
}

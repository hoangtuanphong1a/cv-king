import z from "zod";
import {
    JobApplicationCreateRequest,
    JobApplicationResponse,
    JobApplicationUpdateRequest,
} from "./type";
import httpInstance, { getSuccessResponse } from "@/api/axios";
import {
    JobApplicationCreateRequestSchema,
    JobApplicationResponseSchema,
    JobApplicationUpdateRequestSchema,
} from "./schema";

export async function getJobApplicationsRequest(): Promise<JobApplicationResponse[]> {
    const res = await httpInstance.get(`/job-applications`);
    const data = getSuccessResponse<JobApplicationResponse[]>(res);
    return z.array(JobApplicationResponseSchema).parse(data);
}

export async function getJobApplicationByIdRequest(
    id: string
): Promise<JobApplicationResponse> {
    const res = await httpInstance.get(`/job-applications/${id}`);
    const data = getSuccessResponse<JobApplicationResponse>(res);
    return JobApplicationResponseSchema.parse(data);
}

export async function getJobApplicationsByJobSeekerIdRequest(
    jobSeekerId: string
): Promise<JobApplicationResponse[]> {
    const res = await httpInstance.get(`/job-applications/jobSeekerId/${jobSeekerId}`);
    const data = getSuccessResponse<JobApplicationResponse[]>(res);
    return z.array(JobApplicationResponseSchema).parse(data);
}

export async function getApplicationsByCompanyIdRequest(
    id: string
): Promise<JobApplicationResponse[]> {
    const res = await httpInstance.get(`/job-applications/company/${id}`);
    const data = res.data.data;
    const normalized = data.map((a: any) => ({
        id: a.ApplicationId,
        jobId: a.JobId,
        jobSeekerId: a.job_seeker_id,
        status: a.ApplicationStatus,
        fullName: a.display_name,
        email: a.email,
        jobTitle: a.JobTitle,
        appliedAt: a.appliedAt,
        companyId: a.CompanyId,
        companyName: a.CompanyName,
    }));
    const SafeSchema = JobApplicationResponseSchema.passthrough();
    return z.array(SafeSchema).parse(normalized);
}

export async function createJobApplicationRequest(
    input: JobApplicationCreateRequest
): Promise<JobApplicationResponse> {
    const body = JobApplicationCreateRequestSchema.parse(input);
    const res = await httpInstance.post(`/job-applications`, body);
    const data = getSuccessResponse<JobApplicationResponse>(res);
    return JobApplicationResponseSchema.parse(data);
}

export async function updateJobApplicationRequest(
    input: JobApplicationUpdateRequest
): Promise<JobApplicationResponse> {
    const body = JobApplicationUpdateRequestSchema.parse(input);
    const res = await httpInstance.put(`/job-applications`, body); 
    const data = getSuccessResponse<JobApplicationResponse>(res);
    return JobApplicationResponseSchema.parse(data);
}

export async function deleteJobApplicationRequest(id: string): Promise<void> {
    await httpInstance.delete(`/job-applications/${id}`);
}
import { z } from "zod";
import httpInstance, { getSuccessResponse } from "@/api/axios";
import {
  JobTagCreateRequestSchema,
  JobTagUpdateRequestSchema,
  JobTagSchema,
} from "./schema";
import type { JobTag, JobTagCreateRequest, JobTagUpdateRequest } from "./type";

/** GET /job-tags → JobTag[] */
export async function getJobTagsRequest(): Promise<JobTag[]> {
  const res = await httpInstance.get("/job-tags");
  // API của bạn trả ApiResponse<T>; helper này trả về .data (T)
  const data = getSuccessResponse<JobTag[]>(res);
  // validate shape trả về (key thường)
  return z.array(JobTagSchema).parse(data);
}

/** GET /job-tags/:id → JobTag */
export async function getJobTagByIdRequest(id: string): Promise<JobTag> {
  const res = await httpInstance.get(`/job-tags/${id}`);
  const data = getSuccessResponse<JobTag>(res);
  return JobTagSchema.parse(data);
}

/** POST /job-tags  body: { Name } → JobTag */
export async function createJobTagRequest(input: JobTagCreateRequest): Promise<JobTag> {
  // Inline map + validate body (không cần helper riêng)
  const body = JobTagCreateRequestSchema.parse({ Name: input.Name });
  const res = await httpInstance.post("/job-tags", body);
  const data = getSuccessResponse<JobTag>(res);
  return JobTagSchema.parse(data);
}

/** PUT /job-tags  body: { Id, Name } → JobTag */
export async function updateJobTagRequest(input: JobTagUpdateRequest): Promise<JobTag> {
  const body = JobTagUpdateRequestSchema.parse({ Id: input.Id, Name: input.Name });
  const res = await httpInstance.put("/job-tags", body);
  const data = getSuccessResponse<JobTag>(res);
  return JobTagSchema.parse(data);
}

/** DELETE /job-tags/:id → ApiResponse<null> (bạn có thể bỏ parse) */
export async function deleteJobTagRequest(id: string): Promise<void> {
  await httpInstance.delete(`/job-tags/${id}`);
}

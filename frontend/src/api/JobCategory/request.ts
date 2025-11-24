import { z } from "zod";
import httpInstance, { getSuccessResponse } from "@/api/axios"; // đổi path nếu khác
import {
  JobCategorySchema,
  JobCategoryCreateRequestSchema,
  JobCategoryUpdateRequestSchema,
} from "./schema";
import type {
  JobCategory,
  JobCategoryCreateRequest,
  JobCategoryUpdateRequest,
} from "./type";

/** GET /job-categories → JobCategory[] */
export async function getJobCategoriesRequest(): Promise<JobCategory[]> {
  const res = await httpInstance.get("/job-categories");
  const data = getSuccessResponse<JobCategory[]>(res);
  return z.array(JobCategorySchema).parse(data);
}

/** GET /job-categories/:id → JobCategory */
export async function getJobCategoryByIdRequest(id: string): Promise<JobCategory> {
  const res = await httpInstance.get(`/job-categories/${id}`);
  const data = getSuccessResponse<JobCategory>(res);
  return JobCategorySchema.parse(data);
}

/** POST /job-categories → ApiResponse<any> (repo có thể không trả ngay entity chuẩn) */
export async function createJobCategoryRequest(
  input: JobCategoryCreateRequest
): Promise<JobCategory> {
  const body = JobCategoryCreateRequestSchema.parse(input);
  const res = await httpInstance.post("/job-categories", body);
  const data = getSuccessResponse<JobCategory>(res);
  // backend của bạn vẫn trả data; parse để đảm bảo shape (nếu không đúng, sẽ throw)
  return JobCategorySchema.parse(data);
}

/** PUT /job-categories → ApiResponse<any> */
export async function updateJobCategoryRequest(
  input: JobCategoryUpdateRequest
): Promise<JobCategory> {
  const body = JobCategoryUpdateRequestSchema.parse(input);
  const res = await httpInstance.put("/job-categories", body);
  const data = getSuccessResponse<JobCategory>(res);
  return JobCategorySchema.parse(data);
}

/** DELETE /job-categories/:id → ApiResponse<null> */
export async function deleteJobCategoryRequest(id: string): Promise<void> {
  await httpInstance.delete(`/job-categories/${id}`);
}

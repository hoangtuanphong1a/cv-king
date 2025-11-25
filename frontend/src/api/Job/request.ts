import instance, { getSuccessResponse } from "../axios";
import {
  ApiResponseSchema,
  JobFilterSchema,
  JobSchema,
  JobsSchema,
} from "./schema";
import { CreateJobRequest, Job, JobApiResponse, JobFilter } from "./type";

export const createJobRequest = async (data: CreateJobRequest) => {
  const response = await instance.post("/jobs", data);
  return getSuccessResponse<JobApiResponse>(response);
};

/** === FIND ALL (GET /jobs?...) === */
export async function getJobsRequest(
  filter?: Partial<JobFilter>
): Promise<Job[]> {
  // Dùng schema đầy đủ để áp default page=1, limit=10
  const parsed = JobFilterSchema.parse(filter ?? {});
  // Chỉ gửi param có giá trị (lọc theo trường đã nhập)
  const params: Record<string, string | number> = {};
  if (parsed.keyword) params.keyword = parsed.keyword;

  if (parsed.location) params.location = parsed.location;
  if (parsed.categoryId) params.categoryId = parsed.categoryId;
  if (parsed.salaryMin != null) params.salaryMin = parsed.salaryMin;
  if (parsed.salaryMax != null) params.salaryMax = parsed.salaryMax;
  if (parsed.jobType) params.jobType = parsed.jobType;
  if (parsed.companyId) params.companyId = parsed.companyId;
  if (parsed.skillIds) params.skillIds = parsed.skillIds; // comma-separated
  if (parsed.tagIds) params.tagIds = parsed.tagIds;
  params.sortBy = parsed.sortBy;
  params.sortOrder = parsed.sortOrder;
  params.page = parsed.page; // default 1
  params.limit = parsed.limit; // default 10

  const res = await instance.get("/jobs", { params });
  // console.log(res);


  // parse qua ApiResponse<JobsSchema>, nhưng hàm vẫn trả về Job[]
  const ListResp = ApiResponseSchema(JobsSchema);


  const parsedResp = ListResp.parse(res.data);
  const list = Array.isArray(parsedResp.data) ? parsedResp.data : (parsedResp.data ? [parsedResp.data] : []);
  return list;
}
//deleteJobRequest
export async function deleteJobRequest(id: string) {
  const res = await instance.delete(`/jobs/${id}`);
  return getSuccessResponse(res);
}

/** === FIND ONE (GET /jobs/:id) === */
export async function getJobByIdRequest(id: string): Promise<Job> {
  const res = await instance.get(`/jobs/${id}`);
  const payload = res?.data?.data;
  const raw = Array.isArray(payload) ? payload[0] : payload;
  if (!raw) throw new Error("Job not found");
  return JobSchema.parse(raw);
}

// Cập nhật Job
export async function updateJobRequest(
  id: string,
  data: Partial<{
    Title: string;
    ShortDescription?: string | null;
    Description?: string | null;
    Requirements?: string | null;
    Benefits?: string | null;
    SalaryMin?: number | null;
    SalaryMax?: number | null;
    Currency?: string | null;
    JobType?:
      | "Toàn thời gian"
      | "Bán thời gian"
      | "Hợp đồng"
      | "Freelance"
      | string
      | null;
    Location?: string | null;
    ExpiresAt?: string | Date | null;
    Status?: string; // ACTIVE/DRAFT...
    CategoryId?: string | null;
    skillIds?: string[];
    tagIds?: string[];
  }>
) {
  // Chuẩn REST: PUT/PATCH /jobs/:id
  const res = await instance.put(`/jobs/${id}`, data);
  return getSuccessResponse(res);
}

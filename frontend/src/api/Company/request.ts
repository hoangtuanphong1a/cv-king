/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import httpInstance, { getSuccessResponse } from "@/api/axios";
import {
  CompanyResponseSchema,
  CompanyCreateRequestSchema,
  CompanyUpdateRequestSchema,
} from "./schema";
import type { CompanyResponse, CompanyCreateRequest, CompanyUpdateRequest } from "./type";

/** GET /companies → Company[] */
export async function getCompaniesRequest(): Promise<CompanyResponse[]> {
  const res = await httpInstance.get("/companies");
  const data = getSuccessResponse<CompanyResponse[]>(res);
  console.log(data);
  return z.array(CompanyResponseSchema).parse(data);
}

/** GET /companies/:id → Company */
export async function getCompanyByIdRequest(id: string): Promise<CompanyResponse> {
  const res = await httpInstance.get(`/companies/${id}`);
  const data = getSuccessResponse<CompanyResponse>(res);
  const company = (data as any).data ?? data;

  // 🔧 Chuẩn hóa field benefits
  if (typeof company.benefits === "string") {
    // Nếu là chuỗi bình thường (VD: "dãi ng? t?t"), convert sang mảng 1 phần tử
    if (company.benefits.trim().startsWith("[") && company.benefits.trim().endsWith("]")) {
      try {
        company.benefits = JSON.parse(company.benefits);
      } catch {
        company.benefits = [company.benefits];
      }
    } else {
      company.benefits = [company.benefits];
    }
  } else if (!Array.isArray(company.benefits)) {
    company.benefits = [];
  }

  try {
    const parsed = CompanyResponseSchema.parse(company);
    return parsed;
  } catch (err) {
    console.error("Zod parse error:", err);
    console.log("Received company object before parse:", company);
    throw err;
  }
}


/** POST /companies  body: PascalCase → Company */
export async function createCompanyRequest(input: CompanyCreateRequest): Promise<CompanyResponse> {
  const body = CompanyCreateRequestSchema.parse(input);
  const res = await httpInstance.post("/companies", body);
  const data = getSuccessResponse<CompanyResponse>(res);
  return CompanyResponseSchema.parse(data);
}

/** PUT /companies/:id  body: PascalCase (partial) → Company */
export async function updateCompanyRequest(params: {
  id: string;
  data: CompanyUpdateRequest;
}): Promise<CompanyResponse> {
  const { id, data } = params;
  const body = CompanyUpdateRequestSchema.parse(data);
  const res = await httpInstance.put(`/companies/${id}`, body);
  const resp = getSuccessResponse<CompanyResponse>(res);
  return CompanyResponseSchema.parse(resp);
}

/** DELETE /companies/:id → ApiResponse<null> */
export async function deleteCompanyRequest(id: string): Promise<void> {
  await httpInstance.delete(`/companies/${id}`);
}

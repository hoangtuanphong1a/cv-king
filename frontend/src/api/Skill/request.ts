// request.ts
import { z } from "zod";
import httpInstance, { getSuccessResponse } from "@/api/axios";
import {
  SkillSchema,
  SkillCreateRequestSchema,
  SkillUpdateRequestSchema,
} from "./schema";
import type { Skill, SkillCreateRequest, SkillUpdateRequest } from "./type";

const SkillOrArraySchema = z.union([SkillSchema, z.array(SkillSchema)]);

function normalizeSkill(data: unknown): Skill {
  const parsed = SkillOrArraySchema.parse(data);
  return Array.isArray(parsed) ? parsed[0] : parsed;
}

/** GET /skills → Skill[] */
export async function getSkillsRequest(): Promise<Skill[]> {
  const res = await httpInstance.get("/skills");
  const data = getSuccessResponse<Skill[] | unknown>(res);
  // Ở list thì kỳ vọng mảng Skill
  return z.array(SkillSchema).parse(data);
}

/** GET /skills/:id → Skill */
export async function getSkillByIdRequest(id: string): Promise<Skill> {
  const res = await httpInstance.get(`/skills/${id}`);
  const data = getSuccessResponse<unknown>(res);
  return normalizeSkill(data);
}

/** POST /skills → Skill (có thể trả [Skill]) */
export async function createSkillRequest(input: SkillCreateRequest): Promise<Skill> {
  const body = SkillCreateRequestSchema.parse(input); // { Name }
  const res = await httpInstance.post("/skills", body);
  const data = getSuccessResponse<unknown>(res);
  return normalizeSkill(data);
}

/** PUT /skills → Skill (có thể trả [Skill]) */
export async function updateSkillRequest(input: SkillUpdateRequest): Promise<Skill> {
  const body = SkillUpdateRequestSchema.parse(input); // { Id, Name }
  const res = await httpInstance.put("/skills", body);
  const data = getSuccessResponse<unknown>(res);
  return normalizeSkill(data);
}

/** DELETE /skills/:id → void */
export async function deleteSkillRequest(id: string): Promise<void> {
  await httpInstance.delete(`/skills/${id}`);
}

import z from "zod";
import { ApplicationStatusEnum, JobApplicationResponseSchema, JobApplicationCreateRequestSchema, JobApplicationUpdateRequestSchema } from "./schema";

export type JobApplicationResponse = z.infer<typeof JobApplicationResponseSchema>;

export type JobApplicationCreateRequest = z.infer<typeof JobApplicationCreateRequestSchema>;
export type JobApplicationUpdateRequest = z.infer<typeof JobApplicationUpdateRequestSchema>;

export type ApplicationStatus = z.infer<typeof ApplicationStatusEnum>;
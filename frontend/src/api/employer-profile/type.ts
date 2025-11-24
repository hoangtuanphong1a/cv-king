import z from "zod";
import { CreateEmployerProfileRequestSchema, EmPloyerProfileBaseSchema, EmployerProfileResponseSchema, EmployerProfilesListResponseSchema, UpdateEmployerAndCompanyRequestSchema, UpdateEmployerProfileRequestSchema } from "./schema";

export type EmployerProfile = z.infer<typeof EmPloyerProfileBaseSchema>;
export type EmployerProfileListResponse = z.infer<typeof EmployerProfilesListResponseSchema>;
export type CreateEmployerProfileRequest = z.infer<typeof CreateEmployerProfileRequestSchema>;
export type UpdateEmployerProfileRequest = z.infer<typeof UpdateEmployerProfileRequestSchema>;
export type UpdateEmployerAndCompanyRequest = z.infer<typeof UpdateEmployerAndCompanyRequestSchema>
export type EmployerProfileResponse = z.infer<typeof EmployerProfileResponseSchema>;
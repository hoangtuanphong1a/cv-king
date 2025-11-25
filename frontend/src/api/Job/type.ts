import z from "zod";
import { CreateJobSchema, JobApiResponseSchema, JobFilterSchema, JobSchema } from "./schema";

export type JobApiResponse = z.infer<typeof JobApiResponseSchema>;
export type CreateJobFormData = z.input<typeof CreateJobSchema>; 
export type Job = z.infer<typeof JobSchema>;
export type JobFilter = z.infer<typeof JobFilterSchema>;

// Type for API request payload (includes Slug, ExpiresAt is Date not optional)
export type CreateJobRequest = Omit<CreateJobFormData, 'ExpiresAt'> & {
  Slug: string;
  ExpiresAt: Date;
};
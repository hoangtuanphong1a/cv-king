import z from "zod";
import {
    JobSeekerProfileSchema,
    JobSeekerProfileCreateRequestSchema,
    JobSeekerProfileUpdateRequestSchema,
} from "./schema";

export type JobSeekerProfileResponse = z.infer<typeof JobSeekerProfileSchema>;
export type JobSeekerProfileCreateRequest = z.infer<typeof JobSeekerProfileCreateRequestSchema>;
export type JobSeekerProfileUpdateRequest = z.infer<typeof JobSeekerProfileUpdateRequestSchema>;

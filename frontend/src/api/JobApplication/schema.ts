import z from "zod";

export const ApplicationStatusEnum = z.enum([
    "Pending",
    "Reviewed",
    "Interview",
    "Rejected",
    "Hired",
]);

export const JobApplicationCreateRequestSchema = z.object({
    jobId: z.string().uuid(),
    jobSeekerId: z.string().uuid(),
    coverLetter: z.any().optional(),
});

export const JobApplicationUpdateRequestSchema = z.object({
    id: z.string().uuid(),
    jobId: z.string().uuid(),
    jobSeekerId: z.string().uuid(),
    coverLetter: z.string().trim().optional(),
    status: ApplicationStatusEnum,
});

export const JobApplicationResponseSchema = z.object({
    id: z.string(),
    jobId: z.string().optional(),
    jobSeekerId: z.string().optional(),
    coverLetter: z.string().nullable().optional(),
    status: ApplicationStatusEnum,
    appliedAt: z.union([z.string(), z.date()]).optional(),
    isDeleted: z.boolean().optional(),
    created_at: z.union([z.string(), z.date()]).nullable().optional(),
    updated_at: z.union([z.string(), z.date()]).nullable().optional(),
});

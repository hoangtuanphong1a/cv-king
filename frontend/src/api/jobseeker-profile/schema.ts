import z from "zod";

export const JobSeekerProfileSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    fullName: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    dob: z.union([z.string(), z.date()]).nullable().optional(), // ✅ thêm ngày sinh
    location: z.string().nullable().optional(),
    summary: z.string().nullable().optional(),
    currentTitle: z.string().nullable().optional(), // ✅ thêm chức danh hiện tại
    yearsExperience: z.number().nullable().optional(), // ✅ thêm số năm kinh nghiệm
    skills: z.array(z.string()).optional(),
    experience: z.string().nullable().optional(),
    education: z.string().nullable().optional(),
    created_at: z.union([z.string(), z.date()]).optional(),
    updated_at: z.union([z.string(), z.date()]).optional(),
});

export const JobSeekerProfileCreateRequestSchema = z.object({
    userId: z.string().uuid(),
    fullName: z.string().trim().optional(),
    email: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    dob: z.string().optional(), // ✅ thêm dob
    location: z.string().trim().optional(),
    summary: z.string().trim().optional(),
    currentTitle: z.string().trim().optional(), // ✅ thêm currentTitle
    yearsExperience: z.number().optional(), // ✅ thêm yearsExperience
    skills: z.array(z.string()).optional(),
    experience: z.string().trim().optional(),
    education: z.string().trim().optional(),
});

export const JobSeekerProfileUpdateRequestSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid().optional(),
    fullName: z.string().trim().optional(),
    email: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    dob: z.string().optional(),
    location: z.string().trim().optional(),
    summary: z.string().trim().optional(),
    currentTitle: z.string().trim().optional(),
    yearsExperience: z.number().optional(),
    skills: z.array(z.string()).optional(),
    experience: z.string().trim().optional(),
    education: z.string().trim().optional(),
});

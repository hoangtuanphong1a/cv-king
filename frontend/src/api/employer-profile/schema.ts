import { MESSAGES } from "@/lib/messages";
import z from "zod";
import { CompanyUpdateRequestSchema } from "../Company/schema";

export const EmPloyerProfileBaseSchema = z.object({
    id: z.string().uuid().optional(),
    userId: z.string().uuid({ message: MESSAGES.INVALID_UUID }),
    company: z.string().min(1, { message: "Tên công ty không được để trống" }),
    title: z.string().max(200).optional(),
    phone: z.string().optional(),
});

export const CreateEmployerProfileRequestSchema = EmPloyerProfileBaseSchema.omit({ id: true });
export const UpdateEmployerProfileRequestSchema = EmPloyerProfileBaseSchema.partial();

export const UpdateEmployerAndCompanyRequestSchema = z.object({
    employerProfile: UpdateEmployerProfileRequestSchema,
    company: CompanyUpdateRequestSchema,
})

export const EmployerProfileResponseSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    company: z.string().min(1),
    title: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});



export const EmployerProfilesListResponseSchema = z.object({
    items: z.array(EmployerProfileResponseSchema),
});
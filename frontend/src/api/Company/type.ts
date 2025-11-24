import type { z } from "zod";
import {
  CompanyResponseSchema,
  CompanyCreateRequestSchema,
  CompanyUpdateRequestSchema,
} from "./schema";

/** Response item (server trả về) */
export type CompanyResponse = z.infer<typeof CompanyResponseSchema>;

/** Request bodies (client gửi lên: PascalCase) */
export type CompanyCreateRequest = z.infer<typeof CompanyCreateRequestSchema>;
export type CompanyUpdateRequest = z.infer<typeof CompanyUpdateRequestSchema>;

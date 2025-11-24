// @/api/job-tags/type.ts
import type { z } from "zod";
import { JobTagSchema, JobTagCreateRequestSchema, JobTagUpdateRequestSchema } from "./schema";

/** Response item (server trả về: key thường) */
export type JobTag = z.infer<typeof JobTagSchema>;

/** Request bodies (client gửi lên: key Hoa) */
export type JobTagCreateRequest = z.infer<typeof JobTagCreateRequestSchema>;
export type JobTagUpdateRequest = z.infer<typeof JobTagUpdateRequestSchema>;


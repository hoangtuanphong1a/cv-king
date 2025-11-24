import type { z } from "zod";
import {
  SkillSchema,
  SkillCreateRequestSchema,
  SkillUpdateRequestSchema,
} from "./schema";

/** Response item (server trả về: key thường) */
export type Skill = z.infer<typeof SkillSchema>;

/** Request bodies (client gửi lên: key Hoa) */
export type SkillCreateRequest = z.infer<typeof SkillCreateRequestSchema>;
export type SkillUpdateRequest = z.infer<typeof SkillUpdateRequestSchema>;

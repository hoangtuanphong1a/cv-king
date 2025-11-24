import z from "zod";
import { UploadResponseSchema } from "./schema";

export type UploadResponse = z.infer<typeof UploadResponseSchema>;

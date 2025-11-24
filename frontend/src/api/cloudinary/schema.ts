import z from "zod";

// Response trả về khi upload/update
export const UploadResponseSchema = z.object({
    url: z.string().url({ message: "URL không hợp lệ" }),
    public_id: z.string().min(1, { message: "public_id không được rỗng" }),
});

import instance, { getSuccessResponse } from "../axios";
import { UploadResponse } from "./type";

// Upload file mới
export const uploadFileRequest = async (file: File, folder?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) formData.append("folder", folder);

    const res = await instance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return getSuccessResponse<UploadResponse>(res);
};

// Update file (xóa cũ + upload mới)
export const updateFileRequest = async (
    file: File,
    publicId: string,
    folder?: string
) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("publicId", publicId);
    if (folder) formData.append("folder", folder);

    const res = await instance.put("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return getSuccessResponse<UploadResponse>(res);
};

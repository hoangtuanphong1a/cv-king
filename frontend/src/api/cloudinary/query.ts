import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { uploadFileRequest, updateFileRequest } from "./request";
import type { UploadResponse } from "./type";

// Mutation upload file
export const useUploadFileMutation = (
    options?: UseMutationOptions<UploadResponse, Error, { file: File; folder?: string }>
) =>
    useMutation({
        mutationFn: ({ file, folder }) => uploadFileRequest(file, folder),
        ...options,
    });

// Mutation update file
export const useUpdateFileMutation = (
    options?: UseMutationOptions<
        UploadResponse,
        Error,
        { file: File; publicId: string; folder?: string }
    >
) =>
    useMutation({
        mutationFn: ({ file, publicId, folder }) =>
            updateFileRequest(file, publicId, folder),
        ...options,
    });

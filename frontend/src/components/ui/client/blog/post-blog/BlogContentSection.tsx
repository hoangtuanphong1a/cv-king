"use client";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { CreateBlogPostFormData } from "@/api/BlogPosts/type";

interface Props {
  control: Control<CreateBlogPostFormData>;
  errors: FieldErrors<CreateBlogPostFormData>;
}

export default function BlogContentSection({ control, errors }: Props) {
  const areaSx = {
    "& .MuiInputBase-root": {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      fontSize: "0.875rem",
      padding: "12px",
      marginBottom: "10px",
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
    "& .Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Nội dung bài viết</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nội dung chính <span className="text-red-500">*</span>
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full"
                placeholder="Nhập nội dung bài viết chính..."
                multiline
                rows={8}
                variant="outlined"
                sx={areaSx}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả ngắn
          </label>
          <Controller
            name="shortDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full"
                placeholder="Tóm tắt ngắn gọn về bài viết"
                multiline
                rows={2}
                variant="outlined"
                sx={areaSx}
                error={!!errors.shortDescription}
                helperText={errors.shortDescription?.message}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yêu cầu kiến thức
          </label>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full"
                placeholder="Kiến thức cần thiết để hiểu bài viết"
                multiline
                rows={3}
                variant="outlined"
                sx={areaSx}
                error={!!errors.requirements}
                helperText={errors.requirements?.message}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lợi ích
          </label>
          <Controller
            name="benefits"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full"
                placeholder="Những gì người đọc có thể học được"
                multiline
                rows={3}
                variant="outlined"
                sx={areaSx}
                error={!!errors.benefits}
                helperText={errors.benefits?.message}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}

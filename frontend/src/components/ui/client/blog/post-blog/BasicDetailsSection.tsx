"use client";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormControl, FormHelperText, MenuItem, Select, TextField } from "@mui/material";
import { CreateBlogPostFormData } from "@/api/BlogPosts/type";

interface Props {
  control: Control<CreateBlogPostFormData>;
  errors: FieldErrors<CreateBlogPostFormData>;
  categories: { id: string; name: string }[];
}

export default function BasicDetailsSection({ control, errors, categories }: Props) {
  const inputStyles = {
    "& .MuiInputBase-root": {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      fontSize: "0.875rem",
      height: "48px",
      padding: "0 12px",
      "& .MuiInputBase-input": { padding: "12px 0" },
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
    "& .Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
  };

  const selectStyles = {
    height: 48,
    "& .MuiSelect-select": { padding: "10px 12px" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
  };

  const selectFormControlStyles = {
    minWidth: 224,
    backgroundColor: "#f5f5f5",
    borderRadius: 2,
  };

  const menuProps = {
    disableScrollLock: true,
    keepMounted: true,
    PaperProps: { sx: { minWidth: 224 } },
  };

  const fields: Array<{
    name: keyof CreateBlogPostFormData;
    label: string;
    placeholder: string;
    type?: "text" | "url";
    required?: boolean;
  }> = [
    {
      name: "title",
      label: "Tiêu đề bài viết",
      placeholder: "Nhập tiêu đề bài viết",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      placeholder: "Tiêu đề sẽ tự động tạo slug",
      required: true,
    },
    {
      name: "excerpt",
      label: "Tóm tắt",
      placeholder: "Nhập tóm tắt ngắn gọn",
    },
    {
      name: "coverImageUrl",
      label: "URL ảnh bìa",
      placeholder: "https://example.com/image.jpg",
      type: "url",
    },
  ];

  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Thông tin cơ bản</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {fields.map(({ name, label, placeholder, type = "text", required }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={type}
                  className="w-full"
                  placeholder={placeholder}
                  variant="outlined"
                  sx={inputStyles}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value ?? ""}
                />
              )}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Danh mục
          </label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <FormControl sx={selectFormControlStyles} fullWidth error={!!errors.categoryId}>
                <Select
                  {...field}
                  value={(field.value as string) ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  displayEmpty
                  renderValue={(selected: string) => (
                    <span>
                      {selected === "" ? (
                        <span className="text-gray-400">Chọn danh mục</span>
                      ) : (
                        categories.find((opt) => opt.id === selected)?.name || selected
                      )}
                    </span>
                  )}
                  MenuProps={menuProps}
                  sx={selectStyles}
                >
                  <MenuItem value="">
                    <span className="text-gray-400">Chọn danh mục</span>
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.categoryId?.message && (
                  <FormHelperText sx={{ color: "#ef4444" }}>
                    {errors.categoryId.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </div>
      </div>
    </section>
  );
}

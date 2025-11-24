"use client";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormControl, FormHelperText, MenuItem, Select, TextField } from "@mui/material";
import { CreateJobFormData } from "@/api/Job/type";

interface Props {
  control: Control<CreateJobFormData>;
  errors: FieldErrors<CreateJobFormData>;
  companies: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export default function BasicDetailsSection({ control, errors, companies, categories }: Props) {
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

  const jobTypes = [
    { label: "Toàn thời gian", value: "Toàn thời gian" },
    { label: "Bán thời gian", value: "Bán thời gian" },
    { label: "Hợp đồng", value: "Hợp đồng" },
    { label: "Freelance", value: "Freelance" },
  ];

  const currencies = [
    { label: "USD", value: "USD" },
    { label: "VND", value: "VND" },
  ];

  const fields: Array<{
    name: keyof CreateJobFormData;
    label: string;
    placeholder: string;
    type?: "text" | "number" | "select";
    options?: { label: string; value: string }[];
    required?: boolean;
  }> = [
    {
      name: "Title",
      label: "Chức danh",
      placeholder: "VD: Lập trình viên Frontend",
      required: true,
    },
    {
      name: "CompanyId",
      label: "Công ty",
      placeholder: "Chọn công ty",
      type: "select",
      options: companies.map(({ id, name }) => ({ label: name, value: id })),
    },
    { name: "Location", label: "Địa điểm", placeholder: "Nhập địa điểm" },
    {
      name: "JobType",
      label: "Loại công việc",
      placeholder: "Chọn loại",
      type: "select",
      options: jobTypes,
    },
    {
      name: "CategoryId",
      label: "Danh mục",
      placeholder: "Chọn danh mục",
      type: "select",
      options: categories.map(({ id, name }) => ({ label: name, value: id })),
    },
  ];

  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Thông tin công việc</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {fields.map(({ name, label, placeholder, type = "text", options, required }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <Controller
              name={name}
              control={control}
              render={({ field }) =>
                type === "select" && options ? (
                  <FormControl sx={selectFormControlStyles} fullWidth error={!!errors[name]}>
                    <Select
                      {...field}
                      value={(field.value as string) ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      displayEmpty
                      renderValue={(selected: string) => (
                        <span>
                          {selected === "" ? (
                            <span className="text-gray-400">{placeholder}</span>
                          ) : (
                            options.find((opt) => opt.value === selected)?.label || selected
                          )}
                        </span>
                      )}
                      MenuProps={menuProps}
                      sx={selectStyles}
                    >
                      <MenuItem value="">
                        <span className="text-gray-400">{placeholder}</span>
                      </MenuItem>
                      {options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors[name]?.message && (
                      <FormHelperText sx={{ color: "#ef4444" }}>
                        {errors[name]?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                ) : (
                  <TextField
                    {...field}
                    type={type}
                    className="w-full"
                    placeholder={placeholder}
                    variant="outlined"
                    sx={inputStyles}
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                    onChange={(e) =>
                      field.onChange(type === "number" ? (e.target.value ? Number(e.target.value) : undefined) : e.target.value)
                    }
                    value={field.value ?? ""}
                  />
                )
              }
            />
          </div>
        ))}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mức lương</label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
            <Controller
              name="SalaryMin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  className="col-span-2"
                  placeholder="Tối thiểu"
                  variant="outlined"
                  sx={inputStyles}
                  error={!!errors.SalaryMin}
                  helperText={errors.SalaryMin?.message}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  value={field.value ?? ""}
                />
              )}
            />
            <span className="flex justify-center text-gray-600">đến</span>
            <Controller
              name="SalaryMax"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  className="col-span-2"
                  placeholder="Tối đa"
                  variant="outlined"
                  sx={inputStyles}
                  error={!!errors.SalaryMax}
                  helperText={errors.SalaryMax?.message}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  value={field.value ?? ""}
                />
              )}
            />
            <Controller
              name="Currency"
              control={control}
              render={({ field }) => (
                <FormControl sx={selectFormControlStyles} fullWidth error={!!errors.Currency}>
                  <Select
                    {...field}
                    value={(field.value as string) ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    displayEmpty
                    renderValue={(selected: string) => (
                      <span>
                        {selected === "" ? (
                          <span className="text-gray-400">Chọn đơn vị</span>
                        ) : (
                          currencies.find((opt) => opt.value === selected)?.label || selected
                        )}
                      </span>
                    )}
                    MenuProps={menuProps}
                    sx={selectStyles}
                  >
                    <MenuItem value="">
                      <span className="text-gray-400">Chọn đơn vị</span>
                    </MenuItem>
                    {currencies.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.Currency?.message && (
                    <FormHelperText sx={{ color: "#ef4444" }}>
                      {errors.Currency.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>
          <span className="text-sm text-gray-500 mt-2 inline-block">/ mỗi tháng</span>
        </div>
      </div>
    </section>
  );
}

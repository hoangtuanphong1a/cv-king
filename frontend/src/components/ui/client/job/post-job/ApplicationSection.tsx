/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { CreateJobFormData } from "@/api/Job/type";

interface Props {
  control: Control<CreateJobFormData>;
  errors: FieldErrors<CreateJobFormData>;
  setValue: (name: keyof CreateJobFormData, value: any) => void;
}

export default function ApplicationSection({ control, errors }: Props) {
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

  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Thông tin ứng tuyển</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn</label>
        <Controller
          name="ExpiresAt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              className="w-full"
              variant="outlined"
              sx={inputStyles}
              error={!!errors.ExpiresAt}
              helperText={errors.ExpiresAt?.message}
              value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
              onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
            />
          )}
        />
      </div>
    </section>
  );
}

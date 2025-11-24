"use client";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { CreateJobFormData } from "@/api/Job/type";

interface Props {
  control: Control<CreateJobFormData>;
  errors: FieldErrors<CreateJobFormData>;
}

export default function JobDetailsSection({ control, errors }: Props) {
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
      <h2 className="text-xl font-semibold text-gray-900">Chi tiết công việc</h2>

      <Controller
        name="ShortDescription"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="w-full"
            placeholder="Tóm tắt công việc"
            multiline
            rows={2}
            variant="outlined"
            sx={areaSx}
            error={!!errors.ShortDescription}
            helperText={errors.ShortDescription?.message}
          />
        )}
      />

      <Controller
        name="Description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="w-full"
            placeholder="Mô tả công việc"
            multiline
            rows={4}
            variant="outlined"
            sx={areaSx}
            error={!!errors.Description}
            helperText={errors.Description?.message}
          />
        )}
      />

      <Controller
        name="Requirements"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="w-full"
            placeholder="Yêu cầu"
            multiline
            rows={3}
            variant="outlined"
            sx={areaSx}
            error={!!errors.Requirements}
            helperText={errors.Requirements?.message}
          />
        )}
      />

      <Controller
        name="Benefits"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="w-full"
            placeholder="Phúc lợi"
            multiline
            rows={3}
            variant="outlined"
            sx={areaSx}
            error={!!errors.Benefits}
            helperText={errors.Benefits?.message}
          />
        )}
      />
    </section>
  );
}

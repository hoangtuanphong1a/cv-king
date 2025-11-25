/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import BreadcrumbDisplay from "@/components/ui/common/breadcrumb/BreadcumbDisplay";
import { useJobByIdQuery, useUpdateJobMutation } from "@/api/Job/query";
import type { Job } from "@/api/Job/type";

const JOB_TYPES = ["Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"] as const;

export default function JobEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id as string;

  const { data: job, isLoading, isError, refetch } = useJobByIdQuery(id);
  const updateMutation = useUpdateJobMutation();

  // Form state (map từ Job → payload PascalCase theo create/update của bạn)
  const [form, setForm] = useState({
    Title: "",
    ShortDescription: "" as string | undefined,
    Description: "" as string | undefined,
    Requirements: "" as string | undefined,
    Benefits: "" as string | undefined,
    SalaryMin: undefined as number | undefined,
    SalaryMax: undefined as number | undefined,
    Currency: "" as string | undefined,
    JobType: "" as string | undefined,
    Location: "" as string | undefined,
    ExpiresAt: "" as string | undefined, // yyyy-MM-dd
    Status: "" as string | undefined,
  });

  useEffect(() => {
    if (!job) return;
    const j: Job = job;
    // chuyển ISO → yyyy-MM-dd cho input date
    const toDateInput = (iso?: string | null) => {
      if (!iso) return "";
      const d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      const pad = (n: number) => `${n}`.padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };
    setForm({
      Title: j.title ?? "",
      ShortDescription: j.short_description ?? "",
      Description: j.description ?? "",
      Requirements: j.requirements ?? "",
      Benefits: j.benefits ?? "",
      SalaryMin: j.salary_min ?? undefined,
      SalaryMax: j.salary_max ?? undefined,
      Currency: (j.currency as string | undefined) ?? undefined,
      JobType: (j.job_type as string | undefined) ?? undefined,
      Location: j.location ?? "",
      ExpiresAt: toDateInput(j.expires_at),
      Status: j.status ?? "ACTIVE",
    });
  }, [job]);

  const onChange = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Nếu có ExpiresAt dạng yyyy-MM-dd, gửi thẳng; backend bạn đang parse date -> ok
      await updateMutation.mutateAsync({ id, data: form });
      toast.success("Đã cập nhật tin tuyển dụng");
      router.push(`admin/job/view/${id}`);
    } catch (err: any) {
      toast.error(err?.message ?? "Cập nhật thất bại");
    }
  };

  return (
    <Box>
      <Box className="mb-4 flex items-center justify-between">
        <BreadcrumbDisplay />
        <div className="flex gap-2">
          <Button variant="outlined" onClick={() => router.back()}>Quay lại</Button>
          <Button variant="contained" onClick={() => router.push(`/jobs/view/${id}`)}>Xem</Button>
        </div>
      </Box>

      {isLoading && <div className="p-6">Đang tải…</div>}
      {isError && (
        <div className="p-6 text-red-600">
          Lỗi tải dữ liệu. <Button size="small" onClick={() => refetch()}>Thử lại</Button>
        </div>
      )}

      {job && (
        <form onSubmit={onSubmit}>
          <Box className="rounded-2xl border p-5 grid md:grid-cols-2 gap-4">
            <TextField
              label="Tiêu đề"
              value={form.Title}
              onChange={(e) => onChange("Title", e.target.value)}
              required
            />
            <TextField
              label="Địa điểm"
              value={form.Location ?? ""}
              onChange={(e) => onChange("Location", e.target.value)}
            />

            <TextField
              label="Tóm tắt"
              value={form.ShortDescription ?? ""}
              onChange={(e) => onChange("ShortDescription", e.target.value)}
              multiline minRows={2}
            />
            <Select
              value={form.JobType ?? ""}
              displayEmpty
              onChange={(e) => onChange("JobType", e.target.value || undefined)}
            >
              <MenuItem value=""><em>Hình thức</em></MenuItem>
              {JOB_TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>

            <TextField
              label="Lương tối thiểu"
              type="number"
              value={form.SalaryMin ?? ""}
              onChange={(e) => onChange("SalaryMin", e.target.value ? Number(e.target.value) : undefined)}
            />
            <TextField
              label="Lương tối đa"
              type="number"
              value={form.SalaryMax ?? ""}
              onChange={(e) => onChange("SalaryMax", e.target.value ? Number(e.target.value) : undefined)}
            />
            <TextField
              label="Tiền tệ (VD: VND, USD)"
              value={form.Currency ?? ""}
              onChange={(e) => onChange("Currency", e.target.value || undefined)}
              inputProps={{ maxLength: 3 }}
            />
            <TextField
              label="Hết hạn"
              type="date"
              value={form.ExpiresAt ?? ""}
              onChange={(e) => onChange("ExpiresAt", e.target.value || undefined)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Mô tả"
              value={form.Description ?? ""}
              onChange={(e) => onChange("Description", e.target.value)}
              multiline minRows={4}
              className="md:col-span-2"
            />
            <TextField
              label="Yêu cầu"
              value={form.Requirements ?? ""}
              onChange={(e) => onChange("Requirements", e.target.value)}
              multiline minRows={4}
              className="md:col-span-2"
            />
            <TextField
              label="Quyền lợi"
              value={form.Benefits ?? ""}
              onChange={(e) => onChange("Benefits", e.target.value)}
              multiline minRows={3}
              className="md:col-span-2"
            />
          </Box>

          <Box className="flex gap-2 justify-end mt-4">
            <Button variant="outlined" onClick={() => router.back()}>Huỷ</Button>
            <Button type="submit" variant="contained" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}

// "use client";
// import { useParams } from "next/navigation";

// export default function JobEditTest() {
//   const { id } = useParams<{ id: string }>();
//   return (
//     <div style={{ padding: 24 }}>
//       <h1>EDIT OK</h1>
//       <p>ID: {String(id)}</p>
//     </div>
//   );
// }

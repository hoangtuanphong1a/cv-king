"use client";

import { Box, Button, Chip, Divider } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import BreadcrumbDisplay from "@/components/ui/common/breadcrumb/BreadcumbDisplay";
import { useJobByIdQuery } from "@/api/Job/query";

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "—" : format(d, "dd/MM/yyyy");
}
function formatSalary(min?: number | null, max?: number | null, ccy?: string | null) {
  if (min == null && max == null) return "—";
  const n = (v: number) => v.toLocaleString();
  const u = ccy ?? "";
  if (min != null && max != null) return `${n(min)}–${n(max)} ${u}`;
  if (min != null) return `≥ ${n(min)} ${u}`;
  return `≤ ${n(max!)} ${u}`;
}

export default function JobViewPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const { data: job, isLoading, isError, refetch } = useJobByIdQuery(id);

  return (
    <Box>
      <Box className="mb-4 flex items-center justify-between">
        <BreadcrumbDisplay />
        <div className="flex gap-2">
          <Button variant="outlined" onClick={() => router.back()}>Quay lại</Button>
          <Button variant="contained" onClick={() => router.push(`admin/job/edit/${id}`)}>Sửa</Button>
        </div>
      </Box>

      {isLoading && <div className="p-6">Đang tải…</div>}
      {isError && (
        <div className="p-6 text-red-600">
          Lỗi tải dữ liệu. <Button size="small" onClick={() => refetch()}>Thử lại</Button>
        </div>
      )}
      {job && (
        <Box className="rounded-2xl border p-5">
          <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
          <div className="text-gray-600 mb-3">{job.company?.Name ?? "—"}</div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div><b>Địa điểm:</b> {job.location ?? "—"}</div>
            <div><b>Hình thức:</b> {job.job_type ?? "—"}</div>
            <div><b>Lương:</b> {formatSalary(job.salary_min ?? null, job.salary_max ?? null, job.currency ?? null)}</div>
            <div><b>Trạng thái:</b> <Chip size="small" label={job.status} color={job.status === "ACTIVE" ? "success" : "default"} /></div>
            <div><b>Ngày đăng:</b> {formatDate(job.posted_at)}</div>
            <div><b>Hết hạn:</b> {formatDate(job.expires_at)}</div>
          </div>

          <Divider className="my-4" />
          {job.short_description && (
            <>
              <h3 className="font-semibold mb-1">Tóm tắt</h3>
              <p className="whitespace-pre-wrap">{job.short_description}</p>
            </>
          )}

          {job.description && (
            <>
              <h3 className="font-semibold mt-4 mb-1">Mô tả</h3>
              <p className="whitespace-pre-wrap">{job.description}</p>
            </>
          )}

          {job.requirements && (
            <>
              <h3 className="font-semibold mt-4 mb-1">Yêu cầu</h3>
              <p className="whitespace-pre-wrap">{job.requirements}</p>
            </>
          )}

          {job.benefits && (
            <>
              <h3 className="font-semibold mt-4 mb-1">Quyền lợi</h3>
              <p className="whitespace-pre-wrap">{job.benefits}</p>
            </>
          )}

          {(job.skills?.length ?? 0) > 0 && (
            <>
              <h3 className="font-semibold mt-4 mb-1">Kỹ năng</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills!.map((s) => <Chip key={s.id} size="small" label={s.Name} />)}
              </div>
            </>
          )}
          {(job.tags?.length ?? 0) > 0 && (
            <>
              <h3 className="font-semibold mt-4 mb-1">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags!.map((t) => <Chip key={t.id} size="small" label={t.Name} variant="outlined" />)}
              </div>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

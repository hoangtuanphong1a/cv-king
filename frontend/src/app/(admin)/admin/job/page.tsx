/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  Avatar,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type ColumnDef } from "@tanstack/react-table";

import BreadcrumbDisplay from "@/components/ui/common/breadcrumb/BreadcumbDisplay";
import { DataTable } from "@/components/ui/common/table/DataTable";
import { getColumns } from "@/components/ui/common/table/Column";

import { useJobsQuery, useDeleteJobMutation } from "@/api/Job/query";
import type { Job, JobFilter } from "@/api/Job/type";

export default function JobsPage() {
  const router = useRouter();

  // filter state
  const [filter, setFilter] = useState<Partial<JobFilter>>({
    page: 1,
    limit: 10,
    sortBy: "title",
    sortOrder: "DESC",
  });

  const { data = [], isLoading, isError, refetch } = useJobsQuery(filter);
  const deleteMutation = useDeleteJobMutation();

  const total = data?.[0]?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / (filter.limit || 10)));

  // ===== Row Actions =====
  const onView = useCallback((id: string) => {
    router.push(`/admin/job/view/${id}`);
  }, [router]);
  
  const onEdit = useCallback((id: string) => {
    router.push(`/admin/job/edit/${id}`);
  }, [router]);
  
  const onDelete = useCallback(async (id: string) => {
    await deleteMutation.mutateAsync(id);
    toast.success("Đã xoá tin tuyển dụng");
    refetch();
  }, [deleteMutation, refetch]);

  // ===== Base columns cho Job =====
  const baseColumns: ColumnDef<Job>[] = useMemo(
    () => [
      {
        id: "index",
        header: "STT",
        size: 64,
        cell: ({ row }) => (
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 font-semibold">
            {row.index + 1}
          </div>
        ),
      },
      {
        accessorKey: "title",
        header: "TIÊU ĐỀ",
        cell: ({ row }) => {
          const j = row.original;
          return (
            <div className="flex items-start gap-3">
              <Avatar
                src={j.company?.logo_url ?? undefined}
                sx={{ width: 44, height: 44, fontWeight: 700 }}
              >
                {j.company?.Name?.[0] ?? j.title?.[0] ?? "J"}
              </Avatar>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white leading-snug">
                  {j.title}
                </div>
                <div className="text-xs text-gray-500">
                  {j.company?.Name ?? "—"}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "location",
        header: "ĐỊA ĐIỂM",
        cell: ({ row }) => (
          <span className="text-gray-700 dark:text-gray-200">
            {row.original.location ?? "—"}
          </span>
        ),
      },
      {
        id: "salary",
        header: "MỨC LƯƠNG",
        cell: ({ row }) => {
          const j = row.original;
          const fmt = (v: number) => v.toLocaleString();
          const text =
            j.salary_min == null && j.salary_max == null
              ? "—"
              : j.salary_min != null && j.salary_max != null
              ? `${fmt(j.salary_min)}–${fmt(j.salary_max)} ${j.currency ?? ""}`
              : j.salary_min != null
              ? `≥ ${fmt(j.salary_min)} ${j.currency ?? ""}`
              : `≤ ${fmt(j.salary_max!)} ${j.currency ?? ""}`;
          return <span className="font-medium">{text}</span>;
        },
      },
      {
        accessorKey: "job_type",
        header: "HÌNH THỨC",
        cell: ({ row }) => (
          <Chip
            size="small"
            variant="outlined"
            label={row.original.job_type ?? "—"}
          />
        ),
      },
      {
        accessorKey: "views_count",
        header: "LƯỢT XEM",
        cell: ({ row }) => (
          <span className="text-gray-700 dark:text-gray-200">
            {row.original.views_count ?? 0}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "TRẠNG THÁI",
        cell: ({ row }) => {
          const s = row.original.status;
          const color =
            s === "ACTIVE" ? "success" : s === "DRAFT" ? "default" : "warning";
          return (
            <Chip
              size="small"
              color={color as any}
              label={s}
              sx={{ fontWeight: 600 }}
            />
          );
        },
      },
      {
        id: "dates",
        header: "NGÀY ĐĂNG / HẾT HẠN",
        cell: ({ row }) => {
          const formatDate = (iso?: string | null) => {
            if (!iso) return "—";
            const d = new Date(iso);
            return isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
          };
          return (
            <div className="text-xs leading-5">
              <div>Đăng: {formatDate(row.original.posted_at)}</div>
              <div>Hết hạn: {formatDate(row.original.expires_at)}</div>
            </div>
          );
        },
      },
    ],
    []
  );

  const columns = useMemo(
    () =>
      getColumns<Job>({
        onView,
        onEdit,
        onDelete,
        baseColumns,
      }),
    [onView, onEdit, onDelete, baseColumns]
  );

  return (
    <Box>
      {/* Header */}
      <Box className="mb-4 flex items-center justify-between">
        <BreadcrumbDisplay />
        <Button
          variant="contained"
          onClick={() => router.push("/admin/job/create")}
          sx={{ borderRadius: 999 }}
        >
          Đăng tin mới
        </Button>
      </Box>

      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        Quản lý việc làm
      </h1>
      <p className="text-sm text-gray-500 mb-5">
        Theo dõi, chỉnh sửa và tối ưu các tin tuyển dụng của bạn.
      </p>

      {/* Bộ lọc */}
      <Box
        className="grid gap-3 mb-5"
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr 160px 160px 160px 140px auto",
          },
        }}
      >
        <TextField
          label="Từ khóa"
          size="small"
          value={filter.keyword ?? ""}
          onChange={(e) =>
            setFilter((f) => ({ ...f, keyword: e.target.value, page: 1 }))
          }
        />
        <TextField
          label="Địa điểm"
          size="small"
          value={filter.location ?? ""}
          onChange={(e) =>
            setFilter((f) => ({ ...f, location: e.target.value, page: 1 }))
          }
        />
        <Select
          size="small"
          displayEmpty
          value={filter.jobType ?? ""}
          onChange={(e) =>
            setFilter((f) => ({
              ...f,
              jobType: (e.target.value || undefined) as any,
              page: 1,
            }))
          }
        >
          <MenuItem value="">
            <em>Hình thức</em>
          </MenuItem>
          {["Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"].map(
            (t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            )
          )}
        </Select>
        <Select
          size="small"
          value={filter.sortBy ?? "title"}
          onChange={(e) =>
            setFilter((f) => ({ ...f, sortBy: e.target.value as any, page: 1 }))
          }
        >
          {["title", "salary_min", "created_at", "views_count"].map((f) => (
            <MenuItem key={f} value={f}>
              {f}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={filter.sortOrder ?? "DESC"}
          onChange={(e) =>
            setFilter((f) => ({ ...f, sortOrder: e.target.value as any, page: 1 }))
          }
        >
          {["ASC", "DESC"].map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={filter.limit ?? 10}
          onChange={(e) =>
            setFilter((f) => ({
              ...f,
              limit: Number(e.target.value),
              page: 1,
            }))
          }
        >
          {[10, 20, 50, 100].map((n) => (
            <MenuItem key={n} value={n}>
              {n} / trang
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="outlined"
          onClick={() =>
            setFilter({
              keyword: "",
              location: "",
              sortBy: "title",
              sortOrder: "DESC",
              page: 1,
              limit: filter.limit ?? 10,
            })
          }
          sx={{ borderRadius: 999 }}
        >
          XÓA LỌC
        </Button>
      </Box>

      {/* Bảng */}
      <Box
        className="rounded-2xl"
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 8px 24px rgba(0,0,0,0.06)"
              : "none",
          background: (theme) =>
            theme.palette.mode === "light"
              ? "#fff"
              : "rgba(255,255,255,0.04)",
        }}
      >
        {isLoading ? (
          <div className="p-6 text-sm">Đang tải dữ liệu…</div>
        ) : isError ? (
          <div className="p-6 text-sm text-red-600">
            Lỗi tải dữ liệu.{" "}
            <Button size="small" onClick={() => refetch()}>
              Thử lại
            </Button>
          </div>
        ) : (
          <DataTable<Job, unknown> columns={columns} data={data} />
        )}

        {/* Footer */}
        <Box className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-600 dark:text-white">
            Tổng: <b>{total}</b> việc làm
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                setFilter((f) => ({ ...f, page: Math.max((f.page || 1) - 1, 1) }))
              }
              disabled={(filter.page || 1) <= 1}
              size="small"
              sx={{ borderRadius: 999 }}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600 dark:text-white">
              Page {filter.page} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setFilter((f) => ({
                  ...f,
                  page: Math.min((f.page || 1) + 1, totalPages),
                }))
              }
              disabled={(filter.page || 1) >= totalPages}
              size="small"
              sx={{ borderRadius: 999 }}
            >
              Next
            </Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

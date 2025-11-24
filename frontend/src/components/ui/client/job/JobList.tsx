"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpDown, Grid3X3, List } from "lucide-react";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { JobCard } from "./JobCard";
import { Job, JobFilter } from "@/api/Job/type";

interface JobListProps {
  jobs: Job[];
  filters: Partial<JobFilter>;
  searchQuery: string;
  onFiltersChange: (newFilters: Partial<JobFilter>) => void;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

type ViewMode = "grid" | "list";

/** ===== Sort typing khớp BE ===== */
type SortBy = "title" | "salary_min" | "created_at" | "views_count";

type SortOrder = "ASC" | "DESC";

type SortValue =
  | "newest"
  | "oldest"
  | "salary-high"
  | "salary-low"
  | "views"
  | "title-az"
  | "title-za";

type SortOption = {
  value: SortValue;
  label: string;
  apiField: SortBy;
  order: SortOrder;
};

const sortOptions: SortOption[] = [
  { value: "newest",     label: "Mới nhất",        apiField: "created_at", order: "DESC" },
  { value: "oldest",     label: "Cũ nhất",         apiField: "created_at", order: "ASC"  },
  // Removed salary_max as it's not supported by backend
  { value: "salary-low", label: "Lương thấp nhất", apiField: "salary_min", order: "ASC"  },
  { value: "views",      label: "Nhiều lượt xem",  apiField: "views_count",order: "DESC" },
  { value: "title-az",   label: "Tiêu đề A→Z",     apiField: "title",      order: "ASC"  },
  { value: "title-za",   label: "Tiêu đề Z→A",     apiField: "title",      order: "DESC" },
];
const toSortOrder = (v: unknown): SortOrder | undefined =>
  v === "ASC" || v === "DESC" ? v : undefined;

export function JobList({
  jobs,
  filters,
  onFiltersChange,
  onApply,
  onSave,
}: JobListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const handleSortChange = useCallback(
    (value: SortValue) => {
      const sortOption = sortOptions.find((opt) => opt.value === value);
      if (!sortOption) return;

      onFiltersChange({
        ...filters,
        sortBy: sortOption.apiField, // SortBy literal
        sortOrder: sortOption.order, // SortOrder literal
      });
    },
    [filters, onFiltersChange]
  );

  // Tính giá trị hiện tại của Select dựa vào filters từ props (đã có từ server/query string)
  const currentSortValue: SortValue =
    sortOptions.find(
      (o) =>
        o.apiField === (filters.sortBy as SortBy | undefined) &&
        o.order === toSortOrder(filters.sortOrder)
    )?.value ?? "newest";

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/50 backdrop-blur-sm rounded-lg p-4 border"
      >
        <div className="flex items-center gap-4">
          <h2>{jobs.length} việc làm được tìm thấy</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "contained" : "outlined"}
              color="warning"
              size="small"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "contained" : "outlined"}
              color="warning"
              size="small"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <Select
            value={currentSortValue}
            size="small"
            displayEmpty
            renderValue={(selected) =>
              selected
                ? sortOptions.find((o) => o.value === (selected as SortValue))?.label
                : <span style={{ color: "#9e9e9e" }}>Mới nhất</span>
            }
            onChange={(e: SelectChangeEvent<string>) =>
              handleSortChange(e.target.value as SortValue)
            }
            MenuProps={{ disableScrollLock: true }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </motion.div>

      {/* Job Grid/List */}
      <AnimatePresence mode="wait">
        {jobs.length > 0 ? (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {jobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onApply={onApply}
                onSave={onSave}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <List className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2">Không tìm thấy việc làm phù hợp</h3>
              <p className="text-muted-foreground">
                Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để tìm thấy
                nhiều cơ hội việc làm hơn.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

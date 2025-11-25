/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, X } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { JobFilter } from "@/api/Job/type";
import { JobCategory } from "@/api/JobCategory/type";
import { useDebounce } from "@/lib/hook/useDebounce";

interface JobFiltersProps {
  filters: Partial<JobFilter>;
  categories: JobCategory[];
  onFiltersChange: (filters: Partial<JobFilter>) => void;
  onSearch: (query: string) => void;
}

const JOB_TYPES = ["Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"];
const SALARY_RANGES = [
  { label: "Under 50 triệu", value: { salaryMin: 0, salaryMax: 50000000 } },
  { label: "50 - 75 triệu", value: { salaryMin: 50000000, salaryMax: 75000000 } },
  { label: "75 - 100 triệu", value: { salaryMin: 75000000, salaryMax: 100000000 } },
  { label: "100 - 150 triệu", value: { salaryMin: 100000000, salaryMax: 150000000 } },
  { label: "Above 150 triệu", value: { salaryMin: 150000000, salaryMax: undefined } },
];

/**
 * Component hiển thị bộ lọc tìm kiếm công việc, tích hợp với JobFilterSchema.
 * Sử dụng useDebounce để tối ưu hóa tìm kiếm.
 */
export function JobFilters({
  filters,
  categories,
  onFiltersChange,
  onSearch,
}: JobFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(filters.keyword || "");
  const [location, setLocation] = useState(filters.location || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)", { noSsr: true });
  const [mounted, setMounted] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedLocation = useDebounce(location, 500);

  // Sync lại local search/location khi filters từ parent thay đổi (reset, v.v.)
  useEffect(() => {
    setSearchQuery(filters.keyword || "");
  }, [filters.keyword]);

  useEffect(() => {
    setLocation(filters.location || "");
  }, [filters.location]);

  useEffect(() => setMounted(true), []);

  // Cập nhật keyword khi search debounce xong
  useEffect(() => {
    // Nếu filters.keyword đã đúng rồi thì không cần update nữa
    if (filters.keyword === debouncedSearchQuery) return;

    onFiltersChange({
      ...filters,
      keyword: debouncedSearchQuery || undefined,
    });
    onSearch(debouncedSearchQuery);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  // Cập nhật location khi debounce xong
  useEffect(() => {
    if (filters.location === debouncedLocation) return;

    onFiltersChange({
      ...filters,
      location: debouncedLocation || undefined,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLocation]);

  const show = isExpanded || isDesktop;
  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((a) => (Array.isArray(a) ? a.length > 0 : !!a)),
    [filters]
  );

  const addFilter = (
    type: keyof JobFilter,
    value: string | JobCategory | { salaryMin?: number; salaryMax?: number }
  ) => {
    const next: Partial<JobFilter> = { ...filters };
    if (type === "categoryId") {
      const v = value as JobCategory;
      next.categoryId = v.id;
    } else if (type === "salaryMin" || type === "salaryMax") {
      const v = value as { salaryMin?: number; salaryMax?: number };
      next.salaryMin = v.salaryMin;
      next.salaryMax = v.salaryMax;
    } else {
      const v = String(value);
      next[type] = v as any;
    }
    onFiltersChange(next);
  };

  const removeFilter = (type: keyof JobFilter) => {
    const next: Partial<JobFilter> = { ...filters };
    if (type === "categoryId") {
      next.categoryId = undefined;
    } else if (type === "salaryMin" || type === "salaryMax") {
      next.salaryMin = undefined;
      next.salaryMax = undefined;
    } else {
      next[type] = undefined;
    }
    onFiltersChange(next);
  };

  const clearAll = () => {
    onFiltersChange({
      page: 1,
      limit: 10,
      sortBy: "title",
      sortOrder: "DESC",
    });
    setSearchQuery("");
    setLocation("");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(debouncedSearchQuery);
  };

  const SelectFilter = ({
    label,
    placeholder,
    items,
    onPick,
  }: {
    label: string;
    placeholder: string;
    items: { value: string | { salaryMin?: number; salaryMax?: number }; label: string }[];
    onPick: (val: string | { salaryMin?: number; salaryMax?: number }) => void;
    valueKey: keyof JobFilter;
  }) => (
    <div>
      <label className="text-sm mb-2 block">{label}</label>
      <Select
        value=""
        className="w-full"
        displayEmpty
        renderValue={() => <span style={{ color: "#9e9e9e" }}>{placeholder}</span>}
        onChange={(e: SelectChangeEvent<string>) => {
          const v = e.target.value as string;
          if (v) {
            const item = items.find((i) => i.value === v || i.label === v);
            if (item) onPick(item.value);
          }
        }}
        MenuProps={{ disableScrollLock: true }}
      >
        <MenuItem value="" disabled sx={{ display: "none" }}>
          {placeholder}
        </MenuItem>
        {items.map((it) => (
          <MenuItem
            key={it.label}
            value={typeof it.value === "string" ? it.value : it.label}
          >
            {it.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="sticky top-4">
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h3>Bộ lọc tìm kiếm</h3>
            </div>
          }
          action={
            <Button
              variant="outlined"
              size="small"
              color="warning"
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              {isExpanded ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
            </Button>
          }
        />

        {/* Search */}
        <CardContent>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm công việc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  px: 1,
                  height: 40,
                }}
              />
            </div>
            <Button type="submit" size="small" variant="contained" color="warning">
              Tìm
            </Button>
          </form>
        </CardContent>

        {/* Filters */}
        <motion.div
          initial={false}
          animate={{
            height: mounted ? (show ? "auto" : 0) : 0,
            opacity: mounted ? (show ? 1 : 0) : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden md:h-auto md:opacity-100"
        >
          <CardContent className="space-y-6">
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Bộ lọc đang áp dụng:</span>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={clearAll}
                    className="text-xs h-6 px-2"
                  >
                    Xóa tất cả
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {filters.jobType && (
                    <Badge variant="standard" className="text-xs">
                      {filters.jobType}
                      <Button
                        onClick={() => removeFilter("jobType")}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  )}
                  {filters.categoryId &&
                    categories.find((c) => c.id === filters.categoryId) && (
                      <Badge variant="standard" className="text-xs">
                        {categories.find((c) => c.id === filters.categoryId)?.name}
                        <Button
                          onClick={() => removeFilter("categoryId")}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    )}
                  {(filters.salaryMin || filters.salaryMax) && (
                    <Badge variant="standard" className="text-xs">
                      {SALARY_RANGES.find(
                        (r) =>
                          r.value.salaryMin === filters.salaryMin &&
                          r.value.salaryMax === filters.salaryMax
                      )?.label ||
                        `${filters.salaryMin || 0} - ${
                          filters.salaryMax || "∞"
                        } VNĐ`}
                      <Button
                        onClick={() => removeFilter("salaryMin")}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  )}
                  {filters.location && (
                    <Badge variant="standard" className="text-xs">
                      {filters.location}
                      <Button
                        onClick={() => removeFilter("location")}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}

            {/* Selects */}
            <SelectFilter
              label="Loại công việc"
              placeholder="Chọn loại"
              items={JOB_TYPES.map((v) => ({ value: v, label: v }))}
              onPick={(v) => addFilter("jobType", v)}
              valueKey="jobType"
            />

            <SelectFilter
              label="Danh mục"
              placeholder="Chọn danh mục"
              items={categories.map((c) => ({ value: c.id, label: c.name }))}
              onPick={(id) => {
                const cat = categories.find((c) => c.id === id);
                if (cat) addFilter("categoryId", cat);
              }}
              valueKey="categoryId"
            />

            <SelectFilter
              label="Mức lương"
              placeholder="Chọn mức lương"
              items={SALARY_RANGES}
              onPick={(v) => addFilter("salaryMin", v)}
              valueKey="salaryMin"
            />

            <div>
              <label className="text-sm mb-2 block">Địa điểm</label>
              <Input
                placeholder="Nhập địa điểm..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const v = (e.target as HTMLInputElement).value.trim();
                    if (v) {
                      addFilter("location", v);
                      setLocation("");
                    }
                  }
                }}
                className="w-full"
              />
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}

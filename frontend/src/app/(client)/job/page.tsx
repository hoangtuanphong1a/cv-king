"use client";
import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Box, Container, Typography } from "@mui/material";
import { HeroSection } from "@/components/ui/client/job/HeroSection";
import { JobFilters } from "@/components/ui/client/job/JobFilters";
import { JobList } from "@/components/ui/client/job/JobList";
import { FeaturedCompanies } from "@/components/ui/client/job/FeaturedCompanies";
import { mockCompanies } from "@/faker/data";
import { useDebounce } from "@/lib/hook/useDebounce";
import { useJobsQuery } from "@/api/Job/query";
import { JobFilter } from "@/api/Job/type";
import { useJobCategoriesQuery } from "@/api/JobCategory/query";
import { useRouter } from "next/navigation";

const JobsPage = () => {
  const [filters, setFilters] = useState<Partial<JobFilter>>({
    page: 1,
    limit: 10,
    sortBy: "title",
    sortOrder: "DESC",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const router = useRouter();

  const { data: jobs = [] } = useJobsQuery({
    ...filters,
    keyword: debouncedSearchQuery,
  });
  console.log("data", jobs);
  
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useJobCategoriesQuery();

  const totalJobs = jobs.length;
  

  const handleApply = useCallback(
    (jobId: string) => {
      router.push(`/job/${jobId}`);
    },
    [router]
  );

  const handleSave = useCallback(
    (jobId: string) => {
      const job = jobs.find((j) => j.id === jobId);
      if (job) {
        console.log(`Saved job: ${job.title}`);
      }
    },
    [jobs]
  );

  const handleSearch = useCallback((query: string, location?: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({
      ...prev,
      location: location?.trim() || prev.location,
      page: 1,
    }));
    const el = document.getElementById("job-results");
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const handleFiltersChange = useCallback((newFilters: Partial<JobFilter>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  }, []);

  const featuredCompanies = mockCompanies.map((company) => ({
    name: company.name,
    logo: company.logo,
    rating: company.rating,
  }));

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <HeroSection
        onSearch={handleSearch}
        totalJobs={totalJobs}
        featuredCompanies={featuredCompanies}
      />

      {/* Featured Companies Section */}
      <FeaturedCompanies companies={mockCompanies} />

      {/* Main Job Listing Section */}
      <Box component="main" id="job-results">
        <Container maxWidth="xl" className="py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box textAlign="center" mb={6}>
              <Typography
                variant="h3"
                component="h3"
                className="mb-2 text-xl font-bold"
              >
                Danh sách việc làm
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: "600px", mx: "auto" }}
              >
                Tìm kiếm và ứng tuyển vào các vị trí phù hợp với kỹ năng và kinh
                nghiệm của bạn
              </Typography>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 4,
            }}
          >
            {/* Filters Sidebar */}
            <Box sx={{ width: { lg: "320px" }, flexShrink: 0 }}>
              {isCategoriesLoading ? (
                <Typography>Đang tải danh mục...</Typography>
              ) : (
                <JobFilters
                  filters={filters}
                  categories={categories}
                  onFiltersChange={handleFiltersChange}
                  onSearch={setSearchQuery}
                />
              )}
            </Box>

            {/* Job List */}
            <Box sx={{ flex: 1 }}>
              <JobList
                jobs={jobs}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                searchQuery={debouncedSearchQuery}
                onApply={handleApply}
                onSave={handleSave}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default JobsPage;

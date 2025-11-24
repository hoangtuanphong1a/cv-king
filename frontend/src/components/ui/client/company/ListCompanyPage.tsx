"use client";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Grid as GridIcon,
  List as ListIcon,
  Users,
  Star,
} from "lucide-react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Pagination,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  CardMedia,
  Divider,
  RadioGroup,
  Radio,
} from "@mui/material";
import { CompanyResponse } from "@/api/Company/type";
import { useCompaniesQuery } from "@/api/Company/query";

// --- DỮ LIỆU CHO CÁC BỘ LỌC ---
const industryOptions = [
  { value: "Công nghệ", label: "Công nghệ" },
  { value: "Tài chính", label: "Tài chính" },
  { value: "Năng lượng", label: "Năng lượng" },
  { value: "Vận tải", label: "Vận tải" },
  { value: "Y tế", label: "Y tế" },
  { value: "Giáo dục", label: "Giáo dục" },
  { value: "Bất động sản", label: "Bất động sản" },
  { value: "Bán lẻ", label: "Bán lẻ" },
];

const Locations = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "TP. Hồ Chí Minh",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

const companySizeOptions = [
  "20-50",
  "50-100",
  "100-200",
  "200-500",
  "500-1000",
  "1000+",
  "2000+",
  "5000+",
  "10000+",
];

const benefitOptions = [
  "Bảo hiểm sức khỏe",
  "Làm việc từ xa",
  "Ngày nghỉ linh hoạt",
  "Trợ cấp ăn trưa",
  "Lương tháng 13",
];

type NormalizedCompany = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employees: string;
  benefits: string[];
  description?: string | null;
};

const normalizeBenefits = (benefits: CompanyResponse["benefits"]): string[] => {
  if (!benefits) return [];
  if (Array.isArray(benefits)) return benefits;
  if (typeof benefits === "string") {
    return benefits
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);
  }
  return [];
};

const ListCompanyPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const companiesPerPage = 9;

  const {
    data: apiCompanies = [],
    isLoading,
    isError,
  } = useCompaniesQuery();

  const allCompanies: NormalizedCompany[] = useMemo(
    () =>
      apiCompanies.map((c) => ({
        id: c.id,
        name: c.name,
        logo:
          c.logoUrl ??
          "https://placehold.co/120x120?text=Company", // fallback
        industry: c.industry ?? "Không xác định",
        location: c.location ?? "Không rõ",
        employees: c.companySize ?? "Chưa cập nhật",
        benefits: normalizeBenefits(c.benefits),
        description: c.description ?? "",
      })),
    [apiCompanies]
  );

  // 1. State cho các input của thanh tìm kiếm chính
  const [mainFilterInputs, setMainFilterInputs] = useState({
    keyword: "",
    location: "",
    industry: "",
  });

  // 2. State cho các input của bộ lọc chi tiết (sidebar)
  const [sidebarFilters, setSidebarFilters] = useState({
    companySizes: [] as string[],
    benefits: [] as string[],
  });

  // 3. Kết quả sau khi bấm "Tìm kiếm"
  const [searchedCompanies, setSearchedCompanies] =
    useState<NormalizedCompany[]>([]);

  // 4. Kết quả cuối cùng hiển thị
  const [displayedCompanies, setDisplayedCompanies] =
    useState<NormalizedCompany[]>([]);

  // Khi data API về, khởi tạo list
  useEffect(() => {
    setSearchedCompanies(allCompanies);
    setDisplayedCompanies(allCompanies);
  }, [allCompanies]);

  // TextField keyword
  const handleKeywordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMainFilterInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Select (location, industry)
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target as { name: string; value: string };
    setMainFilterInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSidebarCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = e.target;
    setSidebarFilters((prev) => {
      const list = prev[name as "companySizes" | "benefits"] as string[];
      if (checked) return { ...prev, [name]: [...list, value] };
      return { ...prev, [name]: list.filter((item) => item !== value) };
    });
  };

  // 5. Khi bấm nút Tìm kiếm
  // 5. Khi bấm nút Tìm kiếm
const handleSearchClick = () => {
  let result = allCompanies;

  const keyword = mainFilterInputs.keyword.trim().toLowerCase();
  const location = mainFilterInputs.location.trim().toLowerCase();
  const industry = mainFilterInputs.industry.trim().toLowerCase();

  // Tìm theo keyword: name + industry + location
  if (keyword) {
    result = result.filter((company) => {
      const name = company.name.toLowerCase();
      const ind = company.industry.toLowerCase();
      const loc = company.location.toLowerCase();

      return (
        name.includes(keyword) ||
        ind.includes(keyword) ||
        loc.includes(keyword)
      );
    });
  }

  // Lọc theo location từ dropdown
  if (location) {
    result = result.filter((company) =>
      company.location.toLowerCase().includes(location)
    );
  }

  // Lọc theo industry từ dropdown
  if (industry) {
    result = result.filter((company) =>
      company.industry.toLowerCase().includes(industry)
    );
  }

  setSearchedCompanies(result);
  setCurrentPage(1);
};


  // 6. Lọc theo sidebar
  useEffect(() => {
    let result = searchedCompanies;

    if (sidebarFilters.companySizes.length > 0) {
      result = result.filter((company) =>
        sidebarFilters.companySizes.includes(company.employees)
      );
    }

    if (sidebarFilters.benefits.length > 0) {
      result = result.filter((company) =>
        sidebarFilters.benefits.every((benefit) =>
          company.benefits.includes(benefit)
        )
      );
    }

    setDisplayedCompanies(result);
    setCurrentPage(1);
  }, [searchedCompanies, sidebarFilters]);

  const totalPages = Math.ceil(
    displayedCompanies.length / companiesPerPage
  );

  const currentCompanies = displayedCompanies.slice(
    (currentPage - 1) * companiesPerPage,
    currentPage * companiesPerPage
  );

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", textAlign: "center", py: 10 }}>
        <Typography>Đang tải danh sách công ty...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ width: "100%", textAlign: "center", py: 10 }}>
        <Typography color="error">
          Có lỗi xảy ra khi tải danh sách công ty.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f3f4f6", py: 4 }}>
      {/* SEARCH BAR */}
      <Box sx={{ width: "1520px", mx: "auto", px: 3 }}>
        <Card
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr auto" },
            boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
            border: "1px solid #e5e7eb",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "2fr 1fr 1fr auto",
              },
              gap: 2.5,
              alignItems: "center",
            }}
          >
            {/* keyword */}
            <TextField
              name="keyword"
              value={mainFilterInputs.keyword}
              onChange={handleKeywordChange}
              placeholder="Company name or industry"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#f5f5f7",
                  borderRadius: 2,
                  "& fieldset": { border: "none" },
                },
              }}
            />

            {/* location */}
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#f5f5f7",
                  borderRadius: 2,
                  "& fieldset": { border: "none" },
                },
              }}
            >
              <Select
                name="location"
                value={mainFilterInputs.location}
                onChange={handleSelectChange}
                displayEmpty
                renderValue={(selected) =>
                  selected === "" ? (
                    <Typography sx={{ color: "text.secondary" }}>
                      All locations
                    </Typography>
                  ) : (
                    selected as string
                  )
                }
              >
                <MenuItem value="">
                  <Typography color="text.secondary">
                    All locations
                  </Typography>
                </MenuItem>
                {Locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* industry */}
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  "&.MuiInputLabel-root": {
                    color: "#9ca3af",
                  },
                }}
              >
                Industry
              </InputLabel>
              <Select
                name="industry"
                value={mainFilterInputs.industry}
                onChange={handleSelectChange}
                label="Industry"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#f5f5f7",
                  },
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": {
                    border: "2px solid #ff7a2b",
                    bgcolor: "#ffffff",
                  },
                }}
              >
                <MenuItem value="">
                  <em>All industries</em>
                </MenuItem>
                {industryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* search button */}
            <Button
              onClick={handleSearchClick}
              variant="contained"
              sx={{
                height: 56,
                textTransform: "none",
                borderRadius: 3,
                px: 5,
                fontWeight: 600,
                fontSize: 16,
                bgcolor: "#ff7a2b",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  bgcolor: "#f16311",
                },
              }}
            >
              <Search size={18} />
              Search
            </Button>
          </Box>
        </Card>
      </Box>

      {/* BODY */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
          width: "1520px",
          mx: "auto",
          px: 3,
        }}
      >
        {/* FILTERS SIDEBAR */}
        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            width: { xs: "100%", md: "22%" },
            alignSelf: "flex-start",
            boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
            border: "1px solid #e5e7eb",
            bgcolor: "#ffffff",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Filters
          </Typography>

          {/* Company size */}
          <Typography
            fontWeight="medium"
            sx={{ mb: 1.5, fontSize: 14, color: "#4b5563" }}
          >
            Company Size
          </Typography>
          {companySizeOptions.map((size) => (
            <FormControlLabel
              key={size}
              control={
                <Checkbox
                  name="companySizes"
                  value={size}
                  onChange={handleSidebarCheckboxChange}
                  size="small"
                />
              }
              label={`${size} nhân viên`}
              sx={{
                display: "block",
                "& .MuiTypography-root": { fontSize: 14 },
              }}
            />
          ))}

          <Divider sx={{ my: 3 }} />

          {/* Benefits */}
          <Typography
            fontWeight="medium"
            sx={{ mb: 1.5, fontSize: 14, color: "#4b5563" }}
          >
            Benefits
          </Typography>
          {benefitOptions.map((benefit) => (
            <FormControlLabel
              key={benefit}
              control={
                <Checkbox
                  name="benefits"
                  value={benefit}
                  onChange={handleSidebarCheckboxChange}
                  size="small"
                />
              }
              label={benefit}
              sx={{
                display: "block",
                "& .MuiTypography-root": { fontSize: 14 },
              }}
            />
          ))}
        </Card>

        {/* LIST */}
        <Box sx={{ width: { xs: "100%", md: "75%" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography>
              Hiển thị <strong>{displayedCompanies.length}</strong> công ty
            </Typography>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_e, newMode) =>
                newMode && setViewMode(newMode)
              }
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {currentCompanies.length > 0 ? (
            viewMode === "grid" ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    lg: "1fr 1fr 1fr",
                  },
                  gap: 2,
                }}
              >
                {currentCompanies.map((company) => {
                  const baseCardSx = {
                    display: "flex",
                    flexDirection: "column" as const,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "#e5e7eb",
                    bgcolor: "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                  };

                  const hoverCardSx = {
                    borderColor: "#ff8a2b",
                    bgcolor: "#ffffff",
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
                  };

                  return (
                    <Card
                      key={company.id}
                      onClick={() =>
                        router.push(`/companies/${company.id}`)
                      }
                      sx={{
                        ...baseCardSx,
                        "&:hover": hoverCardSx,
                      }}
                    >
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          p: 3,
                          alignItems: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={company.logo}
                          sx={{
                            width: 72,
                            height: 72,
                            borderRadius: 2,
                            mb: 2,
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            mb: 1.5,
                            minHeight: 40,
                          }}
                        >
                          <Typography
                            fontWeight="bold"
                            component="h3"
                            sx={{ textAlign: "center" }}
                          >
                            {company.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.75,
                            my: 1,
                            color: "text.secondary",
                            fontSize: 14,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <MapPin size={16} />
                            <Typography variant="body2">
                              {company.location}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Users size={16} />
                            <Typography variant="body2">
                              {company.employees} nhân viên
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Star size={16} />
                            <Typography variant="body2">
                              {/* Không có rating, hiển thị tổng benefit */}
                              {company.benefits.length > 0
                                ? `${company.benefits.length} phúc lợi`
                                : "Chưa cập nhật phúc lợi"}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            mb: 2,
                            minHeight: 40,
                          }}
                        >
                          {company.description}
                        </Typography>

                        <Divider sx={{ my: 1.5, width: "100%" }} />

                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/companies/${company.id}`);
                          }}
                          sx={{
                            mt: 1,
                            textTransform: "none",
                            borderRadius: 999,
                            border: "1px solid #ff8a2b",
                            color: "#ff8a2b",
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            bgcolor: "transparent",
                            "&:hover": {
                              bgcolor: "#ff8a2b",
                              color: "#ffffff",
                            },
                          }}
                        >
                          Xem việc làm
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            ) : (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {currentCompanies.map((company) => (
                  <Card
                    key={company.id}
                    sx={{
                      borderRadius: 2,
                      transition: "0.2s",
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        p: 2,
                        gap: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={company.logo}
                        onClick={() =>
                          router.push(`/company/${company.id}`)
                        }
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 1.5,
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flexGrow: 1, width: "100%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            onClick={() =>
                              router.push(`/company/${company.id}`)
                            }
                            sx={{ cursor: "pointer" }}
                          >
                            {company.name}
                          </Typography>
                          {/* Không còn isTopCompany vì type không có */}
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {company.industry}
                        </Typography>
                        <Box
                          sx={{
                            color: "text.secondary",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <MapPin size={16} />
                            <Typography variant="body2">
                              {company.location}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Users size={16} />
                            <Typography variant="body2">
                              {company.employees} nhân viên
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Star size={16} />
                            <Typography variant="body2">
                              {company.benefits.length > 0
                                ? `${company.benefits.length} phúc lợi`
                                : "Chưa cập nhật phúc lợi"}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: "italic" }}
                        >
                          {company.description}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() =>
                          router.push(`/company/${company.id}/jobs`)
                        }
                        sx={{
                          mt: { xs: 2, sm: 0 },
                          textTransform: "none",
                          bgcolor: "#000",
                          "&:hover": { bgcolor: "#333" },
                          flexShrink: 0,
                        }}
                      >
                        Xem việc làm
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )
          ) : (
            <Card sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Typography variant="h6">
                Không tìm thấy công ty phù hợp
              </Typography>
              <Typography color="text.secondary">
                Vui lòng thử lại với các từ khóa hoặc bộ lọc khác.
              </Typography>
            </Card>
          )}

          {displayedCompanies.length > companiesPerPage && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4 }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_e, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ListCompanyPage;

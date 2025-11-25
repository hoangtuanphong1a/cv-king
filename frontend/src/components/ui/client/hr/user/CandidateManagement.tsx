"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Button,
  Divider,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
} from "@mui/material";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Eye,
  Download,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  UserCheck,
  UserPlus,
} from "lucide-react";

import { useMyProfileQuery } from "@/api/user/query";
import {
  useJobApplicationsByCompanyQuery,
  useUpdateJobApplicationMutation,
} from "@/api/JobApplication/query";
import { useEmployerProfileByUserIdQuery } from "@/api/employer-profile/query";
import { useRouter } from "next/navigation";
import { useJobSeekerProfileByUserIdQuery } from "@/api/jobseeker-profile/query";
import { getJobSeekerProfileByUserIdRequest } from "@/api/jobseeker-profile/request";

const statusMap = {
  Pending: { label: "Mới", color: "#3b82f6", icon: <AlertCircle size={14} /> },
  Reviewed: {
    label: "Đạt yêu cầu",
    color: "#f59e0b",
    icon: <Star size={14} />,
  },
  Interview: {
    label: "Đã phỏng vấn",
    color: "#8b5cf6",
    icon: <UserCheck size={14} />,
  },
  Rejected: { label: "Từ chối", color: "#ef4444", icon: <XCircle size={14} /> },
  Hired: {
    label: "Đã tuyển",
    color: "#10b981",
    icon: <CheckCircle size={14} />,
  },
} as const;

interface Candidate {
  id: string;
  jobId: string;
  jobSeekerId: string;
  fullName: string;
  email: string;
  status: string;
  jobTitle: string;
  companyName: string;
  location: string;
  experienceYears: number;
  appliedAt: string;
  skills?: string[];
}

const CandidateManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [status, setStatus] = useState<string>("Pending");
  const [profiles, setProfiles] = useState<Record<string, any>>({});

  const { data: user } = useMyProfileQuery();
  const userId = user?.id;
  const { data: employerProfile } = useEmployerProfileByUserIdQuery(userId);
  const companyId = employerProfile?.company;
  const { data: applications = [], refetch } =
    useJobApplicationsByCompanyQuery(companyId);

  const { mutateAsync: updateJobApplication, isPending } =
    useUpdateJobApplicationMutation({
      onSuccess: () => {
        setOpen(false);
        refetch();
      },
    });

  const jobSeekerId = selectedCandidate?.jobSeekerId;
  const { data: jobSeekerProfile, isLoading: loadingProfile } =
    useJobSeekerProfileByUserIdQuery(jobSeekerId);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!applications.length) return;
      const results: Record<string, any> = {};
      for (const app of applications) {
        if (app.jobSeekerId && !results[app.jobSeekerId]) {
          try {
            const profile = await getJobSeekerProfileByUserIdRequest(
              app.jobSeekerId
            );
            results[app.jobSeekerId] = profile;
          } catch {
            results[app.jobSeekerId] = null;
          }
        }
      }
      setProfiles(results);
    };
    fetchProfiles();
  }, [applications]);

  const candidates = useMemo((): Candidate[] => {
    return applications.map((a: any, index: number) => {
      const profile = profiles[a.jobSeekerId];

      return {
        id: a.id ?? `app-${index}`,
        jobId: a.jobId ?? "",
        jobSeekerId: a.jobSeekerId ?? "",
        fullName: profile?.fullName ?? a.fullName ?? "Ứng viên chưa có tên",
        email: profile?.email ?? a.email ?? "Chưa cập nhật",
        status: a.status ?? "Pending",
        jobTitle: profile?.currentTitle ?? a.jobTitle ?? "Chưa cập nhật",
        companyName: a.companyName ?? "Chưa có tên công ty",
        location: profile?.location ?? a.location ?? "Chưa cập nhật",
        experienceYears: profile?.yearsExperience ?? a.experienceYears ?? 0,
        appliedAt: a.appliedAt ?? new Date().toISOString(),
        skills: profile?.skills ?? a.skills ?? [],
        avatarUrl: profile?.avatarUrl ?? null,
      };
    });
  }, [applications, profiles]);

  const filteredCandidates = useMemo(() => {
    if (!searchTerm) return candidates;
    const lower = searchTerm.toLowerCase();
    return candidates.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(lower) ||
        c.jobTitle?.toLowerCase().includes(lower)
    );
  }, [candidates, searchTerm]);

  const stats = useMemo(
    () => ({
      moi: candidates.filter((c) => c.status === "Pending").length,
      dat_yeu_cau: candidates.filter((c) => c.status === "Reviewed").length,
      da_phong_van: candidates.filter((c) => c.status === "Interview").length,
      da_tuyen: candidates.filter((c) => c.status === "Hired").length,
    }),
    [candidates]
  );

  const handleOpenEdit = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setStatus(candidate.status);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!selectedCandidate) return;
    await updateJobApplication({
      id: selectedCandidate.id,
      jobId: selectedCandidate.jobId,
      jobSeekerId: selectedCandidate.jobSeekerId,
      coverLetter: "",
      status: status as
        | "Pending"
        | "Reviewed"
        | "Interview"
        | "Rejected"
        | "Hired",
    });
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Quản lý ứng viên ({candidates.length})
        </Typography>
        <TextField
          placeholder="Tìm kiếm ứng viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: 320,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 1,
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          {
            label: "Hồ sơ mới",
            value: stats.moi,
            color: "#2563eb",
            icon: <UserPlus size={18} />,
          },
          {
            label: "Đạt yêu cầu",
            value: stats.dat_yeu_cau,
            color: "#f59e0b",
            icon: <Star size={18} />,
          },
          {
            label: "Đã phỏng vấn",
            value: stats.da_phong_van,
            color: "#8b5cf6",
            icon: <UserCheck size={18} />,
          },
          {
            label: "Đã tuyển",
            value: stats.da_tuyen,
            color: "#10b981",
            icon: <CheckCircle size={18} />,
          },
        ].map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                height: 120,
                width: 300,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
                "&:hover": { boxShadow: 5, transform: "translateY(-3px)" },
                transition: "0.25s",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <Box
                    sx={{
                      bgcolor: `${s.color}15`,
                      borderRadius: "50%",
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {s.icon}
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: s.color }}
                >
                  {s.value}
                </Typography>
                <Typography color="text.secondary" fontSize={14}>
                  {s.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Candidate Cards */}
      <Stack spacing={2}>
        {filteredCandidates.map((candidate, index) => (
          <Card
            key={candidate.id ?? `candidate-${index}`}
            sx={{
              borderRadius: 3,
              boxShadow: 1,
              "&:hover": { boxShadow: 4 },
              transition: "0.2s",
              p: 1,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Header row */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "#e0e7ff",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  {candidate.fullName?.charAt(0) ?? "?"}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {candidate.fullName}
                  </Typography>
                  <Typography color="text.secondary">
                    {candidate.jobTitle}
                  </Typography>
                </Box>

                <Chip
                  label={
                    statusMap[candidate.status as keyof typeof statusMap]
                      ?.label ?? "Mới"
                  }
                  icon={
                    statusMap[candidate.status as keyof typeof statusMap]?.icon
                  }
                  sx={{
                    bgcolor: `${
                      statusMap[candidate.status as keyof typeof statusMap]
                        ?.color
                    }15`,
                    color:
                      statusMap[candidate.status as keyof typeof statusMap]
                        ?.color,
                    fontWeight: "bold",
                  }}
                />
              </Box>

              {/* Info */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  color: "text.secondary",
                  mb: 2,
                  fontSize: 14,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MapPin size={14} /> {candidate.location}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Briefcase size={14} /> {candidate.experienceYears} năm KN
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Calendar size={14} /> Nộp:{" "}
                  {new Date(candidate.appliedAt).toLocaleDateString("vi-VN")}
                </Box>
              </Box>

              {/* Skills */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {candidate.skills?.map((skill, i) => (
                  <Chip
                    key={i}
                    label={skill}
                    size="small"
                    sx={{
                      borderRadius: "8px",
                      bgcolor: "#f3f4f6",
                      fontSize: 13,
                      height: 28,
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Buttons */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {[
                  { label: "Xem hồ sơ", icon: <Eye size={16} /> },
                  { label: "Tải CV", icon: <Download size={16} /> },
                  { label: "Liên hệ", icon: <MessageSquare size={16} /> },
                ].map((btn, i) => (
                  <Button
                    key={i}
                    size="small"
                    variant="outlined"
                    startIcon={btn.icon}
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "#111827",
                      borderColor: "#d1d5db",
                      borderRadius: "8px",
                      "&:hover": {
                        bgcolor: "#f3f4f6",
                        borderColor: "#9ca3af",
                      },
                    }}
                  >
                    {btn.label}
                  </Button>
                ))}
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Calendar size={16} />}
                  sx={{
                    bgcolor: "#f97316",
                    "&:hover": { bgcolor: "#ea580c" },
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Hẹn phỏng vấn
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<CheckCircle size={16} />}
                  sx={{
                    bgcolor: "#2563eb",
                    "&:hover": { bgcolor: "#1e40af" },
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleOpenEdit(candidate)}
                >
                  Chỉnh sửa
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Cập nhật trạng thái ứng viên</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={status}
              label="Trạng thái"
              onChange={(e) => setStatus(e.target.value)}
            >
              {Object.keys(statusMap).map((key) => (
                <MenuItem key={key} value={key}>
                  {statusMap[key as keyof typeof statusMap].label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            variant="contained"
            sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1e40af" } }}
          >
            {isPending ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CandidateManagement;

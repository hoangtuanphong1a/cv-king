"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  ArrowLeft,
  Upload,
  Plus,
  Camera,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Box,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useMyProfileQuery, useUpdateUserMutation } from "@/api/user/query";
import { useUpdateFileMutation, useUploadFileMutation } from "@/api/cloudinary/query";
import {
  useJobSeekerProfileByUserIdQuery,
  useUpdateJobSeekerProfileMutation,
} from "@/api/jobseeker-profile/query";

const toast = (message: string) => alert(message);

const EditProfilePage = () => {
  const router = useRouter();
  const { data: user, isLoading: loadingProfile } = useMyProfileQuery();
  const { mutateAsync: updateUser, isPending: updatingUser } = useUpdateUserMutation({
    onSuccess: () => toast("Cập nhật thông tin tài khoản thành công!"),
    onError: (err: Error) => toast(`Lỗi User: ${err.message}`),
  });
  const { data: jobSeekerProfile } = useJobSeekerProfileByUserIdQuery(user?.id);
  const { mutateAsync: updateJobSeekerProfile, isPending: updatingProfile } = useUpdateJobSeekerProfileMutation({
    onSuccess: () => toast("Cập nhật hồ sơ ứng viên thành công!"),
    onError: (err: Error) => toast(`Lỗi hồ sơ: ${err.message}`),
  });

  const [jobSeekerData, setJobSeekerData] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const { mutateAsync: uploadFile } = useUploadFileMutation();
  const { mutateAsync: updateFile } = useUpdateFileMutation();

  // Khởi tạo dữ liệu từ user + jobSeekerProfile
  useEffect(() => {
    if (user && jobSeekerProfile) {
      setJobSeekerData({
        id: jobSeekerProfile.id,
        name: jobSeekerProfile.fullName || user.displayName || "",
        email: user.email || "",
        dob: jobSeekerProfile.dob || "",
        currentTitle: jobSeekerProfile.currentTitle || "",
        phone: jobSeekerProfile.phone || "",
        avatar: user.avatarUrl || "",
        location: jobSeekerProfile.location || "",
        summary: jobSeekerProfile.summary || "",
        yearsExperience: jobSeekerProfile.yearsExperience || "",
      });
      setSkills(jobSeekerProfile.skills || []);
    }
  }, [user, jobSeekerProfile]);

  const handleJobSeekerChange = (field: string, value: string | number) => {
    setJobSeekerData((p: any) => ({ ...p, [field]: value }));
    setHasChanges(true);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
      setHasChanges(true);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
    setHasChanges(true);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    try {
      let result;
      if (user?.avatarUrl) {
        result = await updateFile({ file, publicId: user.avatarUrl, folder: "avatars" });
      } else {
        result = await uploadFile({ file, folder: "avatars" });
      }
      setJobSeekerData((p: any) => ({ ...p, avatar: result.url }));
      setHasChanges(true);
      toast("Cập nhật ảnh đại diện thành công!");
    } catch (err) {
      toast(`Lỗi upload ảnh: ${(err as Error).message}`);
    }
  };
  const handleSave = async () => {
    if (!user || !jobSeekerData) return;

    try {
      // Cập nhật bảng User
      await updateUser({
        displayName: jobSeekerData.name,
        email: jobSeekerData.email,
        avatarUrl: jobSeekerData.avatar,
      });

      // Cập nhật bảng JobSeekerProfile
      await updateJobSeekerProfile({
        id: jobSeekerData.id,
        fullName: jobSeekerData.name,
        phone: jobSeekerData.phone,
        dob: jobSeekerData.dob,
        currentTitle: jobSeekerData.currentTitle,
        yearsExperience: jobSeekerData.yearsExperience,
        location: jobSeekerData.location,
        summary: jobSeekerData.summary,
        skills,
      });

      toast("Updated !");
      setHasChanges(false);
      router.back();
    } catch (err) {
      toast(`Lỗi lưu: ${(err as Error).message}`);
    }
  };

  if (loadingProfile || !jobSeekerData) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }

  const saving = updatingUser || updatingProfile;

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: { xs: 2, md: 5 } }}>
      <Box sx={{ width: "100%", maxWidth: "960px", mx: "auto", px: { xs: 2, sm: 4 } }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Button
              onClick={() => router.back()}
              sx={{ textTransform: "none", color: "text.primary", "&:hover": { bgcolor: "action.hover" }, mr: 2 }}
            >
              <ArrowLeft size={16} style={{ marginRight: 8 }} />
              Quay lại
            </Button>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="600">
                Chỉnh sửa hồ sơ
              </Typography>
              <Typography color="text.secondary">Cập nhật thông tin của bạn bên dưới</Typography>
            </Box>
          </Box>
          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "#000000",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "#333333" },
              "&.Mui-disabled": { bgcolor: "grey.300", color: "grey.500" },
            }}
          >
            {saving ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <Save size={16} style={{ marginRight: 8 }} /> Lưu thay đổi
              </>
            )}
          </Button>
        </Box>

        {/* Ảnh đại diện */}
        <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", boxShadow: "none", mb: 3 }}>
          <CardHeader title="Ảnh đại diện" subheader="Cập nhật ảnh đại diện của bạn." />
          <CardContent sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 4 } }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={jobSeekerData.avatar}
                sx={{ width: 96, height: 96, border: "3px solid white", boxShadow: 2 }}
              />
              <Box
                component="label"
                htmlFor="avatar-upload"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "background.paper",
                  borderRadius: "50%",
                  p: 0.5,
                  cursor: "pointer",
                  boxShadow: 1,
                  display: "flex",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <Camera size={20} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarUpload}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Thông tin cá nhân */}
        <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", boxShadow: "none", mb: 3 }}>
          <CardHeader title="Thông tin cá nhân" />
          <CardContent sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <TextField
              label="Họ và tên"
              fullWidth
              value={jobSeekerData.name}
              onChange={(e) => handleJobSeekerChange("name", e.target.value)}
            />
            <TextField
              label="Vị trí hiện tại"
              fullWidth
              value={jobSeekerData.currentTitle}
              onChange={(e) => handleJobSeekerChange("currentTitle", e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              value={jobSeekerData.email}
              onChange={(e) => handleJobSeekerChange("email", e.target.value)}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              value={jobSeekerData.phone}
              onChange={(e) => handleJobSeekerChange("phone", e.target.value)}
            />
            <TextField
              label="Ngày sinh"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={jobSeekerData.dob ? jobSeekerData.dob.split("T")[0] : ""}
              onChange={(e) => handleJobSeekerChange("dob", e.target.value)}
            />
            <TextField
              label="Số năm kinh nghiệm"
              type="number"
              fullWidth
              value={jobSeekerData.yearsExperience}
              onChange={(e) =>
                handleJobSeekerChange("yearsExperience", Number(e.target.value))
              }
            />
            <TextField
              label="Địa điểm làm việc"
              fullWidth
              value={jobSeekerData.location}
              onChange={(e) => handleJobSeekerChange("location", e.target.value)}
            />
            <TextField
              label="Giới thiệu bản thân"
              multiline
              rows={4}
              fullWidth
              value={jobSeekerData.summary}
              onChange={(e) => handleJobSeekerChange("summary", e.target.value)}
              sx={{ gridColumn: "1 / -1" }}
            />
          </CardContent>
        </Card>

        {/* Kỹ năng */}
        <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
          <CardHeader title="Kỹ năng" />
          <CardContent>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {skills.map((skill) => (
                <Chip key={skill} label={skill} onDelete={() => removeSkill(skill)} />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Thêm kỹ năng"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
              />
              <Button
                onClick={addSkill}
                sx={{
                  textTransform: "none",
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.primary",
                  minWidth: "auto",
                  px: 2,
                }}
              >
                <Plus size={16} />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EditProfilePage;

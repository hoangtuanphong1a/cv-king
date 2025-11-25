"use client";
import {
    Download,
    Edit,
    MapPin,
    Mail,
    Phone,
    Axe,
    Cake,
    Briefcase,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Divider,
    Avatar,
    Button,
    Box,
    Chip,
    LinearProgress
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMyProfileQuery } from '@/api/user/query';
import { useJobSeekerProfileByUserIdQuery } from '@/api/jobseeker-profile/query';
import { useMemo } from 'react';
//a
const MyProfile = () => {
    const router = useRouter();
    const { data: user, isLoading, isError } = useMyProfileQuery();
    const userId = user?.id;
    const { data: jobSeekerProfile, isLoading: isJobProfileLoading } =
        useJobSeekerProfileByUserIdQuery(userId);
    
    const profileCompletion = useMemo(() => {
        if (!jobSeekerProfile) return 0; 

        const fieldsToCheck = [
            "fullName",
            "email",
            "phone",
            "location",
            "summary",
            "skills",
            "experience",
            "education",
        ];

        const filledCount = fieldsToCheck.reduce((count, field) => {
            const value = (jobSeekerProfile as Record<string, unknown>)[field];
            if (Array.isArray(value)) return count + (value.length > 0 ? 1 : 0);
            return count + (value ? 1 : 0);
        }, 0);

    return Math.round((filledCount / fieldsToCheck.length) * 100);
    }, [jobSeekerProfile]);

    const stats = {
        applications: 12,   // Tổng số việc đã ứng tuyển
        savedJobs: 8,       // Việc đã lưu
        profileViews: 156,  // Lượt xem hồ sơ
    };

    if (isLoading || isJobProfileLoading) return <div>Đang tải thông tin...</div>;
    if (isError || !user) return <div>Không lấy được thông tin người dùng</div>;

    if (!jobSeekerProfile) {
        return (
            <Box sx={{ textAlign: "center", mt: 10 }}>
                <Typography variant="h6">Bạn chưa có hồ sơ ứng viên.</Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => router.push("/register")}
                >
                    Tạo hồ sơ ngay
                </Button>
            </Box>
        );
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: '1280px',
            mx: 'auto',
            p: 3
        }}>

            {/* Thẻ Thông Tin Cá Nhân */}
            <Card
                sx={{
                    borderRadius: "12px",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: 2 },
                }}
                >
                <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3, flexWrap: "wrap" }}>
                    {/* Avatar */}
                    <Avatar
                        src={user.avatarUrl}
                        sx={{
                        width: 96,
                        height: 96,
                        mt: 1,
                        border: "3px solid white",
                        boxShadow: 2,
                        }}
                    />

                    {/* Thông tin chính */}
                    <Box sx={{ flex: 1, minWidth: 300 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
                        <div>
                            <Typography variant="h4" component="h1" fontWeight="bold">
                            {jobSeekerProfile?.fullName ?? user.displayName ?? "Chưa có tên"}
                            </Typography>
                            <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
                            >
                            <Briefcase size={16} /> {jobSeekerProfile?.currentTitle ?? "Chưa mô tả"}
                            </Typography>
                        </div>

                        {/* Nút hành động */}
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                            onClick={() => router.push("a/edit-profile")}
                            sx={{
                                textTransform: "none",
                                border: "1px solid",
                                borderColor: "divider",
                                color: "text.primary",
                                "&:hover": { bgcolor: "action.hover" },
                                height: 40,
                            }}
                            startIcon={<Edit size={16} />}
                            >
                            Chỉnh sửa
                            </Button>
                            <Button
                            sx={{
                                textTransform: "none",
                                bgcolor: "#000000",
                                color: "primary.contrastText",
                                "&:hover": { bgcolor: "#333333" },
                                height: 40,
                            }}
                            startIcon={<Download size={16} />}
                            >
                            Tải CV
                            </Button>
                        </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* === THÔNG TIN CÁ NHÂN CHIA 2 CỘT === */}
                        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", mt: 1 }}>
                        {/* Cột trái */}
                        <Box sx={{ flex: 1, minWidth: 250 }}>
                            <Typography variant="body1" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            <Mail size={16} /> {jobSeekerProfile.email ?? user.email}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            <Phone size={16} /> {jobSeekerProfile.phone ?? "Chưa cập nhập số điện thoại"}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            <MapPin size={16} /> {jobSeekerProfile.location ?? "Chưa cập nhật địa điểm"}
                            </Typography>
                        </Box>

                        {/* Cột phải */}
                        <Box sx={{ flex: 1, minWidth: 250 }}>
                            <Typography variant="body1" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            <Cake size={16} />
                            {jobSeekerProfile?.dob
                                ? new Date(jobSeekerProfile.dob).toLocaleDateString("vi-VN")
                                : "Chưa cập nhật ngày sinh"}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            <Axe size={16} />
                            {jobSeekerProfile?.yearsExperience !== undefined && jobSeekerProfile?.yearsExperience !== null
                                ? `${jobSeekerProfile.yearsExperience} năm kinh nghiệm`
                                : "Chưa cập nhật kinh nghiệm"}
                            </Typography>
                        </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Phần mô tả bản thân */}
                        <Typography variant="body2" color="text.secondary">
                        {jobSeekerProfile.summary ?? "Chưa có phần giới thiệu cá nhân"}
                        </Typography>
                    </Box>
                    </Box>
                </CardContent>
                </Card>


            {/* Thống Kê Nhanh */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2
            }}>
                <Card sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="primary.main">{stats.applications}</Typography>
                        <Typography variant="body2" color="text.secondary">Việc đã ứng tuyển</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="info.main">{stats.savedJobs}</Typography>
                        <Typography variant="body2" color="text.secondary">Việc đã lưu</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="success.main">{stats.profileViews}</Typography>
                        <Typography variant="body2" color="text.secondary">Lượt xem hồ sơ</Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Mức độ hoàn thiện & Kỹ năng */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
                gap: 3
            }}>
                <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <CardHeader title="Mức độ hoàn thiện" sx={{pb: 0}} />
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <LinearProgress variant="determinate" value={profileCompletion} sx={{ height: 8, borderRadius: 4, flexGrow: 1 }} />
                            <Typography fontWeight="bold" color="primary.main">{profileCompletion}%</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Hoàn thiện hồ sơ để nhận được gợi ý việc làm tốt hơn.
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <CardHeader title="Các kỹ năng" />
                    <CardContent sx={{pt: 0}}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {jobSeekerProfile.skills?.length
                                ? jobSeekerProfile.skills.map((skill, i) => (
                                    <Chip key={i} label={skill} variant="outlined" />
                                ))
                                : <Typography variant="body2" color="text.secondary">Chưa cập nhật kỹ năng</Typography>}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
        
    );
}

export default MyProfile;

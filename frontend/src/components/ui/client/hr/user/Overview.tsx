"use client";
import { mockCandidates } from "@/faker/overview-hr-data";
import { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Button,
    Avatar,
    Chip,
    Paper
} from '@mui/material';
import {
    Plus,
    Briefcase,
    Users,
    TrendingUp,
    Calendar,
    AlertCircle,
    Star,
    UserCheck,
    XCircle,
    CheckCircle,
} from 'lucide-react';
const Overview = () => {
    const statusMap = {
        moi: {
            label: 'Mới',
            icon: <AlertCircle size={14} />,
            color: 'primary' as const
        },
        dat_yeu_cau: {
            label: 'Đạt yêu cầu',
            icon: <Star size={14} />,
            color: 'info' as const
        },
        da_phong_van: {
            label: 'Đã phỏng vấn',
            icon: <UserCheck size={14} />,
            color: 'secondary' as const
        },
        tu_choi: {
            label: 'Từ chối',
            icon: <XCircle size={14} />,
            color: 'error' as const
        },
        da_tuyen: {
            label: 'Đã tuyển',
            icon: <CheckCircle size={14} />,
            color: 'success' as const
        }
    };

    // 2. Hàm getStatusChip được viết lại ngắn gọn hơn
    const getStatusChip = (status: string) => {
        // Lấy thông tin trạng thái từ statusMap, nếu không có thì dùng giá trị mặc định
        const statusInfo = statusMap[status] || {
            label: status,
            icon: null,
            color: 'default' as const
        };
    }
     return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 1. Thanh tiêu đề và nút hành động */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Tổng quan Dashboard
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Plus />}
                    sx={{ textTransform: 'none', bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
                >
                    Đăng tin tuyển dụng mới
                </Button>
            </Box>

            {/* 2. Các thẻ thống kê */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card sx={{ borderRadius: 2, cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="text.secondary">Việc làm đang hoạt động</Typography>
                                    <Typography variant="h5" fontWeight="bold">8</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}><Briefcase /></Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card sx={{ borderRadius: 2, cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="text.secondary">Tổng số hồ sơ</Typography>
                                    <Typography variant="h5" fontWeight="bold">156</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'info.main', color: 'white' }}><Users /></Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card sx={{ borderRadius: 2, cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="text.secondary">Hồ sơ trong tuần</Typography>
                                    <Typography variant="h5" fontWeight="bold">24</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'success.main', color: 'white' }}><TrendingUp /></Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card sx={{ borderRadius: 2, cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="text.secondary">Lịch phỏng vấn</Typography>
                                    <Typography variant="h5" fontWeight="bold">12</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'secondary.main', color: 'white' }}><Calendar /></Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 3. Danh sách hồ sơ ứng tuyển gần đây */}
            <Card sx={{ borderRadius: 2 }}>
                <CardHeader title="Hồ sơ ứng tuyển gần đây" />
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {mockCandidates.map((candidate) => (                            <Paper
                                key={candidate.id}
                                variant="outlined"
                                sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', '&:hover': { bgcolor: 'action.hover' } }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar src={candidate.avatar} sx={{ width: 48, height: 48 }} />
                                    <Box>
                                        <Typography fontWeight="medium">{candidate.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{candidate.position}</Typography>
                                        <Typography variant="caption" color="text.secondary">Ngày nộp: {candidate.appliedDate}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    {getStatusChip(candidate.status)}
                                    <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                                        Xem
                                    </Button>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );

};
export default Overview;

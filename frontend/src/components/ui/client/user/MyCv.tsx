
"use client";
import {
    Download,
    Edit,
    Trash2,
    Eye,
    Plus,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Box,
    Chip
} from '@mui/material';
//a
const MyCv = () => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" fontWeight="bold">Quản lý CV</Typography>
                <Button
                    
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    sx={{ textTransform: 'none', bgcolor: "#000000", "&:hover": { bgcolor: "#333333" } }}
                >
                    Tạo CV mới
                </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <CardHeader
                        title="CV Lập trình viên Frontend"
                        action={<Chip label="Đang hoạt động" color="success" size="small" />}
                        sx={{ pb: 0 }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Cập nhật lần cuối: 10/10/2025
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Button size="small" startIcon={<Eye size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Xem</Button>
                            <Button size="small" startIcon={<Edit size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Sửa</Button>
                            <Button size="small" startIcon={<Download size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Tải xuống</Button>
                            <Button size="small" startIcon={<Trash2 size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "error.main" }}>Xóa</Button>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <CardHeader
                        title="CV Fullstack Developer (Tiếng Anh)"
                        action={<Chip label="Bản nháp" color="default" size="small" />}
                        sx={{ pb: 0 }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Cập nhật lần cuối: 05/09/2025
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Button size="small" startIcon={<Eye size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Xem</Button>
                            <Button size="small" startIcon={<Edit size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Sửa</Button>
                            <Button size="small" startIcon={<Download size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Tải xuống</Button>
                            <Button size="small" startIcon={<Trash2 size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "error.main" }}>Xóa</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};
export default MyCv;

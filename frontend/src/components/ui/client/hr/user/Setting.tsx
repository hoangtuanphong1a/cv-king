"use client";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Box,
    Divider,
    FormControlLabel,
    Switch
} from '@mui/material';

const Setting = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4" component="h1" fontWeight="bold">Cài đặt</Typography>

            <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardHeader title="Cài đặt tài khoản" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Email Setting */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Typography fontWeight="medium">Email</Typography>
                            <Typography variant="body2" color="text.secondary">nguyen.van.a@email.com</Typography>
                        </div>
                        <Button size="small" sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Thay đổi Email</Button>
                    </Box>
                    <Divider />
                    {/* Password Setting */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Typography fontWeight="medium">Mật khẩu</Typography>
                            <Typography variant="body2" color="text.secondary">••••••••</Typography>
                        </div>
                        <Button size="small" sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Đổi mật khẩu</Button>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardHeader title="Thông báo" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Thông báo việc làm mới" />
                    <FormControlLabel control={<Switch />} label="Thông báo từ nhà tuyển dụng" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Bản tin hàng tuần" />
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardHeader title="Dữ liệu & Quyền riêng tư" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Typography fontWeight="medium">Xuất dữ liệu</Typography>
                            <Typography variant="body2" color="text.secondary">Tải xuống bản sao dữ liệu của bạn</Typography>
                        </div>
                        <Button size="small" sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Xuất file</Button>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Typography fontWeight="medium" color="error">Xóa tài khoản</Typography>
                            <Typography variant="body2" color="text.secondary">Toàn bộ dữ liệu về tài khoản sẽ bị xóa vĩnh viễn.</Typography>
                        </div>
                        <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            sx={{ textTransform: 'none' }}
                        >
                            Xóa
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Setting;

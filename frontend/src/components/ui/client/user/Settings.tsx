"use-client";
import { Card, CardContent, CardHeader, CardTitle } from '../../common/card/card';
import { Separator } from '../../common/separator/separator';
import { Button } from '../../common/button/button';
const MySettings = () => {
                return (
                    <div className="space-y-6">
                        <div className="grid gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cấu hình tài khoản</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">
                                </label>
                                        <p className="text-sm text-gray-600">nguyen.van.a@email.com</p>
                                        <Button variant="outline" size="sm" className="mt-2">Thay đổi Email</Button>
                                    </div>
                                    <Separator />
                                    <div>
                                        <label className="text-sm font-medium">
                            Mật khẩu</label>
                                        <p className="text-sm text-gray-600">••••••••</p>
                                        <Button variant="outline" size="sm" className="mt-2">
                                Thay đổi mật khẩu</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle> Cấu hình thông báo</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Gợi ý việc làm</p>
                                            <p className="text-sm text-gray-600">Nhận đề xuất công việc</p>
                                        </div>
                                        <Button variant="outline" size="sm">Cấu hình</Button>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Application Updates</p>
                                            <p className="text-sm text-gray-600">Get notified about application status changes</p>
                                        </div>
                                        <Button variant="outline" size="sm">Cấu hình</Button>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Interview Reminders</p>
                                            <p className="text-sm text-gray-600">Receive reminders for upcoming interviews</p>
                                        </div>
                                        <Button variant="outline" size="sm">Cấu hình</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Privacy Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Profile Visibility</p>
                                            <p className="text-sm text-gray-600">Control who can see your profile</p>
                                        </div>
                                        <Button variant="outline" size="sm">Manage</Button>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Data Export</p>
                                            <p className="text-sm text-gray-600">Download a copy of your data</p>
                                        </div>
                                        <Button variant="outline" size="sm">Export</Button>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Xóa tài khoản</p>
                                            <p className="text-sm text-gray-600">Toàn bộ dữ liệu về tài khoản bạn sẽ bị xóa</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                            
                                Xóa
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );
}
export default MySettings;

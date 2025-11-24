"use client";
import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import {
  Mail,
  User,
  NotebookPen,
  LayoutPanelTop,
  Phone,
  Barcode,
  MapPin,
  Link2,
  Building2,
} from "lucide-react";
import AuthSidebar from "@/components/layout/Sidebar/AuthSidebar";
import Image from "next/image";

const Register: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  return (
    <Box className="flex flex-col md:grid md:grid-cols-12 min-h-screen">
      <AuthSidebar />
      <Box
        className="col-span-12 lg:col-span-8 py-5 lg:py-12 px-4 md:px-8 xl:overflow-y-auto max-h-screen w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Box className="max-w-3xl mx-auto">
          <h2 className="text-center xl:text-left text-2xl text-orange-400 font-bold mb-3 xl:mb-0">
            Đăng ký tài khoản nhà tuyển dụng
          </h2>
          <span className="text-gray-400">
            Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
            tuyển dụng ứng dụng.
          </span>
          <form className="my-8">
            <Box className="mb-6">
              <TextField
                fullWidth
                id="companyName"
                label="Tên công ty"
                type="text"
                variant="outlined"
                placeholder="Nhập tên đầy đủ của công ty"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <Building2 className="text-orange-400 size-5 mr-2" />
                  ),
                }}
              />
            </Box>
            <Box className="mb-6">
              <TextField
                fullWidth
                id="taxCode"
                label="Mã số thuế"
                type="text"
                variant="outlined"
                placeholder="Nhập mã số thuế"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <Barcode className="text-orange-400 size-5 mr-2" />
                  ),
                }}
              />
            </Box>
            <Box className="mb-6">
              <TextField
                fullWidth
                id="address"
                label="Địa chỉ"
                type="text"
                variant="outlined"
                placeholder="Nhập địa chỉ công ty"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <MapPin className="text-orange-400 size-5 mr-2" />
                  ),
                }}
              />
            </Box>
            <Box className="mb-6">
              <TextField
                fullWidth
                id="website"
                label="Website"
                type="url"
                variant="outlined"
                placeholder="Nhập trang web công ty"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <LayoutPanelTop className="text-orange-400 size-5 mr-2" />
                  ),
                }}
              />
            </Box>

            <Box className="mb-6">
              <TextField
                fullWidth
                id="contactPerson"
                label="Người liên hệ"
                type="text"
                variant="outlined"
                placeholder="Nhập tên người liên hệ"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <User className="text-orange-400 size-5 mr-2" />
                  ),
                }}
              />
            </Box>
            <Box className="mb-6">
              <TextField
                fullWidth
                id="contactEmail"
                label="Email liên hệ"
                type="email"
                variant="outlined"
                placeholder="Nhập email liên hệ"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <Mail className="text-orange-400 size-5 mr-2" />
                  ),
                }}
              />
            </Box>
            <Box className="mb-6">
              <TextField
                fullWidth
                id="contactPhone"
                label="Số điện thoại liên hệ"
                type="tel"
                variant="outlined"
                placeholder="Nhập số điện thoại liên hệ"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <Phone className="text-orange-400 size-5 mr-2" />
                  ),
                }}
              />
            </Box>
            <Box>
              <Box className="mb-6 grid grid-cols-2 gap-4">
                <Box>
                  <FormControl
                    fullWidth
                    className="[&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                  >
                    <InputLabel id="industry-label">Ngành nghề</InputLabel>
                    <Select
                      labelId="industry-label"
                      id="industry"
                      label="Ngành nghề"
                      defaultValue=""
                    >
                      <MenuItem value="IT">Công nghệ thông tin</MenuItem>
                      <MenuItem value="Finance">Tài chính</MenuItem>
                      <MenuItem value="Healthcare">Y tế</MenuItem>
                      <MenuItem value="Education">Giáo dục</MenuItem>
                      <MenuItem value="Manufacturing">Sản xuất</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    fullWidth
                    className="[&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                  >
                    <InputLabel id="companySize-label">
                      Quy mô công ty
                    </InputLabel>
                    <Select
                      labelId="companySize-label"
                      id="companySize"
                      label="Quy mô công ty"
                      defaultValue=""
                    >
                      <MenuItem value="1-10">1-10 nhân viên</MenuItem>
                      <MenuItem value="11-50">11-50 nhân viên</MenuItem>
                      <MenuItem value="51-200">51-200 nhân viên</MenuItem>
                      <MenuItem value="201-500">201-500 nhân viên</MenuItem>
                      <MenuItem value="501+">501+ nhân viên</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box className="mb-6 grid grid-cols-2 gap-4">
                <Box>
                  <TextField
                    fullWidth
                    id="logoUrl"
                    label="Logo URL"
                    type="url"
                    variant="outlined"
                    placeholder="Nhập đường dẫn logo công ty"
                    className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                    onChange={(e) => {
                      setLogoUrl(e.target.value);
                      setLogoError(false);
                    }}
                    InputProps={{
                      startAdornment: (
                        <Link2 className="text-orange-400 size-5 mr-2" />
                      ),
                    }}
                  />
                  <Box className="mt-2 w-24 h-24 relative">
                    {logoError ? (
                      <Box className="rounded-lg bg-gray-200 flex items-center justify-center text-red-500 text-sm font-medium w-[100%] h-[100%]">
                        Chưa có ảnh
                      </Box>
                    ) : logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt="Logo Preview"
                        className="rounded-lg"
                        layout="fill"
                        unoptimized
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <Box
                        className="rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium"
                        style={{ width: "100px", height: "100%" }}
                      >
                        Chưa có ảnh
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    id="bannerUrl"
                    label="Banner URL"
                    type="url"
                    variant="outlined"
                    placeholder="Nhập đường dẫn banner công ty"
                    className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                    onChange={(e) => {
                      setBannerUrl(e.target.value);
                      setBannerError(false);
                    }}
                    InputProps={{
                      startAdornment: (
                        <Link2 className="text-orange-400 size-5 mr-2" />
                      ),
                    }}
                  />
                  <Box className="mt-2 w-2/3 h-24 relative">
                    {bannerError ? (
                      <Box className="rounded-lg bg-gray-200 flex items-center justify-center text-red-500 text-sm font-medium w-[100%] h-[100%]">
                        Chưa có ảnh
                      </Box>
                    ) : bannerUrl ? (
                      <Image
                        src={bannerUrl}
                        alt="Banner Preview"
                        className="rounded-lg"
                        layout="fill"
                        unoptimized
                        onError={() => setBannerError(true)}
                      />
                    ) : (
                      <Box className="rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium w-[100%] h-[100%]">
                        Chưa có ảnh
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="relative">
              <Box className="absolute left-3 top-3">
                <NotebookPen className="text-orange-400 size-5" />
              </Box>
              <TextareaAutosize
                id="description"
                placeholder="Nhập giới thiệu về công ty"
                minRows={4}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 hover:border-black focus:border-blue-600 focus:outline-none text-gray-900"
                style={{ resize: "vertical" }}
              />
            </Box>

            <Button
              fullWidth
              sx={{
                py: 1.5,
                mt: 2,
                backgroundColor: "orange",
                color: "white",
                borderRadius: "0.5rem",
                "&:hover": {
                  backgroundColor: "#fb923c",
                },
              }}
            >
              Hoàn tất đăng ký
            </Button>
          </form>

          <Box className="text-center text-gray-600 mt-5 border-t-1 pt-3">
            <p className="font-bold">Bạn gặp khó khăn khi tạo tài khoản?</p>
            <span className="text-xs">
              Vui lòng gọi tới số <b className="text-orange-400">0974791817</b>
            </span>{" "}
            (giờ hành chính).
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;

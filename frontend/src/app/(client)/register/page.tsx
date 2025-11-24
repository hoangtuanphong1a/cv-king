"use client";

import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
} from "@mui/material";
import { Lock, Mail, User, Eye, EyeOff, Building2 } from "lucide-react";
import AuthSidebar from "@/components/layout/Sidebar/AuthSidebar";
import Link from "next/link";
import { useRegisterEmployerMutation, useRegisterMutation } from "@/api/auth/query";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState<"job-seeker" | "employer">(
    "job-seeker"
  );
  const [agreeTerms, setAgreeTerms] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
   const [companyName, setCompanyName] = useState("");
  const [fullName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: registerJobSeeker, isPending: isRegisteringJobSeeker } =
    useRegisterMutation({
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken ?? "");
        localStorage.setItem("refreshToken", data.refreshToken ?? "");
        alert("Đăng ký thành công! Hãy đăng nhập.");
        router.push("/login");
      },
      onError: () => alert("Đăng ký thất bại"),
    });

  const { mutate: registerEmployer, isPending: isRegisteringEmployer } =
    useRegisterEmployerMutation({
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken ?? "");
        localStorage.setItem("refreshToken", data.refreshToken ?? "");
        alert("Đăng ký nhà tuyển dụng thành công! Hãy đăng nhập.");
        router.push("/login");
      },
      onError: () => alert("Đăng ký thất bại"),
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return alert("Bạn phải đồng ý điều khoản");
    if (password !== confirmPassword) return alert("Mật khẩu không khớp");

    if (accountType === "job-seeker") {
      registerJobSeeker({ email, fullName, password });
    } else {
      if (!companyName.trim()) return alert("Vui lòng nhập tên công ty");
      registerEmployer({
        email,
        password,
        contactName: fullName,
        companyName,
      });
    }
  };
  return (
    <Box className="flex flex-col md:grid md:grid-cols-12 min-h-screen">
      <AuthSidebar />
      <Box
        className="col-span-12 lg:col-span-8 py-5 lg:py-12 px-4 md:px-8 xl:overflow-y-auto max-h-screen w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Box className="max-w-xl mx-auto">
          <h2 className="text-center xl:text-left text-2xl text-orange-400 font-bold mb-3 xl:mb-0">
            Chào mừng bạn đến với CVKing
          </h2>
          <span className="text-gray-400">
            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý
            tưởng
          </span>
          <form className="my-8" onSubmit={handleSubmit}>
            {/* Tabs for account type */}
            <Box className="mb-6">
              <p className="mb-2 text-sm text-gray-600">I want to:</p>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Radio
                    size="small"
                    value="job-seeker"
                    checked={accountType === "job-seeker"}
                    onChange={() => setAccountType("job-seeker")}
                    sx={{
                      color: "#fb923c",
                      "&.Mui-checked": {
                        color: "#fb923c",
                      },
                    }}
                  />
                  <span className="flex items-center text-sm text-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    Find a job
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <Radio
                    size="small"
                    value="employer"
                    checked={accountType === "employer"}
                    onChange={() => setAccountType("employer")}
                    sx={{
                      color: "#fb923c",
                      "&.Mui-checked": {
                        color: "#fb923c",
                      },
                    }}
                  />
                  <span className="flex items-center text-sm text-gray-700">
                    <Building2 className="w-4 h-4 mr-2" />
                    Hire talent
                  </span>
                </label>
              </div>
            </Box>

            {/* Common Fields */}
            <Box className="mb-6">
              <TextField
                fullWidth
                id="fullname"
                label={accountType === "employer" ? "Tên liên hệ" : "Họ và tên"}
                type="text"
                value={fullName}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                variant="outlined"
                placeholder={
                  accountType === "employer"
                    ? "Nhập tên liên hệ"
                    : "Nhập họ và tên"
                }
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <User className="text-orange-400 size-5 mr-2" />
                  ),
                }}
              />
            </Box>

            {accountType === "employer" && (
              <Box className="mb-6">
                <TextField
                  fullWidth
                  id="company"
                  label="Tên công ty"
                  type="text"
                  variant="outlined"
                  placeholder="Nhập tên công ty"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  autoComplete="company"
                  className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                  InputProps={{
                    startAdornment: (
                      <Building2 className="text-orange-400 size-5 mr-2" />
                    ),
                  }}
                />
              </Box>
            )}

            <Box className="mb-6">
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                variant="outlined"
                placeholder="Nhập email"
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
                id="password"
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                variant="outlined"
                placeholder="Nhập mật khẩu"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <Lock className="text-orange-400 size-5 mr-2" />
                  ),
                  endAdornment: (
                    <span
                      className="cursor-pointer text-gray-500 hover:text-orange-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  ),
                }}
              />
            </Box>
            <Box className="mb-6">
              <TextField
                fullWidth
                id="confirmPassword"
                label="Xác nhận mật khẩu"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-lg"
                InputProps={{
                  startAdornment: (
                    <Lock className="text-orange-400 size-5 mr-2" />
                  ),
                  endAdornment: (
                    <span
                      className="cursor-pointer text-gray-500 hover:text-orange-400"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </span>
                  ),
                }}
              />
            </Box>
            <FormGroup className="mb-6">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    sx={{
                      color: "#fb923c",
                      "&.Mui-checked": { color: "#fb923c" },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-gray-600">
                    Tôi đồng ý với{" "}
                    <button
                      type="button"
                      className="text-orange-400 hover:underline"
                    >
                      Điều khoản dịch vụ
                    </button>{" "}
                    và{" "}
                    <button
                      type="button"
                      className="text-orange-400 hover:underline"
                    >
                      Chính sách bảo mật
                    </button>
                  </span>
                }
              />
            </FormGroup>

            <Button
              type="submit"
              fullWidth
              disabled={isRegisteringJobSeeker || isRegisteringEmployer}
              sx={{
                py: 1.5,
                backgroundColor: "orange",
                color: "white",
                borderRadius: "0.5rem",
                "&:hover": {
                  backgroundColor: "#fb923c",
                },
              }}
            >
              Đăng Ký
            </Button>

            <p className="text-center text-gray-400 py-3">Hoặc</p>

            {/* Social Register Button */}
            <Box className="mb-4 relative flex gap-2">
              <Button
                sx={{
                  width: "100%",
                  py: 1.5,
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: "0.5rem",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "none",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Google
              </Button>
            </Box>
          </form>

          <p className="text-center text-gray-500">
            Bạn đã có tài khoản?{" "}
            <Link href="/login" className="text-orange-400 no-underline">
              Đăng nhập
            </Link>
          </p>
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

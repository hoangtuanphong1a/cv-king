"use client";
import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import AuthSidebar from "@/components/layout/Sidebar/AuthSidebar";
import Link from "next/link";
import { useLoginMutation } from "@/api/auth/query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

const Login: React.FC = () => {
  const router = useRouter(); 
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useLoginMutation({
    onSuccess: (data) => {
      console.log('Login response:', data);
      console.log('roles type:', data.user.roles);
      const { setToken, setRefreshToken, setUser } = useAuthStore.getState();
      setToken(data.accessToken ?? "");
      setRefreshToken(data.refreshToken ?? "");
      setUser(data.user);

      localStorage.setItem("accessToken", data.accessToken ?? "");
      localStorage.setItem("refreshToken", data.refreshToken ?? "");
      // const roles = data.user?.roles ?? [];
      alert(" Đăng nhập thành công");

      const roles = data.user.roles ?? [];

      if (roles.includes("Admin")) {
        router.push("/admin");
        return;
      }
      if (roles.includes("Employer")) {
        router.push("/hr");
        return;
      }
        router.push("/");
    },
    onError: () => alert("Sai email hoặc mật khẩu"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  }
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box className="flex flex-col md:grid md:grid-cols-12 min-h-screen">
      <AuthSidebar />
      <Box className="col-span-12 lg:col-span-8 py-5 lg:py-12 px-4 md:px-8 overflow-y-auto max-h-screen w-full">
        <Box className="max-w-xl mx-auto">
          <h2 className="text-center xl:text-left text-2xl text-orange-400 font-bold mb-3 xl:mb-0">
            Chào mừng bạn đã quay trở lại CVKing
          </h2>
          <span className="text-gray-400">
            Nơi đưa bạn đến gần hơn với công việc mơ ước
          </span>
          <form className="my-8" onSubmit={handleSubmit}>
            <Box className="mb-4 ">
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
            <Box className="mt-8">
              <TextField
                fullWidth
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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
            <p className="text-right my-4 text-orange-400">
              <a href="#" className="no-underline">
                Quên mật khẩu?
              </a>
            </p>
            <Button
              type="submit"
              fullWidth
              disabled={isPending}
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
              Đăng Nhập
            </Button>
            <p className="text-center text-gray-400 py-3">Hoặc</p>

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
            Bạn chưa có tài khoản?{" "}
            <Link href="/register" className="text-orange-400 no-underline">
              Đăng ký ngay
            </Link>
          </p>
          <Box className="text-center text-gray-600 mt-5 border-t-1 pt-3">
            <p className="font-bold">Bạn gặp khó khăn khi tạo tài khoản?</p>
            <span className="text-xs">
              {" "}
              Vui lòng gọi tới số <b className="text-orange-400">0974791817</b>
            </span>{" "}
            (giờ hành chính).
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

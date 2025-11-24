"use client";
import {
  Box,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { Crown, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <Box className="bg-gray-100">
      <Box className="col-span-12 lg:col-span-4 pt-30 px-4 md:px-8 overflow-y-auto h-screen w-full">
        <Box className="max-w-md mx-auto bg-white py-8 px-5 rounded-4xl shadow-2xl border backdrop-blur-md">
          <h2 className="text-center text-4xl text-orange-400 font-bold mb-8 flex gap-2 items-end justify-center">
            <Crown className="size-10" />
            CVKING
          </h2>
          <form>
            <Box className="mb-4">
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                placeholder="Nhập email"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-2xl"
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
                variant="outlined"
                placeholder="Nhập mật khẩu"
                className="hover:border focus:border [&_.MuiInputBase-root]:h-12 [&_.MuiInputBase-root]:!rounded-2xl"
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
            <Box className="flex items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      py: 3,
                      color: "orange",
                      "&.Mui-checked": {
                        color: "orange",
                      },
                    }}
                  />
                }
                label="Ghi nhớ"
              />
            </Box>
            <Button
              fullWidth
              sx={{
                py: 1,
                backgroundColor: "orange",
                color: "white",
                borderRadius:4,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#fb923c",
                },
              }}
            >
              Đăng Nhập
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default LoginPage;

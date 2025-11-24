"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Box } from "@mui/material";

export const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Box className="p-1 rounded-lg flex items-center hover:bg-gray-200 dark:hover:bg-gray-700" sx={{border: "1px solid gray",}}>
      <button
        className="dark:text-white text-gray-500 cursor-pointer"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        title="Toggle theme"
      >
        {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </Box>
  );
};

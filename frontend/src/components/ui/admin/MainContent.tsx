"use client";
import React from "react";
import { Box } from "@mui/material";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Box className="mt-[70px] px-6 py-3" >
      {children}
    </Box>
  );
};

export default MainContent;
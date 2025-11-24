"use client";

import React from "react";
import { Box } from "@mui/material";
import NavbarItem from "./NavbarItem";
import { navItems } from "@/faker/navbar-data";

const NavbarDesktop = () => {
  return (
    <Box component="nav" className="flex items-center space-x-4 px-3">
      {navItems.map((item) => (
        <NavbarItem key={item.name} item={item} />
      ))}
    </Box>
  );
};

export default NavbarDesktop;
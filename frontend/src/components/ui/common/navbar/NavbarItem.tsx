"use client";

import React from "react";
import { Box, Tooltip } from "@mui/material";
import Link from "next/link";
import NavbarTooltip from "./NavbarTooltip";

interface NavbarItemProps {
  item: {
    name: string;
    href: string;
    icon?: React.ReactNode;
    menu?: {
      menuLeft?: {
        name: string;
        item: Array<{
          name: string;
          href?: string;
          icon?: React.ReactNode;
        }>;
      };
      menuRight?: {
        name: string;
        item?: Array<{
          name: string;
          href?: string;
          icon?: React.ReactNode;
        }>;
        postItem?: Array<{
          title: string;
          description: string;
          imageUrl: string | { src: string };
        }>;
      };
    };
  };
}

const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
  return (
    <Box key={item.name}>
      {item.icon ? (
        <Tooltip
          title={<NavbarTooltip item={item} />} 
          arrow
          placement="bottom-start"
          sx={{ zIndex: 9999 }}
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "transparent",
                filter: "drop-shadow(0px 2px 8px gray)",
                padding: 0,
                margin: 0,
                maxWidth: "none",
              },
            },
            arrow: {
              sx: {
                color: "white",
              },
            },
          }}
        >
          <Box className="group relative">
            <Link
              href={item.href}
              className="flex items-center font-semibold hover:text-orange-400 gap-1"
            >
              {item.name}
              <Box component="span" sx={{ display: "inline-block", mt: 0.5 }}>
                {item.icon}
              </Box>
            </Link>
          </Box>
        </Tooltip>
      ) : (
        <Box className="group relative">
          <Link href={item.href} className="flex font-semibold items-center hover:text-orange-400">
            {item.name}
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default NavbarItem;
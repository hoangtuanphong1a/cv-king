// src/components/NavbarTooltip.tsx
"use client";

import React from "react";
import { Box, List, ListItem, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { MoveRight } from "lucide-react";
import Link from "next/link";

interface NavbarTooltipProps {
  item: {
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

const NavbarTooltip: React.FC<NavbarTooltipProps> = ({ item }) => {
  return (
    <Box className="bg-white shadow-lg pt-3 px-4 flex items-start max-w-[650px] rounded-2xl relative">
      {item.menu?.menuLeft && (
        <Box className={item.menu?.menuRight ? "w-[30%]" : "flex-1"}>
          <p className="px-2 text-lg text-gray-400">{item.menu.menuLeft.name}</p>
          <List>
            {item.menu?.menuLeft?.item.map((menuItem, index) => (
              <ListItem key={index}>
                {menuItem.href ? (
                  <Link
                    href={menuItem.href}
                    className="text-black text-sm flex items-center hover:text-orange-400"
                  >
                    {menuItem.icon && (
                      <span className="mr-2 hover:text-orange-400">{menuItem.icon}</span>
                    )}
                    {menuItem.name}
                  </Link>
                ) : (
                  <p className="text-gray-400 text-lg flex items-center">
                    {menuItem.icon && <span className="mr-2">{menuItem.icon}</span>}
                    {menuItem.name}
                  </p>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {item.menu?.menuRight && (
        <Box className="w-[70%]">
          <p className="text-lg text-gray-400 px-2">{item.menu.menuRight.name}</p>
          <Box className="flex items-center">
            {item.menu?.menuRight?.postItem && (
              <Box className="space-y-3 p-2 overflow-x-auto">
                {item.menu.menuRight.postItem.map((post, index) => (
                  <Card
                    key={index}
                    className="bg-gray-50 rounded-lg w-full flex items-start"
                    sx={{
                      boxShadow: "none",
                      "&:hover": {
                        "& .card-text": { color: "orange" },
                        cursor: "pointer",
                      },
                    }}
                  >
                    <CardMedia
                      className="h-32"
                      component="img"
                      image={
                        typeof post.imageUrl === "string" ? post.imageUrl : post.imageUrl.src
                      }
                      alt={post.title}
                      sx={{ width: "30%", borderRadius: 1 }}
                    />
                    <CardContent sx={{ pt: 0 }} className="w-[80%] flex flex-col items-start">
                      <Typography variant="subtitle1" className="font-semibold mt-2 card-text">
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-sm mt-1 line-clamp-3 card-text"
                        sx={{ color: "gray" }}
                      >
                        {post.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                <Box className="w-full flex justify-end">
                  <Link
                    href="#"
                    className="text-black hover:text-orange-400 text-sm text-right flex items-center gap-2"
                  >
                    Tìm việc làm
                    <MoveRight size="15" />
                  </Link>
                </Box>
              </Box>
            )}
            {!item.menu?.menuRight?.postItem && (
              <List className="grid grid-cols-2">
                {item.menu?.menuRight?.item?.map((menuItem, index) => (
                  <ListItem key={index}>
                    {menuItem.href ? (
                      <Link
                        href={menuItem.href}
                        className="text-black text-sm flex items-center hover:text-orange-400"
                      >
                        {menuItem.icon && (
                          <span className="mr-2 hover:text-orange-400">{menuItem.icon}</span>
                        )}
                        {menuItem.name}
                      </Link>
                    ) : (
                      <p className="text-gray-400 text-lg flex items-center">
                        {menuItem.icon && <span className="mr-2">{menuItem.icon}</span>}
                        {menuItem.name}
                      </p>
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NavbarTooltip;
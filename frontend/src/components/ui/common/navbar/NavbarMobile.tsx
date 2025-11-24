"use client";

import React from "react";
import { Box, Drawer, List, IconButton, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { MenuIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/faker/navbar-data";

interface NavbarMobileProps {
  drawerOpen: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  openMenus: Record<string, boolean>;
  toggleMenu: (menuName: string) => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ drawerOpen, handleDrawerOpen, handleDrawerClose, openMenus, toggleMenu }) => {
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ background: "#f2f4f5", mr: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{ "& .MuiDrawer-paper": { width: "300px" } }}
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Box className="text-center">
            <h2 className="inline-block mx-auto mt-6 text-xl text-orange-400 font-bold rounded-full p-2">
              CVKING
            </h2>
          </Box>
          <List>
            {navItems.map((item) => (
              <Box key={item.name}>
                <ListItemButton
                  onClick={() => toggleMenu(item.name)}
                  {...(!item.menu && item.href ? { component: Link, href: item.href } : {})}
                  sx={{
                    color: "black",
                    "&:hover": { color: "orange" },
                    borderBottom: "1px solid #f2f4f5",
                    padding: 2,
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ sx: { fontSize: "1.1rem" } }}
                  />
                  {item.icon && (
                    <ChevronDown
                      size="20"
                      className={`transition-transform duration-300 ${openMenus[item.name] ? "rotate-180" : ""}`}
                    />
                  )}
                </ListItemButton>
                {(item.menu?.menuLeft || item.menu?.menuRight) && (
                  <Collapse in={openMenus[item.name] || false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <p className="text-l text-gray-600 pl-5 py-2">{item?.menu?.menuLeft?.name}</p>
                      {item.menu?.menuLeft?.item &&
                        item.menu.menuLeft.item.map((subItem, index) => (
                          <ListItemButton
                            key={index}
                            sx={{
                              pl: 4,
                              color: "black",
                              "&:hover": { color: "orange" },
                              borderBottom: "1px solid #f2f4f5",
                              padding: 2,
                            }}
                            component={Link}
                            href={subItem.href}
                          >
                            {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                            <ListItemText primary={subItem.name} />
                          </ListItemButton>
                        ))}
                      <p className="text-md text-gray-600 pl-5 py-2">
                        {(item.menu?.menuRight?.item?.length ?? 0) > 0 && item.menu?.menuRight?.name}{" "}
                      </p>
                      {item.menu?.menuRight?.item &&
                        item.menu.menuRight?.item.map((subItem, index) => (
                          <ListItemButton
                            key={index}
                            sx={{
                              pl: 4,
                              color: "black",
                              "&:hover": { color: "orange" },
                              borderBottom: "1px solid #f2f4f5",
                              padding: 2,
                            }}
                            component={Link}
                            href={subItem.href}
                          >
                            {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                            <ListItemText primary={subItem.name} />
                          </ListItemButton>
                        ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List>
          <span className="text-sm text-gray-400 text-center block p-5">
            <b className="text-orange-400">CVKing</b> nơi hỗ trợ tìm kiếm việc làm tuyệt nhất Việt Nam
          </span>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarMobile;
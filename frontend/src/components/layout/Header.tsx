"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Link,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Collapse,
  List,
  ListItemText,
} from "@mui/material";
import { Bell, ChevronDown, ChevronRight, Crown } from "lucide-react";
import NavbarDesktop from "../ui/common/navbar/NavbarDesktop";
import NavbarMobile from "../ui/common/navbar/NavbarMobile";
import { actionItems } from "@/faker/navbar-data";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isScreen, setIsScreen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [openActions, setOpenActions] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isAuth] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setOpenMenus({});
  };
  const toggleMenu = (name: string) =>
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  const toggleAction = (name: string) =>
    setOpenActions((prev) => ({ ...prev, [name]: !prev[name] }));
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    setIsScreen(window.innerWidth >= 1024);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsScreen(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) setDrawerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isScreen) setDrawerOpen(false);
  }, [isScreen]);

  return (
    <Box
      component="header"
      className="text-black bg-white shadow-md fixed top-0 left-0 right-0 z-50"
    >
      <Box className="container mx-auto flex justify-between items-center py-1 px-4 md:px-6 lg:px-8 md:max-w-[1200px]">
        <Box className="flex items-center space-x-6">
          {isMobile && (
            <NavbarMobile
              drawerOpen={drawerOpen}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
            />
          )}
          <Link href="/" className="no-underline">
            <Box className="text-center flex items-center gap-2 text-orange-400">
              <Crown />
              <h2 className="flex decoration-none mx-auto text-xl font-bold rounded-full mr-3">
                CVKING
              </h2>
            </Box>
          </Link>
          {!isMobile && <NavbarDesktop />}
        </Box>

        <Box className="flex">
          {!isAuth ? (
            <Box className="flex gap-3">
              <Button
                component={Link}
                href="/register"
                sx={{
                  color: "orange",
                  px: 2,
                  border: "1px solid orange",
                  borderRadius: "9999px",
                  fontWeight: "600",
                  "&:hover": { background: "#fff7ed" },
                }}
              >
                ĐĂNG KÝ
              </Button>
              <Button
                component={Link}
                href="/login"
                sx={{
                  color: "white",
                  px: 2,
                  fontWeight: "600",
                  background: "orange",
                  borderRadius: "9999px",
                  "&:hover": { background: "#ff6900" },
                }}
              >
                ĐĂNG NHẬP
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton
                size="small"
                sx={{ ml: 2, background: "#f0eded" }}
                aria-controls={anchorEl ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
              >
                <Bell />
              </IconButton>

              <Tooltip title="Account settings">
                <IconButton
                    onClick={(e) => {
                      handleMenuClick(e);
                      router.push("/user/a");
                    }}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={anchorEl ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? "true" : undefined}
                >
                  <Avatar>H</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                disableScrollLock={true} // Add this prop to prevent scroll lock
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px gray)",
                      borderRadius: "4%",
                      mt: 0.5,
                      p: 2,
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 20,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        zIndex: 0,
                      },
                    },
                  },
                }}
              >
                <Box className="px-2 pb-4 border-gray-100 border-b-2 flex gap-3">
                  <Avatar sx={{ width: 50, height: 50 }}>H</Avatar>
                  <Box>
                    <b>Hoàng Hải Long</b>
                    <p>long123@gmail.com</p>
                  </Box>
                </Box>
                {actionItems.map((item) => (
                  <div key={item.name} className="py-2">
                    <MenuItem
                      onClick={() => toggleAction(item.name)}
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                    >
                      <Box className="flex justify-between w-full items-center gap-2 hover:text-orange-400">
                        <ListItemText>{item.name}</ListItemText>
                        <ChevronDown
                          size="20"
                          className={`transition-transform duration-300 ${
                            openActions[item.name] ? "rotate-180" : ""
                          }`}
                        />
                      </Box>
                    </MenuItem>
                    <Collapse
                      in={openActions[item.name] || false}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.subAction.item.map((subItem, index) => (
                          <MenuItem
                            key={index}
                            sx={{
                              pl: 4,
                              "&:hover": { backgroundColor: "transparent" },
                            }}
                          >
                            <ListItemText className="hover:text-orange-400">
                              {subItem.name}
                            </ListItemText>
                          </MenuItem>
                        ))}
                      </List>
                    </Collapse>
                  </div>
                ))}
                <Button
                  component={Link}
                  href="/login"
                  sx={{
                    color: "white",
                    mt: 2,
                    px: 2,
                    width: "100%",
                    fontWeight: "600",
                    background: "orange",
                    borderRadius: "9999px",
                    "&:hover": { background: "#ff6900" },
                  }}
                >
                  ĐĂNG XUẤT
                </Button>
              </Menu>
              <Box className="text-left border-l-1 pl-3 ml-2 flex flex-col">
                <span>Bạn là nhà tuyển dụng?</span>
                <Link
                  href="/register-company"
                  className="no-underline cursor-pointer py-1"
                >
                  <span className="hover:text-orange-400 text-gray-400 flex">
                    Đăng ký tuyển dụng
                    <ChevronRight
                      size={20}
                      className="ml-1 translate-y-1"
                    />
                  </span>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Crown,
  MenuIcon,
} from "lucide-react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Typography,
  Box,
  IconButton,
  Avatar,
  CssBaseline,
  Tooltip,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import { ToggleTheme } from "@/components/ui/common/toggle/ToggleTheme";
import { useTheme } from "@/context/ThemeContext";
import AccountDropdown from "../ui/common/dropdown/AccountDropdown";
import { NAVIGATION } from "@/faker/navigation-data";
import { useBreadcrumb } from "@/context/BreadcumbContext";

const ACCOUNTS = [
  { id: 1, name: "Bharat Kashyap", email: "bharatkashyap@outlook.com" },
];

const drawerWidth = 330;

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setCurrentPath } = useBreadcrumb();

  const [anchorElAppBar, setAnchorElAppBar] = useState<null | HTMLElement>(
    null
  );
  const [currentAccount] = useState(ACCOUNTS[0]);
  const [openSubMenu, setOpenSubMenu] = useState<{ [key: number]: boolean }>(
    {}
  );
  const isMobile = useMediaQuery("(max-width:1024px)");

  const handleDrawerToggle = () => setOpen(!open);

  const handleAppBarMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElAppBar(event.currentTarget);
  const handleAppBarMenuClose = () => setAnchorElAppBar(null);
  const handleSignOut = () => {
    router.push("/admin/login");
    handleAppBarMenuClose();
  };

  const handleSubMenuClick = (index: number) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box className="flex dark:text-white">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          ...(open &&
            !isMobile && {
              ml: `${drawerWidth}px`,
              width: `calc(100% - ${drawerWidth}px)`,
            }),
          backgroundColor:
            theme === "light" ? "white!important" : "black!important",
          boxShadow: "none",
          borderBottom: theme === "light" ? "" : "1px solid #ffffff4d",
          minHeight: 65,
        }}
        className="border-b-1"
      >
        <Toolbar
          sx={{
            paddingLeft: "18px!important",
          }}
        >
          {!isMobile ? (
            open ? (
              ""
            ) : (
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon className="text-gray-500 dark:text-white" />
              </IconButton>
            )
          ) : (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon className="text-gray-500 dark:text-white" />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            className="text-orange-400 flex items-center gap-2"
            sx={{ fontWeight: 600 }}
          >
            {!isMobile ? (
              !open ? (
                <>
                  <Crown /> CVKING
                </>
              ) : (
                ""
              )
            ) : (
              <>
                <Crown /> CVKING
              </>
            )}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <ToggleTheme />
          <Box>
            <Button onClick={handleAppBarMenuClick}>
              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "gray" }}>
                {currentAccount.name[0]}
              </Avatar>
            </Button>
            <AccountDropdown
              action={{
                info: {
                  name: currentAccount.name,
                  email: currentAccount.email,
                },
                items: [],
                anchorEl: anchorElAppBar,
                onMenuClose: handleAppBarMenuClose,
                onLogout: handleSignOut,
                theme: theme,
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={handleDrawerToggle}
        sx={{
          width: open && !isMobile ? drawerWidth : `57px`,
          "& .MuiDrawer-paper": {
            width: isMobile ? drawerWidth : open ? drawerWidth : `57px`,
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            overflowX: "hidden",
            backgroundColor: theme === "light" ? "white" : "#0b0809",
            borderRight: theme === "light" ? "" : "1px solid #ffffff4d",
          },
        }}
        className="h-screen flex flex-col"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            minHeight: theme === "light" ? 64 : 65,
            borderBottom: theme === "light" ? "" : "1px solid #ffffff4d",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              ml: 2,
              opacity: isMobile || open ? 1 : 0,
              fontWeight: 600,
            }}
            className="text-orange-400 flex items-center gap-2"
          >
            <Crown />
            CVKING
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            {isMobile || open ? (
              <ChevronLeftIcon className="dark:text-white text-gray-500 cursor-pointer" />
            ) : (
              " "
            )}
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ flexGrow: 1 }}>
          <List className="flex flex-col gap-2">
            {NAVIGATION.map((item, index) => (
              <Box key={index}>
                <ListItem disablePadding className="block " key={index}>
                  <Tooltip
                    title={!(isMobile || open) ? item.title : ""}
                    placement="right"
                  >
                    <ListItemButton
                      onClick={() => {
                        handleSubMenuClick(index);
                      }}
                      sx={{
                        px: 2,
                        py: 0,
                        justifyContent: isMobile || open ? "initial" : "center",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: isMobile || open ? 2 : "auto",
                          color: theme === "light" ? "" : "white",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          opacity: isMobile || open ? 1 : 0,
                          color: theme === "light" ? "" : "white",
                        }}
                      />
                      {(isMobile || open) && item.items.length > 0 && (
                        <ChevronRightIcon
                          className={`transition-transform duration-300 text-gray-500 dark:text-white ${
                            openSubMenu[index] ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                {item.items.length > 0 && (
                  <Collapse
                    in={(isMobile || open) && openSubMenu[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.items.map((subItem, subIndex) => (
                        <ListItem key={subIndex} disablePadding>
                          <ListItemButton
                            sx={{
                              justifyContent:
                                isMobile || open ? "initial" : "center",
                              py: 0,
                            }}
                            onClick={() => {
                              router.push(subItem.path);
                              setCurrentPath([
                                { name: item.title, link: "#" },
                                { name: subItem.name, link: subItem.path },
                              ]);
                              if (isMobile) setOpen(false);
                            }}
                          >
                            <Box
                              sx={{
                                borderLeft:
                                  theme === "light"
                                    ? "1px solid #e7e3e4"
                                    : "1px solid #ffffff4d",
                              }}
                              className="dark:text-white text-sm text-black ml-2.5 pl-7"
                            >
                              <ListItemText
                                sx={{
                                  fontSize: "50px!important",
                                }}
                                className="py-1 "
                                primary={subItem.name}
                              />
                            </Box>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        className="flex-grow min-h-screen overflow-x-hidden dark:text-white"
        style={{
          width: !isMobile
            ? `calc(100vw - ${open ? drawerWidth : 57}px)`
            : "100vw",
          backgroundColor: theme === "light" ? "white" : "black",
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;

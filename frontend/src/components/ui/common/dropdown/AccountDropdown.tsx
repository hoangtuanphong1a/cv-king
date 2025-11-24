import React from "react";
import { Avatar, Menu, MenuItem, ListItemIcon, Box } from "@mui/material";
import { LogOut } from "lucide-react";

interface AccountDropdownProps {
  action: {
    info: {
      name: string;
      email: string;
    };
    items: { name: string; icon: React.ReactNode }[];
    anchorEl: null | HTMLElement;
    onMenuClose: () => void;
    onLogout: () => void;
    theme: string;
  };
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ action }) => {
  const { info, items, anchorEl, onMenuClose, onLogout, theme } = action;
  const { name, email } = info;

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onMenuClose}
      disableScrollLock={true}
      sx={{
        "& .MuiPaper-root": {
          mt: 1,
          filter: "drop-shadow(0px 0px 0px gray)",
          borderRadius: 5,
          color: theme === "light" ? "" : "white",
          backgroundColor: theme === "light" ? "" : "#0b0809",
        },
      }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        sx={{
          borderBottom:
            theme === "light" ? "1px solid #e7e3e4" : "1px solid #ffffff4d",
        }}
        onClick={onMenuClose}
      >
        <Avatar sx={{ bgcolor: "#6b7280", mr: 1 }}>{name[0]}</Avatar>
        <Box>
          <b>{name}</b>
          <p>{email}</p>
        </Box>
      </MenuItem>
      {items.map((item, index) => (
        <MenuItem key={index}>
          <ListItemIcon sx={{ color: theme === "light" ? "" : "white" }}>
            {item.icon}
          </ListItemIcon>
          {item.name}
        </MenuItem>
      ))}
      <MenuItem onClick={onLogout}>
        <ListItemIcon sx={{ color: theme === "light" ? "" : "white" }}>
          <LogOut fontSize="small" />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  );
};

export default AccountDropdown;

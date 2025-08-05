import { useNavigate } from "react-router-dom";
import { useUserStore } from "../util/stores/userStore";
import { useAuthStore, useLogout } from "../util/stores/authStore";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

import {
  // Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  // Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  href: string;
}

function NavBar() {
  const user = useUserStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const logout = useLogout();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const menuItems: MenuItem[] = [
    { text: "Home", icon: <HomeIcon />, href: "/" },
    { text: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
    { text: "Profile", icon: <PersonIcon />, href: "/profile" },
    { text: "Notes", icon: <AnalyticsIcon />, href: "/notes" },
    { text: "Setup", icon: <SettingsIcon />, href: "/setup" },
  ];

  const handleLogout = () => {
    logout();
    console.log("logged out");
    navigate("/login");
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navList = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {user && (
        <div style={{ margin: "1rem" }}>
          <div style={{ margin: "1rem" }} onClick={() => navigate("/profile")}>
            {user.firstName} {user.lastName}
          </div>
          <Divider />
        </div>
      )}
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item: MenuItem) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.href)}
              sx={{
                mx: 1,
                borderRadius: 1,
                "&:hover": {
                  //   backgroundColor: theme.palette.action.hover,
                },
                "&.active": {
                  //   backgroundColor: theme.palette.primary.light,
                  //   color: theme.palette.primary.contrastText,
                  "& .MuiListItemIcon-root": {
                    // color: theme.palette.primary.contrastText,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div style={{ justifyContent: "flex-end" }}>
        {isAuth ? (
          <button onClick={() => handleLogout()}>logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>login</button>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ height: "100dhv" }}>
      {/* small screen */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {navList}
        </Drawer>
      </Box>

      {/* large screen */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          width: "250px",
          backgroundColor: "#1e1e2f",
          color: "white",
          padding: "1rem",
          flexDirection: "column",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        {navList}
      </Box>
    </div>
  );
}

export default NavBar;

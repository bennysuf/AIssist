import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../util/stores/userStore";
import { useAuthStore, useLogout } from "../util/stores/authStore";

import { useState } from "react";

import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  Divider,
  ListItemButton,
  HomeIcon,
  PersonIcon,
  SettingsIcon,
  AnalyticsIcon,
  LogoutIcon,
  DashboardIcon,
  LoginIcon,
  Typography,
  MenuIcon,
} from "../util/muiExports";

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  href: string;
  order: number;
}

function NavBar() {
  const user = useUserStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [open, setOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      text: "Home",
      icon: <HomeIcon sx={{ marginRight: ".4em" }} />,
      href: "/",
      order: 1,
    },
    {
      text: "Setup",
      icon: <SettingsIcon sx={{ marginRight: ".4em" }} />,
      href: "/setup",
      order: 5,
    },
  ];

  if (isAuth) {
    menuItems.push(
      {
        text: "Profile",
        icon: <PersonIcon sx={{ marginRight: ".4em" }} />,
        href: "/profile",
        order: 2,
      },
      {
        text: "Notes",
        icon: <AnalyticsIcon sx={{ marginRight: ".4em" }} />,
        href: "/notes",
        order: 3,
      },
      {
        text: "Dashboard",
        icon: <DashboardIcon sx={{ marginRight: ".4em" }} />,
        href: "/portal",
        order: 4,
      }
    );
  }

  const handleLogout = () => {
    logout();
    console.log("logged out");
    navigate("/auth/login");
  };

  const navList = (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      {user && (
        <>
          <ListItem onClick={() => navigate("/profile")}>
            <ListItemButton
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "10px",
                color: "var(--text-primary)",
                "&:hover": {
                  backgroundColor: "var(--color-primary-dark)",
                },
              }}
            >
              <Typography>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography>{user.email}</Typography>
            </ListItemButton>
          </ListItem>
          <Divider variant="middle" sx={{ marginBottom: "1rem" }} />
        </>
      )}
      <List sx={{ flexGrow: 1, pt: 1, marginTop: "1rem" }}>
        {menuItems
          .sort((a, b) => a.order - b.order)
          .map((item: MenuItem) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={currentPath === item.href}
                disabled={currentPath === item.href}
                onClick={() => navigate(item.href)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  color: "var(--text-primary)",
                  "&.Mui-selected": {
                    backgroundColor: "var(--color-primary-light)",
                  },
                  "&:hover": {
                    backgroundColor: "var(--color-primary-dark)",
                  },
                }}
              >
                {item.icon}
                {item.text}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <List>
        <ListItem key="auth" disablePadding>
          {isAuth ? (
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: 1,
                color: "var(--text-primary)",
                "&:hover": {
                  backgroundColor: "var(--color-primary-dark)",
                },
              }}
              onClick={() => handleLogout()}
            >
              <LogoutIcon sx={{ marginRight: ".4em" }} />
              Logout
            </ListItemButton>
          ) : (
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: 1,
                color: "var(--text-primary)",
                "&:hover": {
                  backgroundColor: "var(--color-primary-dark)",
                },
              }}
              onClick={() => navigate("/auth/login")}
            >
              <LoginIcon sx={{ marginRight: ".4em" }} />
              Login / Signup
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </div>
  );

  return (
    <div style={{ height: "100dhv" }}>
      {/* small screen */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <Button
          sx={{ color: "white", zIndex: "10000", marginTop: ".4rem" }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          sx={{ zIndex: "10001" }}
        >
          {navList}
        </Drawer>
      </Box>

      {/* large screen */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          width: "250px",
          backgroundColor: "var(--color-primary-main)",
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

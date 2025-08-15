import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../util/stores/userStore";
import { useAuthStore, useLogout } from "../util/stores/authStore";

// import { useState } from "react";

import {
  Box,
  Drawer,
  // Button,
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
} from "../util/muiExports";
import { Badge } from "@mui/material";

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  href: string;
  order: number;
}

type Props = {
  setNavBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navBarOpen: boolean;
};

function NavBar({ setNavBarOpen, navBarOpen }: Props) {
  const user = useUserStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
        order: 4,
      },
      {
        text: "Inbox",
        icon: <AnalyticsIcon sx={{ marginRight: ".4em" }} />,
        href: "/inbox",
        order: 2,
      },
      {
        text: "Dashboard",
        icon: <DashboardIcon sx={{ marginRight: ".4em" }} />,
        href: "/portal",
        order: 3,
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
          <ListItem
            onClick={() => {
              navigate("/profile");
              setNavBarOpen(false);
            }}
          >
            <ListItemButton
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "10px",
                color: "var(--text-primary)",
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
            <ListItem key={item.text}>
              <Badge
              // TODO: change 1 to user.notes.unread.length
                badgeContent={item.text === "Notes" ? 1 : 0}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "var(--color-primary-dark)",
                    top: 20,
                    right: 7
                  },
                }}
              >
                <ListItemButton
                  selected={currentPath === item.href}
                  disabled={currentPath === item.href}
                  onClick={() => {
                    navigate(item.href);
                    setNavBarOpen(false);
                  }}
                  sx={{
                    width: "150px",
                    mx: 1,
                    borderRadius: 1,
                    color: "var(--text-primary)",
                    "&.Mui-selected": {
                      backgroundColor: "var(--color-primary-light)",
                    },
                    "&:hover": {
                      backgroundColor: { sm: "var(--color-primary-dark)" },
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "var(--color-primary-light)",
                    },
                  }}
                >
                  {item.icon}
                  {item.text}
                </ListItemButton>
              </Badge>
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
      <Box sx={{ flexGrow: 1 }}>
        <Drawer open={navBarOpen} onClose={() => setNavBarOpen(false)}>
          {navList}
        </Drawer>
      </Box>

      {/* large screen */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", sm: "flex" },
          width: "220px",
          backgroundColor: "var(--bg-default)",
          // backgroundColor: "var(--color-primary-main)",
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

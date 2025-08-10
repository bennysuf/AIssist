import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { useUserStore } from "./util/stores/userStore";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeStore } from "./util/stores/themeStore";
import { lightTheme, darkTheme } from "./util/theme/theme.ts";
import GlobalThemeVars from "./util/theme/GlobalThemeVars.tsx";
import { Box, AppBar } from "./util/muiExports.ts";

function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const location = useLocation();

  const mode = useThemeStore((state) => state.mode);
  const theme = mode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalThemeVars />
      <Box sx={{ display: "flex", height: { md: "100vh" } }}>
        {!location.pathname.includes("auth") && (
          <>
            <AppBar
              sx={{
                display: { sm: "none" },
                backgroundColor: "var(--color-primary-main)",
                width: "100%",
                height: "50px",
              }}
            />
            <NavBar />
          </>
        )}
        <Box sx={{ flex: 1, marginTop: { xs: "50px", sm: 0, md: 0 } }}>
          <AppRoutes />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

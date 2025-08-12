import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { useUserStore } from "./util/stores/userStore";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar.tsx";
import { useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeStore } from "./util/stores/themeStore";
import { lightTheme, darkTheme } from "./util/theme/theme.ts";
import GlobalThemeVars from "./util/theme/GlobalThemeVars.tsx";
import { Box } from "./util/muiExports.ts";

function App() {
  const [navBarOpen, setNavBarOpen] = useState<boolean>(false);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const location = useLocation();

  const mode = useThemeStore((state) => state.mode);
  const theme = mode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalThemeVars />
        {!location.pathname.includes("auth") && (
          <>
            <TopBar setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />
            <NavBar setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />
          </>
        )}
        <Box
          sx={{
            flex: 1,
            margin: { sm: ".5em" },
            backgroundColor: "var(--bg-paper)",
            borderRadius: { sm: "20px" },
          }}
        >
          <AppRoutes />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;

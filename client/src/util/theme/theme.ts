import { createTheme, type ThemeOptions } from "@mui/material/styles";

// Extend palette for custom colors
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      noteBorder: string;
      noteHighlight: string;
      completedBackground: string;
      tagBackground: string;
      placeholderText: string;
      selectedItem: string;
      hoverBackground: string;
      focusRing: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      noteBorder: string;
      noteHighlight: string;
      completedBackground: string;
      tagBackground: string;
      placeholderText: string;
      selectedItem: string;
      hoverBackground: string;
      focusRing: string;
    };
  }
}

const getSharedComponents = (mode: "light" | "dark"): ThemeOptions => {
  // You can define color variables based on mode here if needed
  const isDark = mode === "dark";

  return {
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "90%",
            marginBottom: "1em",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& fieldset": {
                borderColor: isDark ? "#42A5F5" : "#1565C0",
              },
              "&:hover fieldset": {
                borderColor: isDark ? "#64B6F7" : "#42A5F5",
              },
              "&.Mui-focused fieldset": {
                borderColor: isDark ? "#1565C0" : "#0D47A1",
              },
            },
            "& .MuiInputLabel-root": {
              color: isDark ? "" : "",
            },
            "& .MuiSelect-select": {
              color: isDark ? "" : "",
            },
            "& label.Mui-focused": {
              color: isDark ? "" : "",
            },
          },
        },
      },
    },
  };
};

// LIGHT THEME
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1565C0",
      light: "#42A5F5",
      dark: "#0D47A1",
    },
    secondary: {
      main: "#FF7043",
      light: "#FFAB91",
    },
    background: {
      default: "#dddddd",
      paper: "#F2F2F2",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
      disabled: "#94A3B8",
    },
    divider: "#E2E8F0",
    custom: {
      noteBorder: "#E2E8F0",
      noteHighlight: "#FEF3C7",
      completedBackground: "#D1FAE5",
      tagBackground: "#EDE9FE",
      placeholderText: "#CBD5E1",
      selectedItem: "#EBF4FF",
      hoverBackground: "#F1F5F9",
      focusRing: "#DBEAFE",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  ...getSharedComponents("light"),
});

// DARK THEME
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#42A5F5",
      light: "#64B6F7",
      dark: "#1565C0",
    },
    secondary: {
      main: "#FFAB91",
      light: "#FFCCBC",
    },
    background: {
      default: "#0F172A", // dark background
      paper: "#1E293B", // dark cards
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#CBD5E1",
      disabled: "#64748B",
    },
    divider: "#334155",
    custom: {
      noteBorder: "#334155",
      noteHighlight: "#78350F", // darker amber
      completedBackground: "#065F46", // teal
      tagBackground: "#4C1D95", // dark purple
      placeholderText: "#475569",
      selectedItem: "#1E40AF",
      hoverBackground: "#1E293B",
      focusRing: "#2563EB",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  ...getSharedComponents("dark"),
});

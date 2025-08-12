// GlobalThemeVars.tsx
import { GlobalStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const GlobalThemeVars = () => {
  const theme = useTheme();
  const palette = theme.palette;

  return (
    <GlobalStyles
      styles={{
        ":root": {
          // Primary Colors
          "--color-primary-main": palette.primary.main,
          "--color-primary-light": palette.primary.light,
          "--color-primary-dark": palette.primary.dark,

          // Secondary Colors
          "--color-secondary-main": palette.secondary.main,
          "--color-secondary-light": palette.secondary.light,

          // Backgrounds
          "--bg-default": palette.background.default,
          "--bg-paper": palette.background.paper,

          // Text
          "--text-primary": palette.text.primary,
          "--text-secondary": palette.text.secondary,
          "--text-disabled": palette.text.disabled,

          // Divider
          "--divider": palette.divider,

          // Custom
          "--note-border": palette.custom.noteBorder,
          "--note-highlight": palette.custom.noteHighlight,
          "--note-completed-bg": palette.custom.completedBackground,
          "--tag-bg": palette.custom.tagBackground,
          "--placeholder-text": palette.custom.placeholderText,
          "--selected-item": palette.custom.selectedItem,
          "--hover-bg": palette.custom.hoverBackground,
          "--focus-ring": palette.custom.focusRing,

          // Typography
          "--font-family": theme.typography.fontFamily,
        },
      }}
    />
  );
};

export default GlobalThemeVars;

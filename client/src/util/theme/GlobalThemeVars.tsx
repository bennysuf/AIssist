// GlobalThemeVars.tsx
import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GlobalThemeVars = () => {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        ':root': {
          // Primary Colors
          '--color-primary-main': theme.palette.primary.main,
          '--color-primary-light': theme.palette.primary.light,
          '--color-primary-dark': theme.palette.primary.dark,

          // Secondary Colors
          '--color-secondary-main': theme.palette.secondary.main,
          '--color-secondary-light': theme.palette.secondary.light,

          // Backgrounds
          '--bg-default': theme.palette.background.default,
          '--bg-paper': theme.palette.background.paper,

          // Text
          '--text-primary': theme.palette.text.primary,
          '--text-secondary': theme.palette.text.secondary,
          '--text-disabled': theme.palette.text.disabled,

          // Divider
          '--divider': theme.palette.divider,

          // Custom
          '--note-border': theme.palette.custom.noteBorder,
          '--note-highlight': theme.palette.custom.noteHighlight,
          '--note-completed-bg': theme.palette.custom.completedBackground,
          '--tag-bg': theme.palette.custom.tagBackground,
          '--placeholder-text': theme.palette.custom.placeholderText,
          '--selected-item': theme.palette.custom.selectedItem,
          '--hover-bg': theme.palette.custom.hoverBackground,
          '--focus-ring': theme.palette.custom.focusRing,

          // Typography
          '--font-family': theme.typography.fontFamily,
        },
      }}
    />
  );
};

export default GlobalThemeVars;

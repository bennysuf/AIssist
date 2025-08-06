import { createTheme } from '@mui/material/styles';

// Extend palette for custom colors
declare module '@mui/material/styles' {
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

// LIGHT THEME
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565C0',
      light: '#42A5F5',
      dark: '#0D47A1',
    },
    secondary: {
      main: '#FF7043',
      light: '#FFAB91',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      disabled: '#94A3B8',
    },
    divider: '#E2E8F0',
    custom: {
      noteBorder: '#E2E8F0',
      noteHighlight: '#FEF3C7',
      completedBackground: '#D1FAE5',
      tagBackground: '#EDE9FE',
      placeholderText: '#CBD5E1',
      selectedItem: '#EBF4FF',
      hoverBackground: '#F1F5F9',
      focusRing: '#DBEAFE',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

// DARK THEME
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#42A5F5',
      light: '#64B6F7',
      dark: '#1565C0',
    },
    secondary: {
      main: '#FFAB91',
      light: '#FFCCBC',
    },
    background: {
      default: '#0F172A', // dark background
      paper: '#1E293B',   // dark cards
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
      disabled: '#64748B',
    },
    divider: '#334155',
    custom: {
      noteBorder: '#334155',
      noteHighlight: '#78350F',      // darker amber
      completedBackground: '#065F46', // teal
      tagBackground: '#4C1D95',      // dark purple
      placeholderText: '#475569',
      selectedItem: '#1E40AF',
      hoverBackground: '#1E293B',
      focusRing: '#2563EB',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

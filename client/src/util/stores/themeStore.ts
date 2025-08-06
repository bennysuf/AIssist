import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light', // default mode
  toggleMode: () =>
    set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  setMode: (mode) => set({ mode }),
}));

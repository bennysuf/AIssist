import { create } from "zustand";
import * as authApi from "../api/authApi";
import { AxiosError } from "axios";
import type { AuthState } from "../dto/authDtos";
import { useUserStore } from "./userStore";

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  isAuth: false,

  setIsAuth: (bool) => set({ isAuth: bool }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authApi.login(email, password);
      if (res !== 200) {
        set({ error: "An unknown error occurred" });
        return false;
      }
      set({ isLoading: false, isAuth: true });
      useUserStore.getState().fetchUser();
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message
          : "An unknown error occurred";
      set({ error: message });
      return false;
    }
  },

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authApi.signup(userData);
      if (res !== 201) {
        set({ error: "An unknown error occurred" });
        return false;
      }
      set({ isLoading: false, isAuth: true });
      useUserStore.getState().fetchUser();
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message
          : "An unknown error occurred";
      set({ error: message });
      return false;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error("Logout failed silently:", e);
    } finally {
      set({ isAuth: false });
      useUserStore.getState().resetUser();
    }
  },
}));

export const useLogout = () => useAuthStore((state) => state.logout);
export const useLogin = () => useAuthStore((state) => state.login);
export const useSignup = () => useAuthStore((state) => state.signup);

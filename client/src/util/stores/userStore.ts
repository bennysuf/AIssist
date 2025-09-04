import { create } from "zustand";
import * as userApi from "../api/userApi";
import type { UserState } from "../dto/userDtos";
import { useAuthStore } from "./authStore";
import { AxiosError } from "axios";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  resetUser: () => set({ user: null }),

  fetchUser: async () => {
    const res = await userApi.fetchUser();
    console.log("fetch user: ", res);
    set({ user: res });
    useAuthStore.getState().setIsAuth(true);
  },

  updateProfile: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      const res = await userApi.updateUser(updates);
      set({ user: res });
      return true
    } catch (err: unknown) {
      const message =
      err instanceof AxiosError
      ? err.response?.data?.message
      : "An unknown error occurred";
      set({ error: message });
      return false
    } finally {
      set({ isLoading: false });
    }
  },
}));

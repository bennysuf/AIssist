import { create } from "zustand";
import * as userApi from "../api/userApi";
import type { UserState } from "../dto/userDtos";
import { useAuthStore } from "./authStore";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  resetUser: () => set({ user: null }),

  fetchUser: async () => {
    const user = await userApi.fetchUser();
    console.log("fetch user: ", user);
    set({ user });
    useAuthStore.getState().setIsAuth(true);
  },

  updateProfile: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userApi.updateUser(updates);
      set({ user });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

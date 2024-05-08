import { create } from "zustand";
import { refresh } from "./api/auth";
export const useAuthStore = create((set, get) => ({
  token: false,
  isAuth: false,
  setAccessToken: async (token) =>
    set(() => ({ token: token, isAuth: token ? token : false })),
  refreshToken: async () => {
    const data = await refresh();
    set(() => ({ token: data.accessToken }));
  },
}));

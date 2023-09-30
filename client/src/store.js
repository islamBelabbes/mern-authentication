import { create } from "zustand";
import { login as loginApi, refresh } from "./api/auth";
export const useAuthStore = create((set, get) => ({
  token: "",
  setAccessToken: async (token) => set(() => ({ token: token })),
  refreshToken: async () => {
    const data = await refresh();
    set(() => ({ token: data.accessToken }));
  },
}));

import axios from "axios";
import { useAuthStore } from "../store";
import { logout } from "../api/auth";
export const publicApi = axios.create({
  // baseURL: "https://mern-authentication-system-backend.onrender.com",
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
export const privetApi = axios.create({
  // baseURL: "https://mern-authentication-system-backend.onrender.com",
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
export const refreshTokenApi = axios.create({
  baseURL: "http://localhost:5000/auth/refresh",
  // baseURL: "https://mern-authentication-system-backend.onrender.com/auth/refresh",

  withCredentials: true,
});

privetApi.interceptors.request.use(
  function (config) {
    const token = useAuthStore.getState().token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

privetApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { config } = error;
    if (error?.response?.status === 401) {
      await useAuthStore.getState().refreshToken();
      return privetApi(config);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
refreshTokenApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error?.response?.status === 401) {
      useAuthStore.getState().setAccessToken("");
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

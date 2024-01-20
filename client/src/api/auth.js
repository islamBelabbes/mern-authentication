import axios from "axios";
import { publicApi, privetApi, refreshTokenApi } from "../utility/axios";

export const login = async (data) => {
  try {
    const response = await publicApi.post("auth/login", data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
export const register = async (data) => {
  try {
    const response = await publicApi.post("auth/register", data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
export const logout = async () => {
  try {
    const response = await publicApi.delete("auth/logout");
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
export const refresh = async () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  try {
    const response = await refreshTokenApi.post(
      "",
      {},
      {
        CancelToken: source,
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
export const me = async () => {
  try {
    const response = await privetApi.get("auth/me");
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

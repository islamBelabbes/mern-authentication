import jwtDecode from "jwt-decode";

export const isExpired = async (token) => {
  if (!token) return false;
  const Decoded = jwtDecode(token);
  const expiry = Decoded.exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};

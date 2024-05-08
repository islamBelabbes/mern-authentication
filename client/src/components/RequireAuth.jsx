import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Logout from "./Logout";
import { useAuthStore } from "../store";

function RequireAuth() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const location = useLocation();
  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }
  return (
    <>
      <Logout />
      <Outlet />
    </>
  );
}

export default RequireAuth;

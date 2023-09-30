import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/auth/useIsAuthenticated";
import Logout from "./Logout";

function RequireAuth() {
  const isAuth = useIsAuthenticated();
  const location = useLocation();

  if (isAuth !== undefined && !isAuth)
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  return (
    <>
      <Logout />
      <Outlet />
    </>
  );
}

export default RequireAuth;

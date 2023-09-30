import { useEffect, useState } from "react";
import { useAuthStore } from "../../store";
import { isExpired } from "../../utility/utility";
function useIsAuthenticated() {
  const token = useAuthStore((state) => state.token);
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    if (!token && isExpired(token)) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, [token]);

  return isAuth;
}

export default useIsAuthenticated;

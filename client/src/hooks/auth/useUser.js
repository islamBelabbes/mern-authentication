import { useAuthStore } from "../../store";
import jwtDecode from "jwt-decode";
import { me } from "../../api/auth";
function useUser() {
  const token = useAuthStore((state) => state.token);

  const getUser = () => {
    if (!token) return;
    return jwtDecode(token);
  };
  const getFullUser = async () => {
    const data = await me();
    const { refreshToken, ...other } = data;
    return other;
  };

  return [getUser, getFullUser];
}

export default useUser;

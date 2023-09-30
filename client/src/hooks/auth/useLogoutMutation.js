import { useAuthStore } from "../../store";
import { useMutation } from "react-query";
import { logout as logoutApi } from "../../api/auth";

function useLogoutMutation() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      setAccessToken("");
    },
  });
  const logout = () => logoutMutation.mutate();
  return {
    logout,
    isLoading: logoutMutation.isLoading,
  };
}

export default useLogoutMutation;

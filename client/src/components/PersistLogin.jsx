import React, { useEffect, useState } from "react";
import BlockUi from "./BlockUi";
import { useAuthStore } from "../store";
import { useMutation } from "react-query";
import { refresh } from "../api/auth";
import { isExpired } from "../utility/utility";
function PersistLogin({ children }) {
  const token = useAuthStore((state) => state.token);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const [loading, isLoading] = useState(true);
  const refreshMutation = useMutation({
    mutationFn: refresh,
    onSuccess: (data) => {
      setInterval(() => {
        refreshToken();
      }, data?.expPeriod * 1000 || 1000 * 60 * 3);
      setAccessToken(data.accessToken);
    },
    onSettled: () => {
      isLoading(false);
    },
  });
  useEffect(() => {
    if (!token && isExpired(token)) {
      refreshMutation.mutate();
    }
  }, []);
  if (refreshMutation.isLoading || loading) {
    return (
      <BlockUi blocked={true} className={"h-screen"} overlay={false}></BlockUi>
    );
  }

  return children;
}

export default PersistLogin;

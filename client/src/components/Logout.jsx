import React from "react";
import BlockUi from "./BlockUi";
import useLogoutMutation from "../hooks/auth/useLogoutMutation";
function Logout() {
  const { logout, isLoading } = useLogoutMutation();
  return (
    <BlockUi blocked={isLoading} className={"mt-1"}>
      <button
        onClick={logout}
        className="p-2 mt-1 text-white rounded bg-zinc-900 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        logout
      </button>
    </BlockUi>
  );
}

export default Logout;

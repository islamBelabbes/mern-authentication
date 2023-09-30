import React, { useState } from "react";
import useUser from "../hooks/auth/useUser";
import BlockUi from "./BlockUi";
function Account() {
  const [userData, setUserDate] = useState("");
  const [getUser, getFullUser] = useUser();
  const GetData = async () => {
    const user = getUser();
    setUserDate(user);
  };
  const GetFullData = async () => {
    const user = await getFullUser();
    setUserDate(user);
  };
  return (
    <div className="w-[500px] flex flex-col justify-center border-amber-200 border p-3 overflow-x-auto">
      <h1 className="text-center">Account Data</h1>
      <BlockUi blocked={false} className={"mt-1"}>
        <button
          className="w-full mt-1 text-white rounded bg-zinc-900 disabled:opacity-5 disabled:cursor-not-allowed"
          onClick={GetData}
        >
          Get Data
        </button>
        <button
          className="w-full mt-1 text-white rounded bg-zinc-900 disabled:opacity-5 disabled:cursor-not-allowed"
          onClick={GetFullData}
        >
          Get Full Data
        </button>
      </BlockUi>
      {userData && <span>{JSON.stringify(userData)}</span>}
    </div>
  );
}

export default Account;

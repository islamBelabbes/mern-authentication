import React from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { login } from "../api/auth";
import BlockUi from "./BlockUi";
import { useAuthStore } from "../store";
import useIsAuthenticated from "../hooks/auth/useIsAuthenticated";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
function Login() {
  let { state } = useLocation();
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const loginMutation = useMutation({
    mutationFn: (options) => login(options),
    onMutate: () => {
      toast.dismiss();
    },
    onSuccess: (data) => {
      toast.success("Login Success redirecting...", {
        onClose: () => {
          setInterval(() => {
            refreshToken();
          }, data?.expPeriod * 1000 || 1000 * 60 * 3);
          setAccessToken(data.accessToken);
          state?.from ? navigate(state?.from) : navigate("/");
        },
        autoClose: 500,
      });
    },

    onError: (err) => {
      if (err.response.status === 400)
        toast.error(err.response.data.message, { toastId: 400 });
      if (err.response.status === 404)
        toast.error(err.response.data.message, { toastId: 404 });
      if (err.response.status === 401)
        toast.error(err.response.data.message, { toastId: 401 });
    },
    retry: false,
  });
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formObj = new FormData(e.target);
    const formProps = Object.fromEntries(formObj);
    loginMutation.mutate(formProps);
  };
  if (isAuth !== undefined && isAuth) return <Navigate to="/" replace />;
  return (
    <div className="w-[500px] flex flex-col justify-center border-amber-200 border p-3">
      <h1 className="text-center">Login</h1>
      <BlockUi blocked={loginMutation.isLoading}>
        <form onSubmit={SubmitHandler} className="relative">
          <label htmlFor="email">Email</label>
          <input
            className="w-full border border-amber-950"
            type="text"
            name="email"
            id="email"
          />
          <label htmlFor="password">password</label>
          <input
            className="w-full border border-amber-950"
            type="password"
            name="password"
            id="password"
          />
          <button
            className="w-full mt-1 text-white rounded bg-zinc-900 disabled:cursor-not-allowed"
            disabled={loginMutation.isLoading}
          >
            Login
          </button>
          <span className="flex justify-center gap-1 mt-2">
            {" "}
            not a member yet ? <Link to="/signup"> signUp </Link>{" "}
          </span>
        </form>
      </BlockUi>
    </div>
  );
}

export default Login;

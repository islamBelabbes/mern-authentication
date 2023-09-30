import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/auth/useIsAuthenticated";
import { useMutation } from "react-query";
import { register } from "../api/auth";
import { toast } from "react-toastify";
import BlockUi from "./BlockUi";

function Register() {
  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: register,
    onError: (err) => {
      if (err.response.status === 400)
        toast.error(err.response.data.message, { toastId: 400 });
      if (err.response.status === 409)
        toast.error(err.response.data.message, { toastId: 409 });
    },
    onSuccess: () => {
      toast.success("Register Success redirecting...", {
        onClose: () => navigate("/"),
        autoClose: 500,
      });
    },
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formObj = new FormData(e.target);
    const formProps = Object.fromEntries(formObj);
    signUpMutation.mutate(formProps);
  };
  if (isAuth !== undefined && isAuth) return <Navigate to="/" replace />;
  return (
    <div className="w-[500px] flex flex-col justify-center border-amber-200 border p-3">
      <h1 className="text-center">Register</h1>
      <BlockUi blocked={signUpMutation.isLoading}>
        <form onSubmit={SubmitHandler}>
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
          <button className="w-full mt-1 text-white rounded bg-zinc-900 disabled:opacity-5 disabled:cursor-not-allowed">
            Register
          </button>
          <span className="flex justify-center gap-1 mt-2">
            {" "}
            already have an account? <Link to="/login"> Login </Link>{" "}
          </span>
        </form>
      </BlockUi>
    </div>
  );
}

export default Register;

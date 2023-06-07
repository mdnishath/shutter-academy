import React from "react";
import { BsGoogle } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import GlobalLoader from "./loaders/GlobalLoader";

import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../hooks/useAxios";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { googleLogin, setLoading, loading } = useAuth();
  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleLogin();
      setLoading(true);
      const apiResult = await API.post("/users", {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        role: "student",
      });
      if (apiResult.status == 200) {
        setLoading(false);
        toast.success("Login Success");
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  // if (loading) {
  //   return <GlobalLoader />;
  // }
  return (
    <div className="flex justify-center gap-5">
      <div
        onClick={handleGoogleLogin}
        className="flex items-center justify-center w-full gap-4 py-2 text-lg font-semibold text-gray-900 rounded-lg cursor-pointer bg-primary"
      >
        <BsGoogle />
        <p>Login With Google</p>
      </div>
    </div>
  );
};

export default SocialLogin;

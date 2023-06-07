import React from "react";
import { BsGoogle } from "react-icons/bs";

const SocialLogin = () => {
  const handleGoogleLogin = () => {};
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

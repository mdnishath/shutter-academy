import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import loginImage from "../assets/login.svg";
import Title from "../components/shared/Title";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import SocialLogin from "../components/SocialLogin ";
import Container from "../components/shared/Container";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { API } from "../hooks/useAxios";

const Signup = () => {
  const [showPaword, setShowPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, loading, setLoading, uploadImage, updateUser } =
    useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const file = data.image[0];
      const uploadURL = await uploadImage(file);
      if (uploadURL) {
        const { user } = await createUser(data.email, data.password);
        await updateUser(data.name, uploadURL);
        setLoading(true);
        const apiResult = await API.post("/users", {
          email: data.email,
          name: data.name,
          photo: uploadURL,
          role: "student",
        });
        setLoading(false);
        if (apiResult.status == 200 || 201) {
          setLoading(false);
          toast.success("Registration Success");
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="md:py-[100px] py-5">
      <Container>
        <div className="relative w-full px-5 overflow-hidden border-2 rounded-md shadow-lg border-gray-2 dark:border-gray-800 bg-overlay md:py-10 border-overlay-light">
          <div className="grid py-5 md:grid-cols-2 md:py-0 md:p-5">
            <div className="flex items-center justify-center order-2 h-full mt-5 md:mt-0">
              <figure className="flex justify-center">
                <img className="w-[400px]" src={loginImage} />
              </figure>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex justify-center">
                <Title text={"Create An Account"} />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center h-full gap-4 md:p-5"
              >
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    placeholder="Your name "
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-textLight"
                  />
                  <div className="bg-primary absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <AiOutlineUser className="text-xl text-gray-900" />
                  </div>
                </div>
                <div>
                  {errors.name && (
                    <span className="text-red-400">{errors.name.message}</span>
                  )}
                </div>
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email is invalid",
                      },
                    })}
                    placeholder="Email "
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-textLight"
                  />
                  <div className="bg-primary absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <MdOutlineEmail className="text-xl text-gray-900" />
                  </div>
                </div>
                <div>
                  {errors.email && (
                    <span className="text-red-400">{errors.email.message}</span>
                  )}
                </div>
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type={showPaword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,15}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and be 6-15 characters long",
                      },
                    })}
                    placeholder="Password"
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-textLight"
                  />

                  <div className="bg-primary  absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <MdOutlinePassword className="text-xl text-gray-900" />
                  </div>
                  {showPaword ? (
                    <div
                      onClick={() => setShowPassword(!showPaword)}
                      className="bg-primary cursor-pointer absolute right-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]"
                    >
                      <AiFillEyeInvisible className="text-xl text-gray-900" />
                    </div>
                  ) : (
                    <div
                      onClick={() => setShowPassword(!showPaword)}
                      className="bg-primary cursor-pointer absolute right-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]"
                    >
                      <AiFillEye className="text-xl text-gray-900" />
                    </div>
                  )}
                </div>
                <div>
                  {errors.password && (
                    <span className="text-red-400">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type={showPaword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-textLight"
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value) =>
                        value === password || "The passwords do not match",
                    })}
                  />

                  <div className="bg-primary  absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <MdOutlinePassword className="text-xl text-gray-900" />
                  </div>
                  {showPaword ? (
                    <div
                      onClick={() => setShowPassword(!showPaword)}
                      className="bg-primary cursor-pointer absolute right-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]"
                    >
                      <AiFillEyeInvisible className="text-xl text-gray-900" />
                    </div>
                  ) : (
                    <div
                      onClick={() => setShowPassword(!showPaword)}
                      className="bg-primary cursor-pointer absolute right-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]"
                    >
                      <AiFillEye className="text-xl text-gray-900" />
                    </div>
                  )}
                </div>
                <div>
                  {errors.confirmPassword && (
                    <span className="text-red-400">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
                <div className="relative overflow-hidden rounded-md">
                  <label htmlFor="imageUpload" className="w-full">
                    <input
                      id="imageUpload"
                      type="file"
                      {...register("image", { required: "Image is requred" })}
                      className="w-full max-w-xs bg-transparent text-text-dark"
                      accept="image/png, image/jpeg"
                    />
                  </label>
                </div>
                <div>
                  {errors.image && (
                    <span className="text-red-400">{errors.image.message}</span>
                  )}
                </div>

                <div className="relative flex flex-col justify-end overflow-hidden">
                  {loading ? (
                    <button className="w-full px-10 py-2 text-lg font-semibold rounded-md bg-primary">
                      <BeatLoader className="text-surfece" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full px-10 py-2 text-lg font-semibold rounded-md bg-primary text-textDark"
                    >
                      Sign Up
                    </button>
                  )}
                  <p className="mt-5 text-center dark:text-white text-textDark">
                    Already have an account?
                    <Link to={"/login"} className="ml-1">
                      Login Here
                    </Link>
                  </p>
                </div>
                <div className="divider !my-2 before:bg-borderLight after:bg-borderLight text-primary font-semibold">
                  OR
                </div>
                <div>
                  <SocialLogin />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;

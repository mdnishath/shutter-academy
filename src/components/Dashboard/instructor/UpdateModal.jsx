import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { BsJournalBookmark } from "react-icons/bs";
import {
  AiOutlineDollarCircle,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import GlobalLoader from "../../loaders/GlobalLoader";

const UpdateModal = ({ item, handleClose }) => {
  console.log(item._id);
  const { loading, user, uploadImage } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    data: apiClass = {},
    isLoading,
    refetch,
  } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/instructor/class/${item._id}`);
    return res.data;
  });

  const onSubmit = async (data) => {
    // try {
    //   const file = data.image[0];
    //   const imageURL = await uploadImage(file);
    //   if (imageURL) {
    //     const result = await axiosSecure.post("/instructor", {
    //       title: data.title,
    //       instructor: data.instructor,
    //       price: data.price,
    //       seats: data.seats,
    //       email: data.email,
    //       image: imageURL,
    //       stutas: "pending",
    //       enrolled: 0,
    //     });
    //     if (result.data.insertedId) {
    //       toast.success("Class added successfully");
    //       reset();
    //     }
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };
  if (isLoading || isLoading) {
    return <GlobalLoader />;
  }
  return (
    <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-60">
      <div className="bg-gray-800 w-[960px] py-10 px-5 rounded-lg relative">
        <button
          onClick={handleClose}
          htmlFor="my-modal-3"
          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center h-full gap-4 md:p-5"
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type="text"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    placeholder="Class Title "
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-textLight"
                    defaultValue={apiClass?.title}
                  />
                  <div className="bg-primary absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <BsJournalBookmark className="text-xl text-gray-900" />
                  </div>
                </div>
                <div>
                  {errors.title && (
                    <span className="text-red-400">{errors.title.message}</span>
                  )}
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type="text"
                    {...register("instructor", {
                      required: "Instructor name is required",
                    })}
                    placeholder="Instructor name"
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-white"
                    defaultValue={user?.displayName}
                    readOnly
                  />

                  <div className="bg-primary  absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <AiOutlineUser className="text-xl text-gray-900" />
                  </div>
                </div>
                <div>
                  {errors.instructor && (
                    <span className="text-red-400">
                      {errors.instructor.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type="email"
                    {...register("email", {
                      required: "Instructor email is required",
                    })}
                    placeholder="Instructor email"
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-white"
                    defaultValue={user?.email}
                    readOnly
                  />

                  <div className="bg-primary  absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <AiOutlineMail className="text-xl text-gray-900" />
                  </div>
                </div>
                <div>
                  {errors.instructor && (
                    <span className="text-red-400">
                      {errors.instructor.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type="number"
                    {...register("seats", {
                      required: "Available seats is required",
                    })}
                    placeholder="Available seats"
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-white"
                    min={1}
                    defaultValue={apiClass?.seats}
                  />

                  <div className="bg-primary  absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <MdOutlineAirlineSeatReclineExtra className="text-xl text-gray-900" />
                  </div>
                </div>
                <div>
                  {errors.seats && (
                    <span className="text-red-400">{errors.seats.message}</span>
                  )}
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden rounded-md">
                  <input
                    type="number"
                    {...register("price", {
                      required: "Price is required",
                    })}
                    placeholder="Price"
                    className="w-full bg-transparent border border-borderLight py-2 px-[60px] rounded-md outline-none text-textDark dark:text-white"
                    min={1}
                    defaultValue={apiClass?.price}
                  />

                  <div className="bg-primary  absolute left-0 top-1/2 transform  -translate-y-1/2 h-full flex items-center justify-center w-[40px]">
                    <AiOutlineDollarCircle className="text-xl text-gray-900" />
                  </div>
                </div>
                <div>
                  {errors.price && (
                    <span className="text-red-400">{errors.price.message}</span>
                  )}
                </div>
              </div>
              <div>
                <div className="relative overflow-hidden rounded-md">
                  <label htmlFor="imageUpload" className="w-full">
                    <input
                      id="imageUpload"
                      type="file"
                      {...register("image", { required: "Image is requred" })}
                      className="w-full bg-transparent text-text-dark"
                      accept="image/png, image/jpeg"
                    />
                  </label>
                </div>
                <div>
                  {errors.image && (
                    <span className="text-red-400">{errors.image.message}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-end overflow-hidden">
              {loading ? (
                <button className="w-full px-10 py-2 text-lg font-semibold rounded-md bg-primary text-textDark">
                  <BeatLoader className="text-surfece" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full px-10 py-2 text-lg font-semibold rounded-md bg-primary text-textDark"
                >
                  Update Class
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

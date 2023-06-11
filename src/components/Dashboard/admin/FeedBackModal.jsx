import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GlobalLoader from "../../loaders/GlobalLoader";
import { toast } from "react-hot-toast";
import Title from "../../shared/Title";

const FeedBackModal = ({ item, handleClose }) => {
  const queryClient = useQueryClient();
  // console.log(item._id);
  const { loading, user, uploadImage } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const mutation = useMutation({
    mutationFn: async ({ id, feedback }) => {
      const response = await axiosSecure.patch(`/admin/class/feedback/${id}`, {
        feedback,
      });

      const { modifiedCount } = response.data;
      if (modifiedCount > 0) {
        toast.success("Feedback given");
        queryClient.invalidateQueries("classes");
        handleClose();
      }
      return response;
    },
  });
  const { isLoading: updateLoading } = mutation;

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync({ id: item?._id, feedback: data.message });
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };
  const handleCloseClear = () => {
    reset();
    handleClose();
  };

  if (updateLoading) {
    return <GlobalLoader />;
  }
  return (
    <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-60">
      <div className="bg-gray-800 w-[960px] py-10 px-5 rounded-lg relative">
        <button
          onClick={handleCloseClear}
          htmlFor="my-modal-3"
          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <div className="">
          <div className="text-center">
            <Title text={"Provide Feedback"} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center h-full gap-4 md:p-5"
          >
            <div className="grid grid-cols-1 gap-5">
              <div>
                <div className="relative overflow-hidden rounded-md">
                  <textarea
                    {...register("message", {
                      required: "message is required",
                    })}
                    className="w-full textarea textarea-bordered"
                    placeholder="Write your feedback"
                  />
                </div>
                <div>
                  {errors.message && (
                    <span className="text-red-400">
                      {errors.message.message}
                    </span>
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
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedBackModal;

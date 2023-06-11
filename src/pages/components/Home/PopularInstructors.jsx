import React from "react";
import { API } from "../../../hooks/useAxios";
import Image from "../../../components/shared/Image";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineBook, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { BiUserPin } from "react-icons/bi";

const PopularInstructors = () => {
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery(["classes"], async () => {
    const res = await API.get("/classes");
    return res.data;
  });
  if (isLoading) {
    return <GlobalLoader />;
  }
  console.log(classes);
  return (
    <div className="grid grid-cols-3 gap-5">
      {classes.map((item) => (
        <div
          key={item?._id}
          className="overflow-hidden rounded-lg shadow-xl dark:bg-gray-800"
        >
          <Image
            className="w-[120px] h-[120px] rounded-full mx-auto object-cover mt-5"
            src={item?.instructorImage}
            alt="Image"
          />
          <div className="flex flex-col items-center justify-center gap-3 px-3 py-8">
            <div className="flex gap-2">
              <BiUserPin className="items-center text-2xl text-primary" />
              <h3 className="text-lg"> {item?.instructor}</h3>
            </div>
            <div className="flex gap-5">
              <div className="flex gap-2">
                <AiOutlineUsergroupAdd className="items-center text-2xl text-primary" />
                <p>{item?.enrolled}</p>
              </div>
              {/* <div className="flex gap-2">
                <BsCurrencyDollar className="items-center text-2xl text-primary" />
                <p>{item?.price}</p>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularInstructors;

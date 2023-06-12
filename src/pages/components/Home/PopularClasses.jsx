import React, { useEffect } from "react";
import { API } from "../../../hooks/useAxios";
import Image from "../../../components/shared/Image";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineBook, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const PopularClasses = () => {
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
    <div className="grid gap-5 md:grid-cols-3">
      <AnimatePresence>
        {classes.map((item) => (
          <motion.div
            key={item?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-lg shadow-xl dark:bg-gray-800"
          >
            <Image
              className="w-full h-[200px] object-cover"
              src={item?.image}
              alt="Image"
            />
            <div className="flex flex-col gap-3 px-3 py-8">
              <div className="flex gap-2">
                <AiOutlineBook className="items-center text-2xl text-primary" />
                <h3 className="text-lg"> {item?.title}</h3>
              </div>
              <div className="flex gap-5">
                <div className="flex gap-2">
                  <AiOutlineUsergroupAdd className="items-center text-2xl text-primary" />
                  <p>{item?.enrolled}</p>
                </div>
                <div className="flex gap-2">
                  <BsCurrencyDollar className="items-center text-2xl text-primary" />
                  <p>{item?.price}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PopularClasses;

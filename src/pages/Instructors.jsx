import React from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import { useQuery } from "@tanstack/react-query";
import { API } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import GlobalLoader from "../components/loaders/GlobalLoader";
import { BiUserPin } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import Image from "../components/shared/Image";

const Instructors = () => {
  const { loading } = useAuth();
  const {
    data: instructors = [],
    isLoading,
    refetch,
  } = useQuery(["classes"], async () => {
    const res = await API.get("/instructor/all");
    return res.data;
  });
  if (isLoading) {
    return <GlobalLoader />;
  }
  return (
    <div>
      <Container>
        <div>
          <div className="my-5 text-center">
            <div className="my-6 ">
              <Title text={"Our Instractors"} />
              <p className="mt-2">
                Numbers of instructors: {instructors.length}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {instructors.map((item) => (
                <div
                  key={item?._id}
                  className="overflow-hidden rounded-lg shadow-xl dark:bg-gray-800"
                >
                  <Image
                    className="w-[120px] h-[120px] rounded-full mx-auto object-cover mt-5"
                    src={item?.photo}
                    alt="Image"
                  />
                  <div className="flex flex-col items-center justify-center gap-3 px-3 py-8">
                    <div className="flex gap-2">
                      <BiUserPin className="items-center text-2xl text-primary" />
                      <h3 className="text-lg"> {item?.name}</h3>
                    </div>
                    <div className="flex gap-5">
                      <div className="flex gap-2">
                        <AiOutlineMail className="items-center text-2xl text-primary" />
                        <p>{item?.email}</p>
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Instructors;

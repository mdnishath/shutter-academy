import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ArrowNext = () => {
  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-10 z-[102] cursor-pointer">
      <AiOutlineArrowLeft className="text-4xl text-primary" />
    </div>
  );
};

export default ArrowNext;

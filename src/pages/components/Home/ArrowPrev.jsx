import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
const ArrowPrev = () => {
  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 right-10 z-[103] cursor-pointer">
      <AiOutlineArrowRight className="text-4xl text-primary" />
    </div>
  );
};

export default ArrowPrev;

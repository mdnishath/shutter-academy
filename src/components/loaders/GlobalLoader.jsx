import React from "react";
import { PuffLoader } from "react-spinners";

const GlobalLoader = () => {
  return (
    <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white dark:bg-gray-800">
      <PuffLoader color="#36d7b7" />
    </div>
  );
};

export default GlobalLoader;

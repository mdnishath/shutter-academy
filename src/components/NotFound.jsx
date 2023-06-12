import React from "react";
import notFound from "../assets/404.svg";
import Image from "./shared/Image";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Image src={notFound} alt="Not found" />
    </div>
  );
};

export default NotFound;

import React from "react";
import logo from "../../assets/logo.svg";
import Image from "../shared/Image";

const Sidbar = () => {
  return (
    <div className="dark:bg-gray-800 bg-white shadow-xl w-[250px] p-4">
      <div className="flex-shrink-0">
        <Image src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Sidbar;

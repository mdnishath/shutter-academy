import React from "react";
import logo from "../../assets/logo.svg";
import Image from "../shared/Image";
import { FaUsers } from "react-icons/fa";
import { MdOutlineClass, MdOutlineFlightClass } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";
import Item from "./shared/Item";
import useRole from "../../hooks/useRole";
import GlobalLoader from "../loaders/GlobalLoader";

const Sidebar = () => {
  const [role, isroleLoading] = useRole();
  // const role = "admin";

  const adminPages = [
    { path: "/dashboard", name: "Dashboard", icon: RxDashboard },
    { path: "/dashboard/users", name: "Manage Users", icon: FaUsers },
    {
      path: "/dashboard/classes",
      name: "Manage Classes",
      icon: MdOutlineClass,
    },
    { path: "/dashboard/profile", name: "Profile", icon: FiSettings },
    { path: "/", name: "Back To Home", icon: AiOutlineHome },
  ];
  const instructorPages = [
    { path: "/dashboard", name: "Dashboard", icon: RxDashboard },
    {
      path: "/dashboard/add-class",
      name: "Add a Class",
      icon: MdOutlineClass,
    },
    {
      path: "/dashboard/my-classes",
      name: "My Classes",
      icon: MdOutlineFlightClass,
    },
    { path: "/dashboard/profile", name: "Profile", icon: FiSettings },
    { path: "/", name: "Back To Home", icon: AiOutlineHome },
  ];
  const studentPages = [
    { path: "/dashboard", name: "Dashboard", icon: RxDashboard },
    {
      path: "/dashboard/my-selted-classes",
      name: "My Selected Classes",
      icon: MdOutlineClass,
    },
    {
      path: "/dashboard/my-enrilled-classes",
      name: "My Enrolled Classes",
      icon: MdOutlineFlightClass,
    },
    { path: "/dashboard/payment", name: "Payment", icon: FiSettings },
    { path: "/dashboard/profile", name: "Profile", icon: FiSettings },
    { path: "/", name: "Back To Home", icon: AiOutlineHome },
  ];
  if (isroleLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="dark:bg-gray-800 fixed top-0 left-0 h-full bg-white  shadow-xl w-[250px] p-4">
      <div className="flex-shrink-0">
        <Image src={logo} alt="Logo" />
      </div>
      {role === "admin" && (
        <ul className="flex flex-col gap-5 mt-10">
          {adminPages.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </ul>
      )}
      {role === "instructor" && (
        <ul className="flex flex-col gap-5 mt-10">
          {instructorPages.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </ul>
      )}
      {role === "student" && (
        <ul className="flex flex-col gap-5 mt-10">
          {studentPages.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

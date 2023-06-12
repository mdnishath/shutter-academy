import React from "react";
import logo from "../assets/logo.svg";
import useIsMobileScreen from "../hooks/useIsMobileScreen";
import DeskTopMenu from "./DeskTopMenu";
import MobileMenu from "./MobileMenu";

const menuOptions = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/instructors",
    name: "Instructors",
  },
  {
    path: "/classes",
    name: "Classes",
  },
];
const Navbar = () => {
  const isMobile = useIsMobileScreen();
  return isMobile ? (
    <MobileMenu menuOptions={menuOptions} logo={logo} />
  ) : (
    <DeskTopMenu menuOptions={menuOptions} logo={logo} />
  );
};

export default Navbar;

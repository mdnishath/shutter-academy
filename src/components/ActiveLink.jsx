import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  const { pathname } = useLocation();

  const isActive = pathname === to;

  const combinedClassName = isActive
    ? "text-primary text-lg active"
    : "text-lg";

  return (
    <NavLink to={to} className={combinedClassName}>
      {children}
    </NavLink>
  );
};

export default ActiveLink;

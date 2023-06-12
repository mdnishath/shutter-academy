import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import GlobalLoader from "../components/loaders/GlobalLoader";
import useRole from "../hooks/useRole";
const StudentRoute = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <GlobalLoader />;
  }

  if (user && role === "student") {
    return children;
  }

  if ((user && role === "admin") || "instructor") {
    return (
      <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
    );
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;

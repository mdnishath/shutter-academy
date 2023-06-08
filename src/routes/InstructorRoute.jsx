import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import GlobalLoader from "../components/loaders/GlobalLoader";
import useAdmin from "../hooks/useAdmin";
const InstructorRoute = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const [role, isroleLoading] = useAdmin();
  const location = useLocation();

  if (loading || isroleLoading) {
    return <GlobalLoader />;
  }

  if (user && role === "instructor") {
    return children;
  }

  if ((user && role === "admin") || "student") {
    return (
      <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
    );
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;

import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import GlobalLoader from "../components/loaders/GlobalLoader";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading, logOut, setLoading } = useAuth();
  const [role, isroleLoading] = useRole();
  const location = useLocation();

  if (loading || isroleLoading) {
    return <GlobalLoader />;
  }

  if (user && role === "admin") {
    return children;
  }

  if ((user && role === "instructor") || "student") {
    return (
      <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
    );
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;

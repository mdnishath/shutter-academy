import React from "react";
import useAuth from "../hooks/useAuth";
import GlobalLoader from "../components/loaders/GlobalLoader";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <GlobalLoader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default PrivateRoute;

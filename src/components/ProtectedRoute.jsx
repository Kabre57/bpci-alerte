import React from "react";
import { useLocation, Navigate } from "react-router";
import { auth } from "../plugins/firebase";

const ProtectedRoute = (props) => {
  const location = useLocation();
  console.log("location", location.pathname);
  return auth.isAuthenticated ? (
    <>{props.children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

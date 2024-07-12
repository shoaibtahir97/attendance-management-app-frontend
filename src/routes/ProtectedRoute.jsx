import React from "react";
import { Navigate, Outlet, Redirect, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ isPublic, isAuthorized }) => {
  return isPublic || isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

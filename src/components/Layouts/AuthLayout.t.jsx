import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = (props) => {
  const { children } = props;
  return (
    <div className="main-wrapper login-body">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

import React from 'react';
import { Navigate, Outlet, Redirect, Route } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = localStorage.getItem('user');
  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;

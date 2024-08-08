import React from 'react';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const DashboardLayout = (props) => {
  const { children } = props;
  return (
    <div className="main-wrapper">
      <SideBar />
      <div>
        <Header />
        <div className="page-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

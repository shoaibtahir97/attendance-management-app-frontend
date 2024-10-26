import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import Header from '../../Header/Header';
import SideBar from '../../SideBar/SideBar';
import { Link } from 'react-router-dom';
import {
  avatar01,
  avatar02,
  avatar03,
  avatar04,
  avatar05,
  awardicon01,
  awardicon02,
  awardicon03,
  awardicon04,
  dashicon01,
  dashicon02,
  dashicon03,
  dashicon04,
  socialicon01,
  socialicon02,
  socialicon03,
  socialicon04,
} from '../../imagepath';
import Footer from '../../Footer/Footer';
import { useSelector } from 'react-redux';
import PageHeader from '../../PageHeader';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { useGetNoticesQuery } from '../../../redux/slices/apiSlices/noticesApiSlice';
import NoticeCard from '../../noticeCard';
import { PATH_DASHBOARD } from '../../../routes/paths';

const noticeColors = [
  '#ebe9fc',
  '#fad5b8',
  '#d7ffb3',
  '#b9ebf8',
  '#b9f1f8',
  '#c3bcf5',
];

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: notices } = useGetNoticesQuery();
  const groups = [
    {
      group: 'A',
      timing: '09:30',
      subject: 'Mathematics',
    },
    {
      group: 'B',
      timing: '09:30',
      subject: 'English',
    },
    {
      group: 'A',
      timing: '13:30',
      subject: 'Biology',
    },
    {
      group: 'BB',
      timing: '09:30',
      subject: 'English',
    },
    {
      group: 'BB',
      timing: '17:30',
      subject: 'Biology',
    },
  ];

  const teachers = [
    {
      name: 'John Doe',
      status: 'present',
      group: 'A',
      subject: 'Mathematics',
      timing: '09:30',
    },
    {
      name: 'Dr Ansari',
      status: 'absent',
      group: 'B',
      subject: 'English',
      timing: '09:30',
    },
    {
      name: 'Suman',
      status: 'present',
      group: 'A',
      subject: 'Biology',
      timing: '09:30',
    },
  ];

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="Home"
        pageTitle={`Welcome ${userInfo?.firstName}!`}
        parentSection="Admin"
      />
      {/* /Page Header */}
      {/* Overview Section */}
      {/* <div className="row">
        <div className="col-xl-3 col-sm-6 col-12 d-flex">
          <div className="card bg-comman w-100">
            <div className="card-body">
              <div className="db-widgets d-flex justify-content-between align-items-center">
                <div className="db-info">
                  <h6>Students</h6>
                  <h3>50055</h3>
                </div>
                <div className="db-icon">
                  <img src={dashicon01} alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12 d-flex">
          <div className="card bg-comman w-100">
            <div className="card-body">
              <div className="db-widgets d-flex justify-content-between align-items-center">
                <div className="db-info">
                  <h6>Awards</h6>
                  <h3>50+</h3>
                </div>
                <div className="db-icon">
                  <img src={dashicon02} alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12 d-flex">
          <div className="card bg-comman w-100">
            <div className="card-body">
              <div className="db-widgets d-flex justify-content-between align-items-center">
                <div className="db-info">
                  <h6>Department</h6>
                  <h3>30+</h3>
                </div>
                <div className="db-icon">
                  <img src={dashicon03} alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12 d-flex">
          <div className="card bg-comman w-100">
            <div className="card-body">
              <div className="db-widgets d-flex justify-content-between align-items-center">
                <div className="db-info">
                  <h6>Revenue</h6>
                  <h3>$505</h3>
                </div>
                <div className="db-icon">
                  <img src={dashicon04} alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* /Overview Section */}
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <div className="card card-chart">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-6">
                  <h5 className="card-title">Today's Classes</h5>
                </div>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Groups</TableCell>
                        <TableCell>Subjects</TableCell>
                        <TableCell>Timings</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        {groups.map((group) => (
                          <TableRow>
                            <TableCell>{group.group}</TableCell>
                            <TableCell>{group.subject}</TableCell>
                            <TableCell>{group.timing}</TableCell>
                          </TableRow>
                        ))}
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4">
          <div className="card card-chart">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-12">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography fontSize={'1.75em'} fontWeight={700}>
                      Notice
                    </Typography>
                    <Link to={PATH_DASHBOARD.notices}>View All</Link>
                  </Stack>
                </div>
                <div className="col-12">
                  {notices?.data?.map((notice, index) => {
                    if (notice.isActive) {
                      return (
                        <NoticeCard
                          key={notice._id}
                          title={notice.title}
                          description={notice.description}
                          startDate={notice.startDate}
                          endDate={notice.endDate}
                          color={noticeColors[index]}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-8">
          {/* Student Chart */}
          <div className="card card-chart">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-12">
                  <h5 className="card-title">Teachers</h5>
                </div>
                <div className="col-12">
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Teacher Name</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell>Group</TableCell>
                          <TableCell>Timing</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teachers.map((teacher) => (
                          <TableRow>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>
                              {' '}
                              <Button
                                type="primary"
                                style={{
                                  backgroundColor:
                                    teacher.status === 'present'
                                      ? '#DCF8E9'
                                      : teacher.status === 'absent'
                                        ? '#FEE9EB'
                                        : '',
                                  color:
                                    teacher.status === 'present'
                                      ? '#43ab80'
                                      : teacher.status === 'absent'
                                        ? '#c95f6d'
                                        : '#93989e',
                                  margin: 1,
                                }}
                                icon={
                                  teacher.status === 'present' ? (
                                    <IoMdCheckmark />
                                  ) : teacher.status === 'absent' ? (
                                    <RxCross2 />
                                  ) : (
                                    <></>
                                  )
                                }>
                                {teacher.status}
                              </Button>
                            </TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>{teacher.group}</TableCell>
                            <TableCell>{teacher.timing}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
            {/* <div className="card-body">
              <div id="apexcharts-area"></div>
              <Chart options={dataBar} series={studentchart} type="line" />
            </div> */}
          </div>

          {/* /Student Chart */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// import React from 'react'

// const AdminDashboard = () => {
//   return (
//     <div></div>
//   )
// }

// export default AdminDashboard

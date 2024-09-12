import React from 'react';
import { PATH_DASHBOARD } from '../../routes/paths';
import { PiStudent } from 'react-icons/pi';
import { PiBooksLight } from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';
import { MdListAlt } from 'react-icons/md';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { PiBuildingOfficeLight } from 'react-icons/pi';
import { TbPresentationAnalytics } from 'react-icons/tb';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { PiChalkboardTeacherLight } from 'react-icons/pi';
const navConfig = [
  // Dashboard
  {
    title: 'Admin Dashboard',
    path: PATH_DASHBOARD.adminDashboard,
    icon: <RxDashboard />,
    role: ['admin'],
  },
  {
    title: 'Teacher Dashboard',
    path: PATH_DASHBOARD.teacherDashboard,
    icon: <LiaChalkboardTeacherSolid />,
    role: ['teacher'],
  },
  // Attendance
  {
    title: 'Attendance',
    path: PATH_DASHBOARD.markattendance,
    icon: <MdListAlt />,
    role: ['teacher', 'admin'],
    // children: [
    //   {
    //     title: 'Mark Attendance',
    //     path: PATH_DASHBOARD.markattendance,
    //     role: ['teacher', 'admin'],
    //   },
    //   {
    //     title: 'View Attendance',
    //     path: PATH_DASHBOARD.viewattendance,
    //     role: ['teacher', 'admin'],
    //   },
    // ],
  },
  // Students
  {
    title: 'Students',
    path: PATH_DASHBOARD.students,
    icon: <PiStudent />,
    role: ['teacher', 'admin'],
    // children: [
    //   {
    //     title: 'Student List',
    //     path: PATH_DASHBOARD.students,
    //     role: ['teacher', 'admin'],
    //   },
    //   {
    //     title: 'Student View',
    //     path: PATH_DASHBOARD.studentProfile,
    //     role: ['teacher', 'admin'],
    //   },
    //   {
    //     title: 'Student Add',
    //     path: PATH_DASHBOARD.studentAdd,
    //     role: ['admin'],
    //   },
    //   {
    //     title: 'Student Edit',
    //     path: PATH_DASHBOARD.studentEdit,
    //     role: ['admin'],
    //   },
    // ],
  },
  // Teachers
  {
    title: 'Teachers',
    path: PATH_DASHBOARD.teachers,
    icon: <PiChalkboardTeacherLight />,
    role: ['admin'],
    // children: [
    // {
    //   title: 'Teacher List',
    //   path: PATH_DASHBOARD.teachers,
    //   role: ['admin'],
    // },
    // {
    //   title: 'Teacher View',
    //   path: PATH_DASHBOARD.teacherProfile,
    //   role: ['admin'],
    // },
    // {
    //   title: 'Teacher Add',
    //   path: PATH_DASHBOARD.teacherAdd,
    //   role: ['admin'],
    // },
    // {
    //   title: 'Teacher Edit',
    //   path: PATH_DASHBOARD.teacherEdit,
    //   role: ['admin'],
    // },
    // ],
  },
  // Departments
  {
    title: 'Courses',
    path: PATH_DASHBOARD.courses,
    icon: <PiBuildingOfficeLight />,
    role: ['teacher', 'admin'],
    // children: [
    //   {
    //     title: 'Department List',
    //     path: PATH_DASHBOARD.departments,
    //     role: ['teacher', 'admin'],
    //   },
    //   {
    //     title: 'Department Add',
    //     path: PATH_DASHBOARD.departmentAdd,
    //     role: ['admin'],
    //   },
    //   {
    //     title: 'Department Edit',
    //     path: PATH_DASHBOARD.departmentEdit,
    //     role: ['admin'],
    //   },
    // ],
  },
  // Subjects
  {
    title: 'Subjects',
    path: PATH_DASHBOARD.subjects,
    icon: <PiBooksLight />,
    role: ['teacher', 'admin'],
    // children: [
    //   {
    //     title: 'Subject List',
    //     path: PATH_DASHBOARD.subjects,
    //     role: ['teacher', 'admin'],
    //   },
    //   {
    //     title: 'Subject Add',
    //     path: PATH_DASHBOARD.subjectAdd,
    //     role: ['admin'],
    //   },
    //   {
    //     title: 'Department Edit',
    //     path: PATH_DASHBOARD.subjectEdit,
    //     role: ['admin'],
    //   },
    // ],
  },
  // Reports
  {
    title: 'Reports',
    path: '#',
    icon: <TbPresentationAnalytics />,
    role: ['admin'],
    children: [
      {
        title: 'Attendance Reports',
        path: PATH_DASHBOARD.attendanceReports,
        role: ['admin'],
      },
      // {
      //   title: 'Teacher Reports',
      //   path: '/dashboard/reports/teachers',
      //   role: ['admin'],
      // },
      // {
      //   title: 'Group Reports',
      //   path: '/dashboard/reports/groups',
      //   role: ['admin'],
      // },
    ],
  },
  // Calendar
  {
    title: 'Calendar',
    icon: <IoCalendarNumberOutline />,
    path: PATH_DASHBOARD.calendar,
    role: ['admin', 'teacher'],
  },
  {
    title: 'Contact',
    icon: <IoCalendarNumberOutline />,
    path: PATH_DASHBOARD.contact,
    role: ['admin'],
  },
];

export default navConfig;

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
import { IoMailOpenOutline } from 'react-icons/io5';
import { MdOutlineGroups } from 'react-icons/md';
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
    role: ['admin'],
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
    role: ['admin'],
  },
  // Users
  {
    title: 'Users',
    path: PATH_DASHBOARD.users,
    icon: <PiChalkboardTeacherLight />,
    role: ['admin'],
  },
  // Courses
  {
    title: 'Courses',
    path: PATH_DASHBOARD.courses,
    icon: <PiBuildingOfficeLight />,
    role: ['admin'],
  },
  {
    title: 'Groups',
    path: PATH_DASHBOARD.groups,
    icon: <MdOutlineGroups />,
    role: ['admin'],
  },
  // Subjects
  {
    title: 'Subjects',
    path: PATH_DASHBOARD.subjects,
    icon: <PiBooksLight />,
    role: ['admin'],
  },

  // Calendar
  {
    title: 'Calendar',
    icon: <IoCalendarNumberOutline />,
    path: PATH_DASHBOARD.calendar,
    role: ['admin', 'teacher'],
  },
  {
    title: 'Mails',
    icon: <IoMailOpenOutline />,
    path: PATH_DASHBOARD.mail,
    role: ['admin'],
  },
  // Reports
  {
    title: 'Reports',
    path: '#',
    icon: <TbPresentationAnalytics />,
    role: ['teacher', 'admin'],
    children: [
      {
        title: 'Attendance Reports',
        path: PATH_DASHBOARD.attendanceReports,
        role: ['teacher', 'admin'],
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
];

export default navConfig;

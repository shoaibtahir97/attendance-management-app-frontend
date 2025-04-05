import React from 'react';
import { CgTemplate } from 'react-icons/cg';
import { GrAnnounce } from 'react-icons/gr';
import { IoCalendarNumberOutline, IoMailOpenOutline } from 'react-icons/io5';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { MdListAlt, MdOutlineGroups } from 'react-icons/md';
import {
  PiBooksLight,
  PiBuildingOfficeLight,
  PiChalkboardTeacherLight,
  PiStudent,
} from 'react-icons/pi';

import { RxDashboard } from 'react-icons/rx';
import { TbPresentationAnalytics } from 'react-icons/tb';
import { PATH_DASHBOARD } from '../../routes/paths';
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
    // {
    //   title: 'View Attendance',
    //   path: PATH_DASHBOARD.viewattendance,
    //   role: ['teacher', 'admin'],
    // },
    // ],
  },
  // Students
  {
    title: 'Students',
    path: PATH_DASHBOARD.students,
    icon: <PiStudent />,
    role: ['admin'],
  },
  // Teachers
  {
    title: 'Teachers',
    path: PATH_DASHBOARD.teachers,
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

  // Timetable
  {
    title: 'Timetable',
    icon: <IoCalendarNumberOutline />,
    path: PATH_DASHBOARD.calendar,
    role: ['admin'],
  },
  {
    title: 'Templates',
    icon: <CgTemplate />,
    path: PATH_DASHBOARD.templates,
    role: ['admin'],
  },
  {
    title: 'Notices',
    icon: <GrAnnounce />,
    path: PATH_DASHBOARD.notices,
    role: ['admin'],
  },
  {
    title: 'Mails',
    icon: <IoMailOpenOutline />,
    path: PATH_DASHBOARD.mailv2,
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
      {
        title: 'Warning Letter Reports',
        path: PATH_DASHBOARD.warningLetterReport,
        role: ['teacher', 'admin'],
      },
      // {
      //   title: 'Group Reports',
      //   path: PATH_DASHBOARD.groupReport,
      //   role: ['admin'],
      // },
    ],
  },
];

export default navConfig;

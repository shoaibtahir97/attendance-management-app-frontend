import React from 'react';
import { PATH_DASHBOARD } from '../../routes/paths';
const navConfig = [
  // Dashboard
  {
    title: 'Admin Dashboard',
    path: PATH_DASHBOARD.adminDashboard,
    icon: 'grid',
    role: ['admin'],
  },
  {
    title: 'Teacher Dashboard',
    path: PATH_DASHBOARD.teacherDashboard,
    icon: 'table',
    role: ['teacher'],
  },
  // Attendance
  {
    title: 'Attendance',
    path: PATH_DASHBOARD.attendance,
    icon: 'table',
    role: ['teacher', 'admin'],
  },
  // Students
  {
    title: 'Students',
    path: '#',
    icon: 'table',
    role: ['teacher', 'admin'],
    children: [
      {
        title: 'Student List',
        path: PATH_DASHBOARD.students,
        role: ['teacher', 'admin'],
      },
      {
        title: 'Student View',
        path: PATH_DASHBOARD.studentProfile,
        role: ['teacher', 'admin'],
      },
      {
        title: 'Student Add',
        path: PATH_DASHBOARD.studentAdd,
        role: ['admin'],
      },
      {
        title: 'Student Edit',
        path: PATH_DASHBOARD.studentEdit,
        role: ['admin'],
      },
    ],
  },
  // Teachers
  {
    title: 'Teachers',
    path: '#',
    icon: 'table',
    role: ['admin'],
    children: [
      {
        title: 'Teacher List',
        path: PATH_DASHBOARD.teachers,
        role: ['admin'],
      },
      {
        title: 'Teacher View',
        path: PATH_DASHBOARD.teacherProfile,
        role: ['admin'],
      },
      {
        title: 'Teacher Add',
        path: PATH_DASHBOARD.teacherAdd,
        role: ['admin'],
      },
      {
        title: 'Teacher Edit',
        path: PATH_DASHBOARD.teacherEdit,
        role: ['admin'],
      },
    ],
  },
  // Departments
  {
    title: 'Departments',
    path: '#',
    icon: 'table',
    role: ['teacher', 'admin'],
    children: [
      {
        title: 'Department List',
        path: PATH_DASHBOARD.departments,
        role: ['teacher', 'admin'],
      },
      {
        title: 'Department Add',
        path: PATH_DASHBOARD.departmentAdd,
        role: ['admin'],
      },
      {
        title: 'Department Edit',
        path: PATH_DASHBOARD.departmentEdit,
        role: ['admin'],
      },
    ],
  },
  // Subjects
  {
    title: 'Subjects',
    path: '#',
    icon: 'table',
    role: ['teacher', 'admin'],
    children: [
      {
        title: 'Subject List',
        path: PATH_DASHBOARD.subjects,
        role: ['teacher', 'admin'],
      },
      {
        title: 'Subject Add',
        path: PATH_DASHBOARD.subjectAdd,
        role: ['admin'],
      },
      {
        title: 'Department Edit',
        path: PATH_DASHBOARD.subjectEdit,
        role: ['admin'],
      },
    ],
  },
  // Reports
  {
    title: 'Reports',
    path: '#',
    icon: 'table',
    role: ['admin'],
    children: [
      {
        title: 'Student Reports',
        path: PATH_DASHBOARD.reportsAttendance,
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
];

export default navConfig;

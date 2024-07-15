import React from "react";
const navConfig = [
  // Dashboard
  {
    title: "Admin Dashboard",
    path: "/dashboard/admindashboard",
    icon: "grid",
    role: ["admin"],
  },
  {
    title: "Teacher Dashboard",
    path: "/dashboard/teacherdashboard",
    icon: "table",
    role: ["teacher"],
  },
  // Attendance
  {
    title: "Attendance",
    path: "/dashboard/attendance",
    icon: "table",
    role: ["teacher", "admin"],
  },
  // Students
  {
    title: "Students",
    path: "#",
    icon: "table",
    role: ["teacher", "admin"],
    children: [
      {
        title: "Student List",
        path: `/dashboard/students`,
        role: ["teacher", "admin"],
      },
      {
        title: "Student View",
        path: `/dashboard/studentsview`,
        role: ["teacher", "admin"],
      },
      {
        title: "Student Add",
        path: `/dashboard/addstudent`,
        role: ["admin"],
      },
      {
        title: "Student Edit",
        path: `/dashboard/editstudent`,
        role: ["admin"],
      },
    ],
  },
  // Teachers
  {
    title: "Teachers",
    path: "#",
    icon: "table",
    role: ["admin"],
    children: [
      {
        title: "Teacher List",
        path: `/dashboard/teacherslist`,
        role: ["admin"],
      },
      {
        title: "Teacher View",
        path: `/dashboard/teachersprofile`,
        role: ["admin"],
      },
      {
        title: "Teacher Add",
        path: `/dashboard/addteacher`,
        role: ["admin"],
      },
      {
        title: "Teacher Edit",
        path: `/dashboard/editteacher`,
        role: ["admin"],
      },
    ],
  },
  // Departments
  {
    title: "Departments",
    path: "#",
    icon: "table",
    role: ["teacher", "admin"],
    children: [
      {
        title: "Department List",
        path: `/dashboard/department`,
        role: ["teacher", "admin"],
      },
      {
        title: "Department Add",
        path: `/dashboard/adddepartment`,
        role: ["admin"],
      },
      {
        title: "Department Edit",
        path: `/dashboard/editdepartment`,
        role: ["admin"],
      },
    ],
  },
  // Subjects
  {
    title: "Subjects",
    path: "#",
    icon: "table",
    role: ["teacher", "admin"],
    children: [
      {
        title: "Subject List",
        path: `/dashboard/subject`,
        role: ["teacher", "admin"],
      },
      {
        title: "Subject Add",
        path: `/dashboard/addsubject`,
        role: ["admin"],
      },
      {
        title: "Department Edit",
        path: `/dashboard/editsubject`,
        role: ["admin"],
      },
    ],
  },
  // Reports
  {
    title: "Reports",
    path: "#",
    icon: "table",
    role: ["admin"],
    children: [
      {
        title: "Student Reports",
        path: "/dashboard/reports/students",
        role: ["admin"],
      },
      {
        title: "Teacher Reports",
        path: "/dashboard/reports/teachers",
        role: ["admin"],
      },
      {
        title: "Group Reports",
        path: "/dashboard/reports/groups",
        role: ["admin"],
      },
    ],
  },
];

export default navConfig;

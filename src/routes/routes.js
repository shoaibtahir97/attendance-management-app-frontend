import React from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AuthLayout from '../components/Layouts/AuthLayout.t';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import Error404 from '../components/pages/Authentication/Error-404';
import Register from '../components/pages/Authentication/Register';
import Reports from '../components/pages/Reports/Reports';
import TeachersProfile from '../components/pages/Teachers/TeachersProfile';
import AdmissionForm from '../screens/AdmissionForm';
import MarkAttendanceScreen from '../screens/Attendance/MarkAttendanceScreen';
import ViewAttendanceScreen from '../screens/Attendance/ViewAttendanceScreen';
import ForgotPassword from '../screens/Authentication/ForgotPassword';
import LoginScreen from '../screens/Authentication/LoginScreen';
import ResetPassword from '../screens/Authentication/ResetPassword';
import Calendar from '../screens/Calendar';
import AddCourse from '../screens/Courses/AddCourse';
import CoursesList from '../screens/Courses/CoursesList';
import EditCourse from '../screens/Courses/EditCourse';
import AdminDashboard from '../screens/Dashboard/AdminDashboard';
import TeacherDashboard from '../screens/Dashboard/TeacherDashboard';
import AddGroup from '../screens/Groups/AddGroup';
import EditGroup from '../screens/Groups/EditGroups';
import GroupsList from '../screens/Groups/GroupsList';
import MailScreen from '../screens/Mail/MailScreen';
import Notices from '../screens/Notices';
import AttendanceReportsV2 from '../screens/Reports/AttendanceReports';
import AddStudent from '../screens/Students/AddStudent';
import EditStudent from '../screens/Students/EditStudent';
import Students from '../screens/Students/StudentsList';
import AddSubject from '../screens/Subjects/AddSubject';
import EditSubject from '../screens/Subjects/EditSubject';
import SubjectsList from '../screens/Subjects/SubjectList';
import AddTeacher from '../screens/Teachers/AddTeacher';
import EditTeacher from '../screens/Teachers/EditTeacher';
import TeachersList from '../screens/Teachers/TeachersList';
import ProtectedRoute from './ProtectedRoute';
import { PATH_AUTH, PATH_DASHBOARD } from './paths';

const router = createHashRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AuthLayout />}>
        <Route index={true} path={PATH_AUTH.login} element={<LoginScreen />} />
        <Route path={PATH_AUTH.register} element={<Register />} />
        <Route
          index={true}
          path={PATH_AUTH.forgotPassword}
          element={<ForgotPassword />}
        />
        <Route
          index={true}
          path={PATH_AUTH.resetPassword}
          element={<ResetPassword />}
        />

        {/* Admission Form */}
        <Route path={PATH_AUTH.admissionForm} element={<AdmissionForm />} />
      </Route>
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route
            path={PATH_DASHBOARD.adminDashboard}
            element={<AdminDashboard />}
          />
          <Route
            path={PATH_DASHBOARD.teacherDashboard}
            element={<TeacherDashboard />}
          />
          {/* <Route
            path={PATH_DASHBOARD.studentDashboard}
            element={<StudentsDashboard />}
          /> */}
          {/* Students */}

          <Route path={PATH_DASHBOARD.students} element={<Students />} />

          <Route path={PATH_DASHBOARD.studentAdd} element={<AddStudent />} />
          <Route
            path={`${PATH_DASHBOARD.studentEdit}/:id`}
            element={<EditStudent />}
          />

          {/* Teachers */}

          <Route path={PATH_DASHBOARD.teachers} element={<TeachersList />} />
          <Route
            path={PATH_DASHBOARD.teacherProfile}
            element={<TeachersProfile />}
          />
          <Route path={PATH_DASHBOARD.teacherAdd} element={<AddTeacher />} />
          <Route
            path={`${PATH_DASHBOARD.teacherEdit}/:id`}
            element={<EditTeacher />}
          />

          {/* Courses */}
          <Route path={PATH_DASHBOARD.courses} element={<CoursesList />} />
          <Route path={PATH_DASHBOARD.courseAdd} element={<AddCourse />} />
          <Route
            path={`${PATH_DASHBOARD.courseEdit}/:id`}
            element={<EditCourse />}
          />
          {/* Groups */}
          <Route path={PATH_DASHBOARD.groups} element={<GroupsList />} />
          <Route path={PATH_DASHBOARD.groupAdd} element={<AddGroup />} />
          <Route
            path={`${PATH_DASHBOARD.groupEdit}/:id`}
            element={<EditGroup />}
          />

          {/* Subjects */}
          <Route path={PATH_DASHBOARD.subjects} element={<SubjectsList />} />
          <Route path={PATH_DASHBOARD.subjectAdd} element={<AddSubject />} />
          <Route
            path={`${PATH_DASHBOARD.subjectEdit}/:id`}
            element={<EditSubject />}
          />

          {/* Attendance */}
          <Route
            path={PATH_DASHBOARD.markattendance}
            element={<MarkAttendanceScreen />}
          />
          <Route
            path={PATH_DASHBOARD.viewattendance}
            element={<ViewAttendanceScreen />}
          />

          {/* Reports */}
          <Route path={PATH_DASHBOARD.reports} element={<Reports />} />

          {/* Notices */}
          <Route path={PATH_DASHBOARD.notices} element={<Notices />} />

          {/* Reports */}
          <Route
            path={PATH_DASHBOARD.attendanceReports}
            element={<AttendanceReportsV2 />}
          />

          {/* <Route
            path='/dashboard/reports/teachers'
            element={<TeacherReports />}
          />
          <Route path='/dashboard/reports/groups' element={<GroupReports />} /> */}

          {/* Calendar */}
          <Route path={PATH_DASHBOARD.calendar} element={<Calendar />} />

          {/* Mail */}
          <Route path={PATH_DASHBOARD.mail} element={<MailScreen />} />

          {/* 404 Page not found */}
          <Route element={<Error404 />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;

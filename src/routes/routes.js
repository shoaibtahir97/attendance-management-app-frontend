import React from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AuthLayout from '../components/Layouts/AuthLayout.t';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import Register from '../components/pages/Authentication/Register';
import AdminDashboard from '../components/pages/Dashboard/AdminDashboard';
import TeacherDashboard from '../components/pages/Dashboard/TeacherDashboard';
import StudentsDashboard from '../components/pages/Dashboard/StudentsDashboard';
import Students from '../screens/Students/StudentsList';
import AddStudent from '../screens/Students/AddStudent';
import EditStudent from '../screens/Students/EditStudent';
import TeachersProfile from '../components/pages/Teachers/TeachersProfile';
import ForgotPassword from '../components/pages/Authentication/ForgotPassword';
import ProtectedRoute from './ProtectedRoute';
import { PATH_AUTH, PATH_DASHBOARD } from './paths';
import Reports from '../components/pages/Reports/Reports';
import AttendanceReports from '../components/pages/Reports/AttendanceReports';

import LoginScreen from '../screens/LoginScreen';
import AddTeacher from '../screens/Teachers/AddTeacher';
import EditTeacher from '../screens/Teachers/EditTeacher';
import MarkAttendanceScreen from '../screens/Attendance/MarkAttendanceScreen';
import AddCourse from '../screens/Courses/AddCourse';
import EditCourse from '../screens/Courses/EditCourse';
import CoursesList from '../screens/Courses/CoursesList';
import AddSubject from '../screens/Subjects/AddSubject';
import EditSubject from '../screens/Subjects/EditSubject';
import SubjectsList from '../screens/Subjects/SubjectList';
import TeachersList from '../screens/Teachers/TeachersList';
import ViewAttendanceScreen from '../screens/Attendance/ViewAttendanceScreen';
import ContactScreen from '../screens/Mail/MailScreen';
import MailScreen from '../screens/Mail/MailScreen';
import GroupsList from '../screens/Groups/GroupsList';
import AddGroup from '../screens/Groups/AddGroup';
import EditGroup from '../screens/Groups/EditGroups';
import Calendar from '../screens/Calendar';
import AttendanceReportsV2 from '../screens/Reports/AttendanceReports';
import AdmissionForm from '../screens/AdmissionForm';
import UsersList from '../screens/Users/UsersList';
import AddUser from '../screens/Users/AddUser';
import EditUser from '../screens/Users/EditUser';

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
          <Route
            path={PATH_DASHBOARD.studentDashboard}
            element={<StudentsDashboard />}
          />
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

          {/* Users */}

          <Route path={PATH_DASHBOARD.users} element={<UsersList />} />
          {/* <Route path={PATH_DASHBOARD.userProfile} element={<UserProfile />} /> */}
          <Route path={PATH_DASHBOARD.userAdd} element={<AddUser />} />
          <Route
            path={`${PATH_DASHBOARD.userEdit}/:id`}
            element={<EditUser />}
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

          {/* Invoices */}
          {/* <Route path='/dashboard/invoicegrid' element={<InvoiceGrid />} />
        <Route path='/dashboard/invoicepaid' element={<InvoicePaid />} />
        <Route path='/dashboard/invoiceoverdue' element={<InvoiceOverdue />} />
        <Route path='/dashboard/invoicedraft' element={<InvoiceDraft />} />
        <Route
          path='/dashboard/invoicerecurring'
          element={<InvoiceRecurring />}
        />
        <Route
          path='/dashboard/invoicecancelled'
          element={<InvoiceCancelled />}
        />
        <Route path='/dashboard/addinvoice' element={<AddInvoice />} />
        <Route path='/dashboard/editinvoice' element={<EditInvoice />} />
        <Route path='/dashboard/viewinvoice' element={<ViewInvoice />} />
        <Route path='/dashboard/invoicesetting' element={<InvoiceSettings />} />
        <Route path='/dashboard/invoicelist' element={<InvoiceList />} /> */}

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
        </Route>
      </Route>
    </Route>
  )
);

export default router;

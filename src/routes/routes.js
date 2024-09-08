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
import Students from '../components/pages/Students/StudentsList';
import StudentsView from '../components/pages/Students/StudentsView';
import AddStudent from '../components/pages/Students/AddStudent';
import EditStudent from '../components/pages/Students/EditStudent';
import TeachersList from '../components/pages/Teachers/TeachersList';
import TeachersProfile from '../components/pages/Teachers/TeachersProfile';
import TeachersAdd from '../components/pages/Teachers/TeachersAdd';
import TeachersEdit from '../components/pages/Teachers/TeachersEdit';
import DepartmentList from '../components/pages/Department/DepartmentList';
import AddDepartment from '../screens/Courses/AddCourse';
import EditDepartment from '../components/pages/Department/EditDepartment';
import SubjectList from '../components/pages/Subject/SubjectList';
import AddSubject from '../components/pages/Subject/AddSubject';
import EditSubject from '../components/pages/Subject/EditSubject';
import ForgotPassword from '../components/pages/Authentication/ForgotPassword';
import ProtectedRoute from './ProtectedRoute';
import { PATH_AUTH, PATH_DASHBOARD } from './paths';
import Reports from '../components/pages/Reports/Reports';
import StudentReports from '../components/pages/Reports/StudentReports';
import AttendanceReports from '../components/pages/Reports/AttendanceReports';
import Calendar from '../components/pages/Calendar';
import LoginScreen from '../screens/LoginScreen';
import TeachersScreen from '../screens/Teachers/TeachersScreen';
import AddTeacher from '../screens/Teachers/AddTeacher';
import MarkAttendanceScreen from '../screens/Attendance/MarkAttendanceScreen';
import CourseScreen from '../screens/Course/CourseScreen';
import AddCourse from '../screens/Course/AddCourse';
import EditCourse from '../screens/Course/EditCourse';
import CoursesList from '../screens/Courses/CoursesList';

const router = createBrowserRouter(
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
          <Route
            path={PATH_DASHBOARD.studentProfile}
            element={<StudentsView />}
          />
          <Route path={PATH_DASHBOARD.studentAdd} element={<AddStudent />} />
          <Route
            path={`${PATH_DASHBOARD.studentEdit}/:id`}
            element={<EditStudent />}
          />

          {/* Teachers */}

          <Route path={PATH_DASHBOARD.teachers} element={<TeachersScreen />} />
          <Route
            path={PATH_DASHBOARD.teacherProfile}
            element={<TeachersProfile />}
          />
          <Route path={PATH_DASHBOARD.teacherAdd} element={<AddTeacher />} />
          <Route path={PATH_DASHBOARD.teacherEdit} element={<TeachersEdit />} />

          {/* Courses */}
          <Route path={PATH_DASHBOARD.courses} element={<CoursesList />} />
          <Route path={PATH_DASHBOARD.courseAdd} element={<AddDepartment />} />
          <Route
            path={PATH_DASHBOARD.courseEdit}
            element={<EditDepartment />}
          />

          {/* Subjects */}
          <Route path={PATH_DASHBOARD.subjects} element={<SubjectList />} />
          <Route path={PATH_DASHBOARD.subjectAdd} element={<AddSubject />} />
          <Route path={PATH_DASHBOARD.subjectEdit} element={<EditSubject />} />

          {/* Attendance */}
          <Route
            path={PATH_DASHBOARD.attendance}
            element={<MarkAttendanceScreen />}
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
            element={<AttendanceReports />}
          />

          {/* <Route
            path='/dashboard/reports/teachers'
            element={<TeacherReports />}
          />
          <Route path='/dashboard/reports/groups' element={<GroupReports />} /> */}

          {/* Calendar */}
          <Route path={PATH_DASHBOARD.calendar} element={<Calendar />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;

import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import AuthLayout from "../components/Layouts/AuthLayout.t";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import AttendancePage from "../components/pages/Attendance";
import Login from "../components/pages/Authentication";
import Register from "../components/pages/Authentication/Register";
import AdminDashboard from "../components/pages/Dashboard/AdminDashboard";
import TeacherDashboard from "../components/pages/Dashboard/TeacherDashboard";
import StudentsDashboard from "../components/pages/Dashboard/StudentsDashboard";
import Students from "../components/pages/Students/StudentsList";
import StudentsView from "../components/pages/Students/StudentsView";
import AddStudent from "../components/pages/Students/AddStudent";
import EditStudent from "../components/pages/Students/EditStudent";
import TeachersList from "../components/pages/Teachers/TeachersList";
import TeachersProfile from "../components/pages/Teachers/TeachersProfile";
import TeachersAdd from "../components/pages/Teachers/TeachersAdd";
import TeachersEdit from "../components/pages/Teachers/TeachersEdit";
import DepartmentList from "../components/pages/Department/DepartmentList";
import AddDepartment from "../components/pages/Department/AddDepartment";
import EditDepartment from "../components/pages/Department/EditDepartment";
import SubjectList from "../components/pages/Subject/SubjectList";
import AddSubject from "../components/pages/Subject/AddSubject";
import EditSubject from "../components/pages/Subject/EditSubject";
import InvoiceGrid from "../components/pages/Invoice/InvoiceGrid";
import InvoicePaid from "../components/pages/Invoice/InvoicePaid";
import InvoiceOverdue from "../components/pages/Invoice/InvoiceOverdue";
import InvoiceDraft from "../components/pages/Invoice/InvoiceDraft";
import InvoiceRecurring from "../components/pages/Invoice/InvoiceRecurring";
import InvoiceCancelled from "../components/pages/Invoice/InvoiceCancelled";
import InvoiceList from "../components/pages/Invoice/InvoiceList";
import InvoiceSettings from "../components/pages/Invoice/InvoiceSettings";
import ViewInvoice from "../components/pages/Invoice/ViewInvoice";
import EditInvoice from "../components/pages/Invoice/EditInvoice";
import AddInvoice from "../components/pages/Invoice/AddInvoice";
import ForgotPassword from "../components/pages/Authentication/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import Reports from "../components/pages/Reports/StudentReports";
import StudentReports from "../components/pages/Reports/StudentReports";
import GroupReports from "../components/pages/Reports/GroupReports";
import TeacherReports from "../components/pages/Reports/TeacherReports";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route
          index={true}
          path="/forgotpassword"
          element={<ForgotPassword />}
        />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route
            path="/dashboard/admindashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="/dashboard/teacherdashboard"
            element={<TeacherDashboard />}
          />
          <Route
            path="dashboard/studentdashboard"
            element={<StudentsDashboard />}
          />
          {/* Students */}

          <Route path="/dashboard/students" element={<Students />} />
          <Route path="/dashboard/studentsview" element={<StudentsView />} />
          <Route path="/dashboard/addstudent" element={<AddStudent />} />
          <Route path="/dashboard/editstudent" element={<EditStudent />} />

          {/* Teachers */}

          <Route path="/dashboard/teacherslist" element={<TeachersList />} />
          <Route
            path="/dashboard/teachersprofile"
            element={<TeachersProfile />}
          />
          <Route path="/dashboard/addteacher" element={<TeachersAdd />} />
          <Route path="/dashboard/editteacher" element={<TeachersEdit />} />

          {/* Departments */}
          <Route path="/dashboard/department" element={<DepartmentList />} />
          <Route path="/dashboard/adddepartment" element={<AddDepartment />} />
          <Route
            path="/dashboard/editdepartment"
            element={<EditDepartment />}
          />

          {/* Subjects */}
          <Route path="/dashboard/subject" element={<SubjectList />} />
          <Route path="/dashboard/addsubject" element={<AddSubject />} />
          <Route path="/dashboard/editsubject" element={<EditSubject />} />

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

          {/* Attendance */}
          <Route path="/dashboard/attendance" element={<AttendancePage />} />

          {/* Reports */}
          <Route
            path="/dashboard/reports/students"
            element={<StudentReports />}
          />
          <Route
            path="/dashboard/reports/teachers"
            element={<TeacherReports />}
          />
          <Route path="/dashboard/reports/groups" element={<GroupReports />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;

import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Redirect } from "react-router-dom";

import Login from "../components/pages/Authentication/index.jsx";
import config from "config";
import BlogView from "../components/pages/Blog/BlogView.jsx";
import PendingBlog from "../components/pages/Blog/PendingBlog.jsx";
import AddBlog from "../components/pages/Blog/AddBlog.jsx";
import EditBlog from "../components/pages/Blog/EditBlog.jsx";
import BlankPage from "../components/pages/Blank/BlankPage.jsx";
import BasicTable from "../components/pages/Table/BasicTable.jsx";
import DataTable from "../components/pages/Table/DataTable.jsx";
import Students from "../components/pages/Students/StudentsList.jsx";
import InvoiceGrid from "../components/pages/Invoice/InvoiceGrid.jsx";
import AddInvoice from "../components/pages/Invoice/AddInvoice.jsx";
import EditInvoice from "../components/pages/Invoice/EditInvoice.jsx";
import ViewInvoice from "../components/pages/Invoice/ViewInvoice.jsx";
import InvoiceSettings from "../components/pages/Invoice/InvoiceSettings.jsx";
import InvoiceList from "../components/pages/Invoice/InvoiceList.jsx";
import Register from "../components/pages/Authentication/Register.jsx";
import ForgotPassword from "../components/pages/Authentication/ForgotPassword.jsx";
import AdminDashboard from "../components/pages/Dashboard/AdminDashboard.jsx";
import Blogdetails from "../components/pages/Blog/Blogdetails.jsx";
import Profile from "../components/pages/Blog/Profile.jsx";
import TaxSetting from "../components/pages/Invoice/TaxSetting.jsx";
import BankSetting from "../components/pages/Invoice/BankSetting.jsx";
import Inbox from "../components/Header/Inbox .jsx";
import Compose from "../components/Header/Compose.jsx";
import StudentsDashboard from "../components/pages/Dashboard/StudentsDashboard.jsx";
import TeacherDashboard from "../components/pages/Dashboard/TeacherDashboard.jsx";
import StudentsView from "../components/pages/Students/StudentsView.jsx";
import AddStudent from "../components/pages/Students/AddStudent.jsx";
import EditStudent from "../components/pages/Students/EditStudent.jsx";
import StudentGrid from "../components/pages/Students/StudentGrid.jsx";
import InvoicePaid from "../components/pages/Invoice/InvoicePaid.jsx";
import InvoiceOverdue from "../components/pages/Invoice/InvoiceOverdue.jsx";
import InvoiceDraft from "../components/pages/Invoice/InvoiceDraft.jsx";
import InvoiceRecurring from "../components/pages/Invoice/InvoiceRecurring.jsx";
import InvoiceCancelled from "../components/pages/Invoice/InvoiceCancelled.jsx";
import TeachersList from "../components/pages/Teachers/TeachersList.jsx";
import TeachersProfile from "../components/pages/Teachers/TeachersProfile.jsx";
import TeachersAdd from "../components/pages/Teachers/TeachersAdd.jsx";
import TeachersEdit from "../components/pages/Teachers/TeachersEdit.jsx";
import TeachersGrid from "../components/pages/Teachers/TeachersGrid.jsx";
import DepartmentList from "../components/pages/Department/DepartmentList.jsx";
import AddDepartment from "../components/pages/Department/AddDepartment.jsx";
import EditDepartment from "../components/pages/Department/EditDepartment.jsx";
import SubjectList from "../components/pages/Subject/SubjectList.jsx";
import AddSubject from "../components/pages/Subject/AddSubject.jsx";
import EditSubject from "../components/pages/Subject/EditSubject.jsx";
import AttendancePage from "../components/pages/Attendance/index.jsx";
// Settings
import GendralSettings from "../components/pages/Settings/GendralSettings.jsx";
import Localization from "../components/pages/Settings/Localization.jsx";
import PaymentSettings from "../components/pages/Settings/PaymentSettings.jsx";
import EmailSettings from "../components/pages/Settings/EmailSettings.jsx";
import SocialSettings from "../components/pages/Settings/SocialSettings.jsx";
import SocialLinks from "../components/pages/Settings/SocialLinks.jsx";
import Seo from "../components/pages/Settings/Seo.jsx";
import OtherSettings from "../components/pages/Settings/OtherSettings.jsx";
//Library
import LibraryList from "../components/pages/Library/LibraryList.jsx";
import AddBook from "../components/pages/Library/AddBook.jsx";
import FeesCollection from "../components/pages/Accounts/FeesCollection.jsx";
import Expenses from "../components/pages/Accounts/Expenses.jsx";
import Salary from "../components/pages/Accounts/Salary.jsx";
import AddFeesCollection from "../components/pages/Accounts/AddFeesCollection.jsx";
import AddExpenses from "../components/pages/Accounts/AddExpenses.jsx";
import AddSalary from "../components/pages/Accounts/AddSalary.jsx";
import Holiday from "../components/pages/Holiday/Holiday.jsx";
import AddHoliday from "../components/pages/Holiday/AddHoliday.jsx";
import Fees from "../components/pages/Fees/Fees.jsx";
import AddFees from "../components/pages/Fees/AddFees.jsx";
import EditFees from "../components/pages/Fees/EditFees.jsx";
import Exam from "../components/pages/Exam List/Exam.jsx";
import AddExam from "../components/pages/Exam List/AddExam.jsx";
import EditExam from "../components/pages/Exam List/EditExam.jsx";
import TimeTable from "../components/pages/Time Table/TimeTable.jsx";
import AddTimeTable from "../components/pages/Time Table/AddTimeTable.jsx";
import EditTimeTable from "../components/pages/Time Table/EditTimeTable.jsx";
import EditBook from "../components/pages/Library/EditBook.jsx";
import Sports from "../components/pages/Sports/Sports.jsx";
import AddSports from "../components/pages/Sports/AddSports.jsx";
import EditSports from "../components/pages/Sports/EditSports.jsx";
import Hostel from "../components/pages/Hostel/Hostel.jsx";
import AddHostel from "../components/pages/Hostel/AddHostel.jsx";
import EditHostel from "../components/pages/Hostel/EditHostel.jsx";
import Transport from "../components/pages/Transports/Transport.jsx";
import AddTransport from "../components/pages/Transports/AddTransport.jsx";
import EditTransport from "../components/pages/Transports/EditTransport.jsx";
import Event from "../components/pages/Events/Event.jsx";
import AddEvent from "../components/pages/Events/AddEvent.jsx";
import BasicTables from "../components/pages/Table/BasicTable.jsx";
import DataTables from "../components/pages/Table/DataTable.jsx";
import BasicInputs from "../components/pages/Forms/BasicInputs.jsx";
import FormInputGroups from "../components/pages/Forms/FormInputGroups.jsx";
import FormMask from "../components/pages/Forms/FormMask.jsx";
import FormValidation from "../components/pages/Forms/FormValidation.jsx";
import HorizontalForm from "../components/pages/Forms/HorizontalForm.jsx";
import VerticalForm from "../components/pages/Forms/VerticalForm.jsx";
import FeatherIcons from "../components/pages/Icons/Feather/index.jsx";
import FlagIcons from "../components/pages/Icons/Flag/index.jsx";
import FontawesomeIcons from "../components/pages/Icons/Font-awesome/index.jsx";
import IonicIcons from "../components/pages/Icons/Ionic/index.jsx";
import MaterialIcons from "../components/pages/Icons/Material/index.jsx";
import PE7Icons from "../components/pages/Icons/Pe7/index.jsx";
import SimplelineIcons from "../components/pages/Icons/Simpleline/index.jsx";
import ThemifyIcons from "../components/pages/Icons/Themify/index.jsx";
import WeatherIcons from "../components/pages/Icons/Weather/index.jsx";
import TypiconIcons from "../components/pages/Icons/Typicon/index.jsx";
import Ribbon from "../components/pages/Elements/Ribbon.jsx";
import Rating from "../components/pages/Elements/Rating.jsx";
import Texteditor from "../components/pages/Elements/Texteditor.jsx";
import Counter from "../components/pages/Elements/Counter.jsx";
import Scrollbar from "../components/pages/Elements/ScrollBar.jsx";
import Notification from "../components/pages/Elements/Notification.jsx";
import Stickynote from "../components/pages/Elements/StickyNote.jsx";
import Timeline from "../components/pages/Elements/TimeLine.jsx";
import Formwizard from "../components/pages/Elements/FormWizard.jsx";
import HorizontalTimeLine from "../components/pages/Elements/HorizontalTimeLine.jsx";
import ApexCharts from "../components/pages/Charts/ApexChart.jsx";
import ChartJs from "../components/pages/Charts/ChartJs.jsx";
import MorrisCharts from "../components/pages/Charts/MorrisChart.jsx";
import FlotCharts from "../components/pages/Charts/FlotChart.jsx";
import PeityChart from "../components/pages/Charts/PeityChart.jsx";
import C3Charts from "../components/pages/Charts/C3Chart.jsx";
import ClipBoard from "../components/pages/Elements/ClipBoard.jsx";
import UiTooltip from "../components/pages/Base UI/Tooltip.jsx";
import Toastr from "../components/pages/Base UI/Toast.jsx";
import Spinner from "../components/pages/Base UI/Spinner.jsx";
import PopOver from "../components/pages/Base UI/PopOver.jsx";
import LightBox from "../components/pages/Base UI/LightBox.jsx";
import Cards from "../components/pages/Base UI/Cards.jsx";
import Pagination from "../components/pages/Base UI/Pagination.jsx";
import Tableavatar from "../components/pages/Base UI/Avatar.jsx";
import Tabs from "../components/pages/Base UI/Tabs.jsx";
import Typography from "../components/pages/Base UI/Typography.jsx";
import Progressbar from "../components/pages/Base UI/ProgressBar.jsx";
import Buttons from "../components/pages/Base UI/Buttons.jsx";
import Video from "../components/pages/Base UI/Video.jsx";
import Sweetalert from "../components/pages/Base UI/SweetAlert.jsx";
import Images from "../components/pages/Base UI/Images.jsx";
import Grid from "../components/pages/Base UI/Grid.jsx";
import ButtonGroup from "../components/pages/Base UI/ButtonGroup.jsx";
import Badge from "../components/pages/Base UI/Badge.jsx";
import Accordion from "../components/pages/Base UI/Accordion.jsx";
import Alert from "../components/pages/Base UI/Alert.jsx";
import PlaceHolder from "../components/pages/Base UI/PlaceHolder.jsx";
import OffCanvas from "../components/pages/Base UI/OffCanvas.jsx";
import Modal from "../components/pages/Base UI/Modal.jsx";
import Media from "../components/pages/Base UI/Media.jsx";
import Carousel from "../components/pages/Base UI/Carousel.jsx";
import BreadCrumbs from "../components/pages/Base UI/BreadCrumbs.jsx";
import Error404 from "../components/pages/Authentication/Error-404.jsx";
import RangeSlider from "../components/pages/Base UI/RangeSlider.jsx";
import DragDrop from "../components/pages/Elements/Drag&Drop/index.jsx";
import Clipboard from "../components/pages/Elements/ClipBoard.jsx";
import Dropdown from "../components/pages/Base UI/DropDown.jsx";
import EditEvent from "../components/pages/Events/EditEvent.jsx";
import AuthLayout from "../components/Layouts/AuthLayout.t.jsx";
import DashboardLayout from "../components/Layouts/DashboardLayout.jsx";
import PrivateRoute from "./ProtectedRoute.jsx";

const appcontainer = (props) => {
  return (
    <Router basename={`${config.publicPath}`}>
      <Switch>
        <Route path={["/login", "/register", "/forgotpassword", "/error404"]}>
          <AuthLayout>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/error404" component={Error404} />
          </AuthLayout>
        </Route>

        <PrivateRoute
          exact
          path={[
            "/",
            "/dashboard",
            "/admindashboard",
            "/teacherdashboard",
            "/studentdashboard",
          ]}
        >
          <DashboardLayout>
            <Route path="/dashboard" component={AdminDashboard} />
            <Route path="/admindashboard" component={AdminDashboard} />
            <Route path="/teacherdashboard" component={TeacherDashboard} />
            <Route path="/studentdashboard" component={StudentsDashboard} />
            <Route path="/attendance" component={AttendancePage} />
          </DashboardLayout>
        </PrivateRoute>

        <Route path="/blog" component={BlogView} />
        <Route path="/pendingblog" component={PendingBlog} />
        <Route path="/addblog" component={AddBlog} />
        <Route path="/editblog" component={EditBlog} />
        <Route path="/blogdetails" component={Blogdetails} />
        <Route path="/profile" component={Profile} />

        <Route path="/blankpage" component={BlankPage} />
        <Route path="/basictable" component={BasicTable} />
        <Route path="/datatable" component={DataTable} />

        <Route path="/students" component={Students} />
        <Route path="/studentsview" component={StudentsView} />
        <Route path="/addstudent" component={AddStudent} />
        <Route path="/editstudent" component={EditStudent} />
        <Route path="/studentgrid" component={StudentGrid} />

        <Route path="/invoicegrid" component={InvoiceGrid} />
        <Route path="/invoicepaid" component={InvoicePaid} />
        <Route path="/invoiceoverdue" component={InvoiceOverdue} />
        <Route path="/invoicedraft" component={InvoiceDraft} />
        <Route path="/invoicerecurring" component={InvoiceRecurring} />
        <Route path="/invoicecancelled" component={InvoiceCancelled} />
        <Route path="/addinvoice" component={AddInvoice} />
        <Route path="/editinvoice" component={EditInvoice} />
        <Route path="/viewinvoice" component={ViewInvoice} />
        <Route path="/invoicesetting" component={InvoiceSettings} />
        <Route path="/invoicelist" component={InvoiceList} />
        <Route path="/taxsetting" component={TaxSetting} />
        <Route path="/banksetting" component={BankSetting} />

        <Route path="/inbox" component={Inbox} />
        <Route path="/compose" component={Compose} />

        {/* Settings */}
        <Route path="/generalsettings" component={GendralSettings} />
        <Route path="/localization" component={Localization} />
        <Route path="/paymentsettings" component={PaymentSettings} />
        <Route path="/emailsettings" component={EmailSettings} />
        <Route path="/socialsettings" component={SocialSettings} />
        <Route path="/sociallinks" component={SocialLinks} />
        <Route path="/seo" component={Seo} />
        <Route path="/othersettings" component={OtherSettings} />

        <Route path="/librarylist" component={LibraryList} />
        <Route path="/addbook" component={AddBook} />
        <Route path="/editbook" component={EditBook} />

        <Route path="/teacherslist" component={TeachersList} />
        <Route path="/teachersprofile" component={TeachersProfile} />
        <Route path="/addteacher" component={TeachersAdd} />
        <Route path="/editteacher" component={TeachersEdit} />
        <Route path="/teachersgrid" component={TeachersGrid} />

        <Route path="/department" component={DepartmentList} />
        <Route path="/adddepartment" component={AddDepartment} />
        <Route path="/editdepartment" component={EditDepartment} />

        <Route path="/subject" component={SubjectList} />
        <Route path="/addsubject" component={AddSubject} />
        <Route path="/editsubject" component={EditSubject} />

        <Route path="/feescollection" component={FeesCollection} />
        <Route path="/addfeescollection" component={AddFeesCollection} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/addexpenses" component={AddExpenses} />
        <Route path="/salary" component={Salary} />
        <Route path="/addsalary" component={AddSalary} />

        <Route path="/holiday" component={Holiday} />
        <Route path="/addholiday" component={AddHoliday} />

        <Route path="/fees" component={Fees} />
        <Route path="/addfees" component={AddFees} />
        <Route path="/editfees" component={EditFees} />

        <Route path="/exam" component={Exam} />
        <Route path="/addexam" component={AddExam} />
        <Route path="/editexam" component={EditExam} />

        <Route path="/timetable" component={TimeTable} />
        <Route path="/addtimetable" component={AddTimeTable} />
        <Route path="/edittimetable" component={EditTimeTable} />

        <Route path="/sports" component={Sports} />
        <Route path="/addsports" component={AddSports} />
        <Route path="/editsports" component={EditSports} />

        <Route path="/hostel" component={Hostel} />
        <Route path="/addhostel" component={AddHostel} />
        <Route path="/edithostel" component={EditHostel} />

        <Route path="/transport" component={Transport} />
        <Route path="/addtransport" component={AddTransport} />
        <Route path="/edittransport" component={EditTransport} />

        <Route path="/event" component={Event} />
        <Route path="/addevent" component={AddEvent} />
        <Route path="/editevent" component={EditEvent} />

        <Route path="/basictable" component={BasicTables} />
        <Route path="/datatable" component={DataTables} />

        <Route path="/basicinput" component={BasicInputs} />
        <Route path="/forminputgroup" component={FormInputGroups} />
        <Route path="/formmask" component={FormMask} />
        <Route path="/formvalidation" component={FormValidation} />
        <Route path="/horizontalform" component={HorizontalForm} />
        <Route path="/verticalform" component={VerticalForm} />

        <Route path="/feathericons" component={FeatherIcons} />
        <Route path="/flagicons" component={FlagIcons} />
        <Route path="/fontawesomeicons" component={FontawesomeIcons} />
        <Route path="/iconicicons" component={IonicIcons} />
        <Route path="/materialicons" component={MaterialIcons} />
        <Route path="/flagicons" component={FlagIcons} />
        <Route path="/pe7icons" component={PE7Icons} />
        <Route path="/simplelineicons" component={SimplelineIcons} />
        <Route path="/themifyicons" component={ThemifyIcons} />
        <Route path="/weathericons" component={WeatherIcons} />
        <Route path="/typiconicons" component={TypiconIcons} />

        <Route path="/ribbon" component={Ribbon} />
        <Route path="/dragdrop" component={DragDrop} />
        <Route path="/clipboard" component={Clipboard} />
        <Route path="/rating" component={Rating} />
        <Route path="/texteditor" component={Texteditor} />
        <Route path="/counter" component={Counter} />
        <Route path="/scrollbar" component={Scrollbar} />
        <Route path="/notification" component={Notification} />
        <Route path="/stickynote" component={Stickynote} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/horizontaltimeline" component={HorizontalTimeLine} />
        <Route path="/formwizard" component={Formwizard} />

        <Route path="/apexchart" component={ApexCharts} />
        <Route path="/chartjs" component={ChartJs} />
        <Route path="/morrischart" component={MorrisCharts} />
        <Route path="/flotchart" component={FlotCharts} />
        <Route path="/peitychart" component={PeityChart} />
        <Route path="/c3chart" component={C3Charts} />

        <Route path="/tooltip" component={UiTooltip} />
        <Route path="/toast" component={Toastr} />
        <Route path="/spinner" component={Spinner} />
        <Route path="/popover" component={PopOver} />
        <Route path="/rangeslider" component={RangeSlider} />
        <Route path="/lightbox" component={LightBox} />
        <Route path="/cards" component={Cards} />
        <Route path="/dropdown" component={Dropdown} />
        <Route path="/pagination" component={Pagination} />
        <Route path="/avatar" component={Tableavatar} />
        <Route path="/tabs" component={Tabs} />
        <Route path="/typography" component={Typography} />
        <Route path="/progressbar" component={Progressbar} />
        <Route path="/buttons" component={Buttons} />
        <Route path="/video" component={Video} />
        <Route path="/sweetalert" component={Sweetalert} />
        <Route path="/images" component={Images} />
        <Route path="/grid" component={Grid} />
        <Route path="/buttongroup" component={ButtonGroup} />
        <Route path="/badge" component={Badge} />
        <Route path="/accordion" component={Accordion} />
        <Route path="/alert" component={Alert} />
        <Route path="/placeholder" component={PlaceHolder} />
        <Route path="/offcanvas" component={OffCanvas} />
        <Route path="/media" component={Media} />
        <Route path="/carousel" component={Carousel} />
        <Route path="/breadcrumbs" component={BreadCrumbs} />
        <Route path="/modal" component={Modal} />
      </Switch>
    </Router>
  );
};

export default appcontainer;

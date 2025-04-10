const path = (root, subLink) => `${root}${subLink}`;

const ROOTS_DASHBOARD = '/dashboard';

const PATH_AUTH = {
  login: '/',
  register: '/register',
  forgotPassword: '/forgotpassword',
  admissionForm: '/admissionform',
  resetPassword: '/resetpassword',
};

const PATH_DASHBOARD = {
  adminDashboard: path(ROOTS_DASHBOARD, '/admindashboard'),
  attendanceReports: path(ROOTS_DASHBOARD, '/attendanceReports'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  // Courses
  courses: path(ROOTS_DASHBOARD, '/courses'),
  courseAdd: path(ROOTS_DASHBOARD, '/addcourse'),
  courseEdit: path(ROOTS_DASHBOARD, '/editcourse'),
  //Groups
  groups: path(ROOTS_DASHBOARD, '/groups'),
  groupAdd: path(ROOTS_DASHBOARD, '/addgroup'),
  groupEdit: path(ROOTS_DASHBOARD, '/editgroup'),
  // Mail
  mail: path(ROOTS_DASHBOARD, '/mail'),
  mailv2: path(ROOTS_DASHBOARD, '/mailv2'),
  // Attendance
  markattendance: path(ROOTS_DASHBOARD, '/markattendance'),
  viewattendance: path(ROOTS_DASHBOARD, '/viewattendance'),
  // Reports

  // Students
  students: path(ROOTS_DASHBOARD, '/students'),
  studentAdd: path(ROOTS_DASHBOARD, '/addstudent'),
  studentEdit: path(ROOTS_DASHBOARD, '/editstudent'),
  studentDashboard: path(ROOTS_DASHBOARD, '/studentdashboard'),
  studentProfile: path(ROOTS_DASHBOARD, '/studentsview'),
  //  Subjects
  subjects: path(ROOTS_DASHBOARD, '/subject'),
  subjectAdd: path(ROOTS_DASHBOARD, '/addsubject'),
  subjectEdit: path(ROOTS_DASHBOARD, '/editsubject'),
  // Teachers
  teachers: path(ROOTS_DASHBOARD, '/teacherslist'),
  teacherAdd: path(ROOTS_DASHBOARD, '/addteacher'),
  teacherDashboard: path(ROOTS_DASHBOARD, '/teacherdashboard'),
  teacherEdit: path(ROOTS_DASHBOARD, '/editteacher'),
  teacherProfile: path(ROOTS_DASHBOARD, '/teachersprofile'),
  notices: path(ROOTS_DASHBOARD, '/notices'),
  // Templates
  templates: path(ROOTS_DASHBOARD, '/templates'),
  templateDetails: path(ROOTS_DASHBOARD, '/templatedetails'),
  templateEdit: path(ROOTS_DASHBOARD, '/edittemplate'),
  // studentReports: path(ROOTS_DASHBOARD, '/studentReports'),
  // tutorReports: path(ROOTS_DASHBOARD, '/attendanceReports'),
  warningLetterReport: path(ROOTS_DASHBOARD, '/reports/warningletter'),
  groupReport: path(ROOTS_DASHBOARD, '/reports/group'),
};

export { PATH_AUTH, PATH_DASHBOARD };

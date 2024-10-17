const path = (root, subLink) => `${root}${subLink}`;

const ROOTS_DASHBOARD = '/dashboard';

const PATH_AUTH = {
  login: '/',
  register: '/register',
  forgotPassword: '/forgotpassword',
  admissionForm: '/admissionform',
};

const PATH_DASHBOARD = {
  adminDashboard: path(ROOTS_DASHBOARD, '/admindashboard'),
  attendanceReports: path(ROOTS_DASHBOARD, '/attendanceReports'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  courses: path(ROOTS_DASHBOARD, '/courses'),
  courseAdd: path(ROOTS_DASHBOARD, '/addcourse'),
  courseEdit: path(ROOTS_DASHBOARD, '/editcourse'),
  groups: path(ROOTS_DASHBOARD, '/groups'),
  groupAdd: path(ROOTS_DASHBOARD, '/addgroup'),
  groupEdit: path(ROOTS_DASHBOARD, '/editgroup'),
  mail: path(ROOTS_DASHBOARD, '/mail'),
  markattendance: path(ROOTS_DASHBOARD, '/markattendance'),
  students: path(ROOTS_DASHBOARD, '/students'),
  studentAdd: path(ROOTS_DASHBOARD, '/addstudent'),
  studentEdit: path(ROOTS_DASHBOARD, '/editstudent'),
  studentDashboard: path(ROOTS_DASHBOARD, '/studentdashboard'),
  subjects: path(ROOTS_DASHBOARD, '/subject'),
  subjectAdd: path(ROOTS_DASHBOARD, '/addsubject'),
  subjectEdit: path(ROOTS_DASHBOARD, '/editsubject'),
  studentProfile: path(ROOTS_DASHBOARD, '/studentsview'),
  teachers: path(ROOTS_DASHBOARD, '/teacherslist'),
  teacherAdd: path(ROOTS_DASHBOARD, '/addteacher'),
  teacherDashboard: path(ROOTS_DASHBOARD, '/teacherdashboard'),
  teacherEdit: path(ROOTS_DASHBOARD, '/editteacher'),
  teacherProfile: path(ROOTS_DASHBOARD, '/teachersprofile'),
  users: path(ROOTS_DASHBOARD, '/users'),
  userAdd: path(ROOTS_DASHBOARD, '/adduser'),
  userEdit: path(ROOTS_DASHBOARD, '/edituser'),
  userProfile: path(ROOTS_DASHBOARD, '/userprofile'),
  viewattendance: path(ROOTS_DASHBOARD, '/viewattendance'),
  // studentReports: path(ROOTS_DASHBOARD, '/studentReports'),
  // tutorReports: path(ROOTS_DASHBOARD, '/attendanceReports'),
};

export { PATH_DASHBOARD, PATH_AUTH };

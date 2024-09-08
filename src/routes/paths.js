const path = (root, subLink) => `${root}${subLink}`;

const ROOTS_DASHBOARD = '/dashboard';

const PATH_AUTH = {
  login: '/',
  register: '/register',
  forgotPassword: '/forgotpassword',
};

const PATH_DASHBOARD = {
  adminDashboard: path(ROOTS_DASHBOARD, '/admindashboard'),
  teacherDashboard: path(ROOTS_DASHBOARD, '/teacherdashboard'),
  studentDashboard: path(ROOTS_DASHBOARD, '/studentdashboard'),
  attendance: path(ROOTS_DASHBOARD, '/attendance'),
  students: path(ROOTS_DASHBOARD, '/students'),
  studentProfile: path(ROOTS_DASHBOARD, '/studentsview'),
  studentAdd: path(ROOTS_DASHBOARD, '/addstudent'),
  studentEdit: path(ROOTS_DASHBOARD, '/editstudent'),
  teachers: path(ROOTS_DASHBOARD, '/teacherslist'),
  teacherProfile: path(ROOTS_DASHBOARD, '/teachersprofile'),
  teacherAdd: path(ROOTS_DASHBOARD, '/addteacher'),
  teacherEdit: path(ROOTS_DASHBOARD, '/editteacher'),
  courses: path(ROOTS_DASHBOARD, '/courses'),
  courseAdd: path(ROOTS_DASHBOARD, '/addcourse'),
  courseEdit: path(ROOTS_DASHBOARD, '/editcourse'),
  subjects: path(ROOTS_DASHBOARD, '/subject'),
  subjectAdd: path(ROOTS_DASHBOARD, '/addsubject'),
  subjectEdit: path(ROOTS_DASHBOARD, '/editsubject'),
  // studentReports: path(ROOTS_DASHBOARD, '/studentReports'),
  attendanceReports: path(ROOTS_DASHBOARD, '/attendanceReports'),
  // tutorReports: path(ROOTS_DASHBOARD, '/attendanceReports'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
};

export { PATH_DASHBOARD, PATH_AUTH };

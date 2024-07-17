const path = (root, subLink) => `${root}${subLink}`;

const ROOTS_DASHBOARD = '/dashboard';

const PATH_AUTH = {
  login: '/login',
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
  studentEdit: path(ROOTS_DASHBOARD, '/editstudnet'),
  teachers: path(ROOTS_DASHBOARD, '/teacherslist'),
  teacherProfile: path(ROOTS_DASHBOARD, '/teachersprofile'),
  teacherAdd: path(ROOTS_DASHBOARD, '/addteacher'),
  teacherEdit: path(ROOTS_DASHBOARD, '/editteacher'),
  departments: path(ROOTS_DASHBOARD, '/department'),
  departmentAdd: path(ROOTS_DASHBOARD, '/adddepartment'),
  departmentEdit: path(ROOTS_DASHBOARD, '/editdepartment'),
  subjects: path(ROOTS_DASHBOARD, '/subject'),
  subjectAdd: path(ROOTS_DASHBOARD, '/addsubject'),
  subjectEdit: path(ROOTS_DASHBOARD, '/editsubject'),
  // studentReports: path(ROOTS_DASHBOARD, '/studentReports'),
  attendanceReports: path(ROOTS_DASHBOARD, '/attendanceReports'),
  // tutorReports: path(ROOTS_DASHBOARD, '/attendanceReports'),
};

export { PATH_DASHBOARD, PATH_AUTH };

// const TeacherDashboard = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [date, setDate] = useState(new Date());

//   const [value, onChange] = useState(new Date());
//   const [data, setObject] = useState({
//     chart: {
//       height: 350,
//       toolbar: {
//         show: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     datasets: {
//       id: 'apaxcharts-area',
//     },
//     stroke: {
//       curve: 'straight',
//     },
//     colors: ['#3D5EE1', '#70C4CF'],
//     borderWidth: 3,
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//   });
//   const [series, setSeries] = useState([
//     {
//       name: 'Teachers',
//       data: [45, 60, 75, 51, 42, 42, 30],
//     },
//     {
//       name: 'Students',
//       data: [24, 48, 56, 32, 34, 52, 25],
//     },
//   ]);
//   return (
//     <>
//       <div className="content container-fluid">
//         {/* Page Header */}
//         <div className="page-header">
//           <div className="row">
//             <div className="col-sm-12">
//               <div className="page-sub-header">
//                 <h3 className="page-title">Welcome {userInfo.firstName}!</h3>
//                 <ul className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Link to="/admindashboard">Home</Link>
//                   </li>
//                   <li className="breadcrumb-item active">Teacher</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Page Header */}
//         {/* Overview Section */}
//         {/* <div className="row">
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="card bg-comman w-100">
//               <div className="card-body">
//                 <div className="db-widgets d-flex justify-content-between align-items-center">
//                   <div className="db-info">
//                     <h6>Total Classes</h6>
//                     <h3>04/06</h3>
//                   </div>
//                   <div className="db-icon">
//                     <img src={teachericon01} alt="Dashboard Icon" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="card bg-comman w-100">
//               <div className="card-body">
//                 <div className="db-widgets d-flex justify-content-between align-items-center">
//                   <div className="db-info">
//                     <h6>Total Students</h6>
//                     <h3>40/60</h3>
//                   </div>
//                   <div className="db-icon">
//                     <img src={dashicon01} alt="Dashboard Icon" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="card bg-comman w-100">
//               <div className="card-body">
//                 <div className="db-widgets d-flex justify-content-between align-items-center">
//                   <div className="db-info">
//                     <h6>Total Lessons</h6>
//                     <h3>30/50</h3>
//                   </div>
//                   <div className="db-icon">
//                     <img src={teachericon02} alt="Dashboard Icon" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="card bg-comman w-100">
//               <div className="card-body">
//                 <div className="db-widgets d-flex justify-content-between align-items-center">
//                   <div className="db-info">
//                     <h6>Total Hours</h6>
//                     <h3>15/20</h3>
//                   </div>
//                   <div className="db-icon">
//                     <img src={teachericon03} alt="Dashboard Icon" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//         {/* /Overview Section */}
//         {/* Teacher Dashboard */}
//         <div className="row">
//           <div className="col-12 col-lg-12 col-xl-8">
//             <div className="row">
//               <div className="col-12 col-lg-8 col-xl-8 d-flex">
//                 <div className="card flex-fill comman-shadow">
//                   <div className="card-header">
//                     <div className="row align-items-center">
//                       <div className="col-6">
//                         <h5 className="card-title">Upcoming Lesson</h5>
//                       </div>
//                       <div className="col-6">
//                         <span className="float-end view-link">
//                           <Link to="#">View All Courses</Link>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="pt-3 pb-3">
//                     <div className="table-responsive lesson">
//                       <table className="table table-center">
//                         <tbody>
//                           <tr>
//                             <td>
//                               <div className="date">
//                                 <b>Lessons 30</b>
//                                 <p>3.1 Ipsuum dolor</p>
//                                 <ul className="teacher-date-list">
//                                   <li>
//                                     <i className="fas fa-calendar-alt me-2" />
//                                     Sep 5, 2022
//                                   </li>
//                                   <li>|</li>
//                                   <li>
//                                     <i className="fas fa-clock me-2" />
//                                     09:00 - 10:00 am
//                                   </li>
//                                 </ul>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="lesson-confirm">
//                                 <Link to="#">Confirmed</Link>
//                               </div>
//                               <button type="submit" className="btn btn-info">
//                                 Reschedule
//                               </button>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <div className="date">
//                                 <b>Lessons 30</b>
//                                 <p>3.1 Ipsuum dolor</p>
//                                 <ul className="teacher-date-list">
//                                   <li>
//                                     <i className="fas fa-calendar-alt me-2" />
//                                     Sep 5, 2022
//                                   </li>
//                                   <li>|</li>
//                                   <li>
//                                     <i className="fas fa-clock me-2" />
//                                     09:00 - 10:00 am
//                                   </li>
//                                 </ul>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="lesson-confirm">
//                                 <Link to="#">Confirmed</Link>
//                               </div>
//                               <button type="submit" className="btn btn-info">
//                                 Reschedule
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-12 col-lg-4 col-xl-4 d-flex">
//                 <div className="card flex-fill comman-shadow">
//                   <div className="card-header">
//                     <div className="row align-items-center">
//                       <div className="col-12">
//                         <h5 className="card-title">Semester Progress</h5>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="dash-widget">
//                     <div className="circle-bar circle-bar">
//                       {/* <div className="circle-graph1" data-percent={50}> */}
//                       <ProgressBar
//                         width={20}
//                         radius={70}
//                         progress={50}
//                         rotate={-180}
//                         strokeWidth={10}
//                         strokeColor="#6e6bfa"
//                         strokeLinecap="square"
//                         trackStrokeWidth={8}
//                         trackStrokeColor="#e6e6e6"
//                         trackStrokeLinecap="square"
//                         pointerRadius={0}
//                         initialAnimation={true}
//                         transition="1.5s ease 0.5s"
//                         trackTransition="0s ease">
//                         <div className="circle-graph1" data-percent="50">
//                           <div className="progress-less teacher-dashboard">
//                             <h4>55/60 </h4>
//                             <p>Lesson Progressed</p>
//                           </div>
//                         </div>
//                       </ProgressBar>
//                       {/* </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-12 col-lg-12 col-xl-12 d-flex">
//                 <div className="card flex-fill comman-shadow">
//                   <div className="card-header">
//                     <div className="row align-items-center">
//                       <div className="col-6">
//                         <h5 className="card-title">Teaching Activity</h5>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <div id="apexcharts-area"></div>
//                     <Chart options={data} series={series} type="area" />
//                     <div id="school-area" />
//                   </div>
//                 </div>
//               </div>
//               <div className="col-12 col-lg-12 col-xl-12 d-flex">
//                 <div className="card flex-fill comman-shadow">
//                   <div className="card-header d-flex align-items-center">
//                     <h5 className="card-title">Teaching History</h5>
//                     <ul className="chart-list-out student-ellips">
//                       <li className="star-menus">
//                         <Link to="#">
//                           <i className="fas fa-ellipsis-v" />
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="card-body">
//                     <div className="teaching-card">
//                       <ul className="steps-history">
//                         <li>Sep22</li>
//                         <li>Sep23</li>
//                         <li>Sep24</li>
//                       </ul>
//                       <ul className="activity-feed">
//                         <li className="feed-item d-flex align-items-center">
//                           <div className="dolor-activity">
//                             <span className="feed-text1">
//                               <Link>Mathematics</Link>
//                             </span>
//                             <ul className="teacher-date-list">
//                               <li>
//                                 <i className="fas fa-calendar-alt me-2" />
//                                 September 5, 2022
//                               </li>
//                               <li>|</li>
//                               <li>
//                                 <i className="fas fa-clock me-2" />
//                                 09:00 am - 10:00 am (60 Minutes)
//                               </li>
//                             </ul>
//                           </div>
//                           <div className="activity-btns ms-auto">
//                             <button type="submit" className="btn btn-info">
//                               In Progress
//                             </button>
//                           </div>
//                         </li>
//                         <li className="feed-item d-flex align-items-center">
//                           <div className="dolor-activity">
//                             <span className="feed-text1">
//                               <Link>Geography </Link>
//                             </span>
//                             <ul className="teacher-date-list">
//                               <li>
//                                 <i className="fas fa-calendar-alt me-2" />
//                                 September 5, 2022
//                               </li>
//                               <li>|</li>
//                               <li>
//                                 <i className="fas fa-clock me-2" />
//                                 09:00 am - 10:00 am (60 Minutes)
//                               </li>
//                             </ul>
//                           </div>
//                           <div className="activity-btns ms-auto">
//                             <button type="submit" className="btn btn-info">
//                               Completed
//                             </button>
//                           </div>
//                         </li>
//                         <li className="feed-item d-flex align-items-center">
//                           <div className="dolor-activity">
//                             <span className="feed-text1">
//                               <Link>Botony</Link>
//                             </span>
//                             <ul className="teacher-date-list">
//                               <li>
//                                 <i className="fas fa-calendar-alt me-2" />
//                                 September 5, 2022
//                               </li>
//                               <li>|</li>
//                               <li>
//                                 <i className="fas fa-clock me-2" />
//                                 09:00 am - 10:00 am (60 Minutes)
//                               </li>
//                             </ul>
//                           </div>
//                           <div className="activity-btns ms-auto">
//                             <button type="submit" className="btn btn-info">
//                               In Progress
//                             </button>
//                           </div>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-lg-12 col-xl-4 d-flex">
//             <div className="card flex-fill comman-shadow">
//               <div className="card-body">
//                 <div>
//                   {/* <SimpleReactCalendar activeMonth={new Date()} /> */}
//                   <Calendar onChange={setDate} value={date} />
//                 </div>
//                 <div id="calendar-doctor" className="calendar-container" />

//                 <div className="calendar-info calendar-info1">
//                   <div className="up-come-header">
//                     <h2>Upcoming Events</h2>
//                     <span>
//                       <Link to="#">
//                         <i className="feather-plus">
//                           <FeatherIcon icon="plus" />
//                         </i>
//                       </Link>
//                     </span>
//                   </div>
//                   <div className="upcome-event-date">
//                     <h3>10 Jan</h3>
//                     <span>
//                       <i className="fas fa-ellipsis-h" />
//                     </span>
//                   </div>
//                   <div className="calendar-details">
//                     <p>08:00 am</p>
//                     <div className="calendar-box normal-bg">
//                       <div className="calandar-event-name">
//                         <h4>Botony</h4>
//                         <h5>Lorem ipsum sit amet</h5>
//                       </div>
//                       <span>08:00 - 09:00 am</span>
//                     </div>
//                   </div>
//                   <div className="calendar-details">
//                     <p>09:00 am</p>
//                     <div className="calendar-box normal-bg">
//                       <div className="calandar-event-name">
//                         <h4>Botony</h4>
//                         <h5>Lorem ipsum sit amet</h5>
//                       </div>
//                       <span>09:00 - 10:00 am</span>
//                     </div>
//                   </div>
//                   <div className="calendar-details">
//                     <p>10:00 am</p>
//                     <div className="calendar-box normal-bg">
//                       <div className="calandar-event-name">
//                         <h4>Botony</h4>
//                         <h5>Lorem ipsum sit amet</h5>
//                       </div>
//                       <span>10:00 - 11:00 am</span>
//                     </div>
//                   </div>
//                   <div className="upcome-event-date">
//                     <h3>10 Jan</h3>
//                     <span>
//                       <i className="fas fa-ellipsis-h" />
//                     </span>
//                   </div>
//                   <div className="calendar-details">
//                     <p>08:00 am</p>
//                     <div className="calendar-box normal-bg">
//                       <div className="calandar-event-name">
//                         <h4>English</h4>
//                         <h5>Lorem ipsum sit amet</h5>
//                       </div>
//                       <span>08:00 - 09:00 am</span>
//                     </div>
//                   </div>
//                   <div className="calendar-details">
//                     <p>09:00 am</p>
//                     <div className="calendar-box normal-bg">
//                       <div className="calandar-event-name">
//                         <h4>Mathematics </h4>
//                         <h5>Lorem ipsum sit amet</h5>
//                       </div>
//                       <span>09:00 - 10:00 am</span>
//                     </div>
//                   </div>
//                   <div className="calendar-details">
//                     <p>10:00 am</p>
//                     <div className="calendar-box normal-bg">
//                       <div className="calandar-event-name">
//                         <h4>History</h4>
//                         <h5>Lorem ipsum sit amet</h5>
//                       </div>
//                       <span>10:00 - 11:00 am</span>
//                     </div>
//                   </div>
//                   <div className="calendar-details">
//                     <p>11:00 am</p>
//                     <div className="calendar-box break-bg">
//                       <div className="calandar-event-name">
//                         <h4>Break</h4>
//                         <h5>Lorem ipsum sit amet</h5>
//                       </div>
//                       <span>11:00 - 12:00 am</span>
//                     </div>
//                   </div>
//                   <div className="calendar-details">
//                     <p>11:30 am</p>
//                     <div className="calendar-box normal-bg">
//                       <div className="calandar-event-name">
//                         <h4>History</h4>
//                         <h5>Lorem ipsum sit amet</h5>
//                       </div>
//                       <span>11:30 - 12:00 am</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Teacher Dashboard */}
//       </div>
//     </>
//   );
// };

// export default TeacherDashboard;

import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from 'react-customizable-progressbar';
import Chart from 'react-apexcharts';
import Calendar from 'react-calendar';
import FeatherIcon from 'feather-icons-react';
// import SimpleReactCalendar from 'simple-react-calendar'
import {
  dashicon01,
  teachericon01,
  teachericon02,
  teachericon03,
} from '../../imagepath';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import { Alert, Card } from 'antd';
import { useGetDashboardQuery } from '../../../redux/slices/apiSlices/dashboardApiSlice';
import { useLazyGetTeacherTimeTableQuery } from '../../../redux/slices/apiSlices/timetableApiSlice';
import { Box, Grid, Stack, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useNotification from '../../../hooks/useNotification';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getDayOfWeek } from '../../../utils/formatDateTime';
import { getDate } from 'date-fns';
import { useGetNoticesQuery } from '../../../redux/slices/apiSlices/noticesApiSlice';
import NoticeCard from '../../noticeCard';

const noticeColors = [
  '#ebe9fc',
  '#fad5b8',
  '#d7ffb3',
  '#b9ebf8',
  '#b9f1f8',
  '#c3bcf5',
];

const renderEventComponent = (props) => {
  const { event, timeText } = props;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            // width: 10,
            height: 10,
            backgroundColor: event.color,
            borderRadius: '50%',
            marginRight: 1,
            py: 2,
          }}
        />
        <Stack>
          <Typography sx={{ fontWeight: 'bold', color: '#8d8d8b' }}>
            {timeText}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', color: '#40403f ' }}>
            {event.extendedProps.group?.name} -{' '}
            {event.extendedProps.subject.code}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

const TeacherDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [getTeacherTimetable, { isLoading, error }] =
    useLazyGetTeacherTimeTableQuery();
  const { data: notices } = useGetNoticesQuery();

  const navigate = useNavigate();
  const calendarRef = useRef();
  const { openNotification } = useNotification();

  const [events, setEvents] = useState([]);

  const handleEventClick = (eventInfo) => {
    const event = eventInfo.event;

    if (getDate(event._instance.range.start) === getDate(new Date())) {
      navigate(PATH_DASHBOARD.markattendance, {
        state: {
          group: event.extendedProps.group.name,
          groupId: event.extendedProps.group.id,
          startTime: event._instance.range.start.toISOString(),
          endTime: event._instance.range.end.toISOString(),
          teacher: `${event.extendedProps.teacher.firstName} ${event.extendedProps.teacher.lastName}`,
          subject: event.extendedProps.subject.name,
          subjectId: event.extendedProps.subject.id,
        },
      });
    } else {
      openNotification('error', 'Access denied');
    }
  };

  const fetchTeacherTimeTable = async () => {
    await getTeacherTimetable()
      .unwrap()
      .then((res) => {
        const events = [];
        res.data.forEach((item) => {
          item.entries.forEach((entry) => {
            events.push({
              startTime: `${entry.startTime}:00`,
              endTime: `${entry.endTime}:00`,
              group: {
                name: item.group.name,
                id: item.group._id,
              },
              subject: {
                code: entry.subject.code,
                name: entry.subject.name,
                id: entry.subject._id,
              },
              color:
                entry.subject.code === 'CAS'
                  ? '#fef4e6'
                  : entry.subject.code === 'CIA'
                    ? '#e8fee7'
                    : entry.subject.code === 'IND PRO'
                      ? '#e6f1ff'
                      : '#faeaeb',
              teacher: {
                firstName: entry.teacher.firstName,
                lastName: entry.teacher.lastName,
                id: entry.teacher._id,
              },
              allDay: false,
              daysOfWeek: [`${getDayOfWeek(entry.dayOfWeek)}`],
            });
          });
        });
        setEvents(events);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  useEffect(() => {
    fetchTeacherTimeTable();
  }, []);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-sub-header">
              <h3 className="page-title">Welcome {userInfo.firstName}!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admindashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active">Teacher</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <Alert
          message="Error"
          description={
            error?.data?.message || teacherTimetableError.data.message
          }
          type="error"
          showIcon
        />
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} lg={9}>
            <Card>
              <FullCalendar
                ref={calendarRef}
                editable
                selectable
                events={events}
                eventClick={handleEventClick}
                eventContent={renderEventComponent}
                eventStartEditable={false}
                eventDurationEditable={false}
                headerToolbar={{
                  left: 'today prev next title',
                  center: '',
                  right: 'dayGridMonth timeGridWeek timeGridDay',
                }}
                titleFormat={{ year: 'numeric', month: 'long' }}
                allDaySlot={false}
                viewHeight={'100vh'}
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }}
                slotLabelFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false, // Set to false for 24-hour format
                }}
                slotMinTime="09:30:00"
                slotMaxTime="22:00:00"
                slotDuration="01:00:00"
                weekends={true}
                dayHeaderFormat={{
                  weekday: 'short',
                  day: 'numeric',
                  omitCommas: true,
                }}
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                views={['dayGridMonth', 'timeGridWeek', 'timeGridDay']}
              />
            </Card>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Card>
              <Typography fontSize={'1.75em'} fontWeight={700}>
                Notice
              </Typography>
              <Box>
                {notices?.data?.map((notice, index) => {
                  if (notice.isActive) {
                    return (
                      <NoticeCard
                        key={notice._id}
                        title={notice.title}
                        description={notice.description}
                        startDate={notice.startDate}
                        endDate={notice.endDate}
                        color={noticeColors[index]}
                      />
                    );
                  }
                })}
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default TeacherDashboard;

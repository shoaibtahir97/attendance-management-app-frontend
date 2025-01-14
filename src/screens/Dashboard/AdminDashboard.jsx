import { Box, Stack, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { MdOutlineGroups } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NoticeCard from '../../components/noticeCard';
import PageHeader from '../../components/PageHeader';
import useNotification from '../../hooks/useNotification';
import { useGetNoticesQuery } from '../../redux/slices/apiSlices/noticesApiSlice';
import { useLazyGetTimetableQuery } from '../../redux/slices/apiSlices/timetableApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import RescheduleClassDialog from './components/RescheduleClassDialog';

const noticeColors = [
  '#ebe9fc',
  '#fad5b8',
  '#d7ffb3',
  '#b9ebf8',
  '#b9f1f8',
  '#c3bcf5',
];

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { openNotification } = useNotification();
  const { data: notices } = useGetNoticesQuery();
  const [date, setDate] = useState(new Date());
  const [classDetails, setClassDetails] = useState({});
  const [todayClasses, setTodayClasses] = useState([]);

  const [getTimetable] = useLazyGetTimetableQuery();

  const [isRescheduleClassDialogVisible, setIsRescheduleClassDialogVisible] =
    useState(false);

  const toggleRescheduleClassDialog = () =>
    setIsRescheduleClassDialogVisible(!isRescheduleClassDialogVisible);

  const fetchTodayClasses = async () => {
    await getTimetable({ day: format(new Date(), 'EEEE') })
      .unwrap()
      .then((res) => {
        setTodayClasses(res.data);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  useEffect(() => {
    fetchTodayClasses();
  }, []);

  return (
    <div className="container-fluid">
      {/* Page Header */}
      {classDetails && isRescheduleClassDialogVisible && (
        <RescheduleClassDialog
          isShowModal={isRescheduleClassDialogVisible}
          showModalMethod={toggleRescheduleClassDialog}
          classDetails={classDetails}
          fetchTodayClasses={fetchTodayClasses}
        />
      )}
      <PageHeader
        currentSection="Home"
        pageTitle={`Welcome ${userInfo?.firstName}!`}
        parentSection="Admin"
      />
      {/* /Overview Section */}
      <div className="row">
        <div className="col-12 col-lg-8 col-xl-8 d-flex">
          <div className="card flex-fill comman-shadow">
            <div className="card-header">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                {/* <Typography variant="h3">Upcoming Lessons</Typography> */}
                <h2 className="page-title">Upcoming Lessons</h2>

                {todayClasses.length > 0 && (
                  <Link to={PATH_DASHBOARD.calendar}>View All Lessons</Link>
                )}
              </Stack>
            </div>
            <div className="pt-3 pb-3">
              <div
                className="table-responsive lesson"
                style={{
                  height: '90vh',
                  overflowY: 'auto',
                  overflowX: 'auto',
                }}>
                <table className="table table-center">
                  <tbody>
                    {todayClasses.length > 0 ? (
                      todayClasses?.map((lesson, index) => {
                        const {
                          endTime,
                          group,
                          room,
                          startTime,
                          subject,
                          teacher,
                          timetableEntryId,
                        } = lesson;
                        return (
                          <tr key={timetableEntryId}>
                            <td>
                              <div className="date">
                                <b>{subject}</b>
                                <div>
                                  <b
                                    style={{
                                      fontSize: '12px',
                                    }}>{`${teacher?.firstName} ${teacher?.lastName}`}</b>
                                </div>

                                <ul className="teacher-date-list">
                                  <li
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}>
                                    <MdOutlineGroups size="1.5em" />
                                    <p
                                      style={{
                                        marginLeft: '5px',
                                      }}>{`${group} - ${room}`}</p>
                                  </li>
                                  <li>|</li>
                                  <li>
                                    <i className="fas fa-clock me-2" />
                                    {startTime} - {endTime}
                                  </li>
                                </ul>
                              </div>
                            </td>

                            <td>
                              <div className="lesson-confirm">
                                <Link to="#">Confirmed</Link>
                              </div>

                              {/* <button
                              type="submit"
                              onClick={() => {
                                setClassDetails(lesson);
                                toggleRescheduleClassDialog();
                              }}
                              className="btn btn-info">
                              Reschedule
                            </button> */}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <Box sx={{ mx: 2 }}>
                        <Typography variant="h6">No Lessons</Typography>
                      </Box>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4">
          <div className="card card-chart">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-12">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography fontSize={'1.70em'} fontWeight={700}>
                      Notice
                    </Typography>
                    <Link to={PATH_DASHBOARD.notices}>View All</Link>
                  </Stack>
                </div>
                <div className="col-12">
                  {notices?.data
                    ?.filter((notice) => notice.isActive)
                    .map((item, index) => (
                      <NoticeCard
                        key={item._id}
                        title={item.title}
                        description={item.description}
                        date={item.date}
                        color={noticeColors[index]}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card card-chart">
            <div className="card-header">
              <DateCalendar defaultValue={dayjs(new Date())} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

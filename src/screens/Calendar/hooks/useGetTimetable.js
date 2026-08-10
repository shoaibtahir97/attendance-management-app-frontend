// React
import { useEffect, useState } from 'react';

// Third-Party

// Internal
import useNotification from '../../../hooks/useNotification';
import { useLazyGetTimetableQuery } from '../../../redux/slices/apiSlices/timetableApiSlice';
import { getDayOfWeek, getFormattedDate } from '../../../utils/formatDateTime';
import { useGetAllAttendance } from './useAllAttendance';

export const useGetTimetable = (userInfo) => {
  const [getTimetable, { data, isLoading, error }] = useLazyGetTimetableQuery();
  const { openNotification } = useNotification();
  const {
    allAttendanceError,
    attendanceMap,
    handleFetchAttendance,
    isLoadingAllAttendance,
  } = useGetAllAttendance();
  const [events, setEvents] = useState([]);

  const handleDateSet = (arg) => {
    handleFetchAttendance({
      startDate: getFormattedDate(new Date(arg.start), 'YYYY-MM-DD'),
      endDate: getFormattedDate(new Date(arg.end), 'YYYY-MM-DD'),
    });
  };

  const fetchAllTimeTables = async () => {
    const updatedEvents = [];
    const courseColorMap = {};

    await getTimetable()
      .unwrap()
      .then((res) => {
        res?.data?.forEach((item) => {
          const course = item?.group?.course;
          item?.entries?.forEach((entry) => {
            updatedEvents.push({
              title: `Group: ${item?.group?.name} \n Subject: ${entry?.subject?.name} \n Teacher: ${entry?.teacher?.firstName} ${entry?.teacher?.lastName}`,
              startTime: `${entry?.startTime}:00`,
              endTime: `${entry?.endTime}:00`,
              groupId: item?.group?._id,
              subjectId: entry?.subject?._id,
              allDay: false,
              daysOfWeek: [`${getDayOfWeek(entry?.dayOfWeek?.toLowerCase())}`],
              startRecur: item?.group?.cohortStartDate,
              endRecur: item?.group?.cohortEndDate,
            });
          });
        });
      })
      .catch((err) => {
        console.log('err', err);
        openNotification('error', err?.data?.message ?? err?.error);
      });
    setEvents(updatedEvents);
  };

  useEffect(() => {
    if (userInfo.role === 'admin') {
      fetchAllTimeTables();
    }
  }, []);

  return {
    events,
    isLoading,
    error,
    handleDateSet,
    attendanceMap,
    fetchAllTimeTables,
  };
};

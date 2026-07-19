// React
import { useEffect, useState } from 'react';

// Third-Party
import randomColor from 'randomcolor';

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

    let colorIndex = 0;

    await getTimetable()
      .unwrap()
      .then((res) => {
        res?.data?.forEach((item) => {
          const course = item?.group?.course;
          // Assign color if not already mapped
          if (!courseColorMap[course]) {
            courseColorMap[course] = randomColor({
              luminosity: 'dark',
            });
            colorIndex++;
          }
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
              backgroundColor: courseColorMap[course],
              borderColor: courseColorMap[course],
              textColor: '#fff',
              color: courseColorMap[course],
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

  return { events, isLoading, error, handleDateSet, attendanceMap };
};

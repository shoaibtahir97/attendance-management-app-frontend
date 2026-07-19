import dayjs from 'dayjs';
import { useState } from 'react';
import { useLazyGetAllAttendanceQuery } from '../../../redux/slices/apiSlices/attendanceApiSlice';

export const useGetAllAttendance = () => {
  const [
    getAllAttendance,
    { isLoading: isLoadingAllAttendance, error: allAttendanceError },
  ] = useLazyGetAllAttendanceQuery();
  const [attendanceMap, setAttendanceMap] = useState(null);

  async function handleFetchAttendance(params) {
    console.log('params', params);
    const res = await getAllAttendance(params).unwrap();

    const map = new Map();

    res.data.forEach((a) => {
      map.set(
        `${a.group}_${a.subject}_${dayjs(a.date).format('YYYY-MM-DD')}`,
        true
      );
    });

    setAttendanceMap(map);
  }

  return {
    handleFetchAttendance,
    isLoadingAllAttendance,
    allAttendanceError,
    attendanceMap,
  };
};

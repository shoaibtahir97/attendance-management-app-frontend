import { ATTENDANCE_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markAttendance: builder.mutation({
      query: (payload) => ({
        url: ATTENDANCE_URL,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    getAttendance: builder.query({
      query: (params) => ({
        url: ATTENDANCE_URL,
        params,
        method: 'GET',
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    resetAttendance: builder.mutation({
      query: (attendanceId) => {
        console.log({ attendanceId });
        return {
          url: `${ATTENDANCE_URL}/${attendanceId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useMarkAttendanceMutation,
  useLazyGetAttendanceQuery,
  useResetAttendanceMutation,
} = attendanceApiSlice;

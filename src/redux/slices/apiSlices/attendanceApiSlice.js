import { apiSlice } from './apiSlice';
import { ATTENDANCE_URL } from '../../../constants';

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
  }),
});

export const { useMarkAttendanceMutation, useLazyGetAttendanceQuery } =
  attendanceApiSlice;

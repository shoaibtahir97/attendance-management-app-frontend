import { apiSlice } from './apiSlice';
import { ATTENDANCE_URL } from '../../../constants';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markAttendance: builder.mutation({
      query: (payload) => ({
        url: ATTENDANCE_URL,
        body: payload,
        method: 'POST',
        credentials:'include',
      }),
    }),
  }),
});

export const { useMarkAttendanceMutation } = attendanceApiSlice;

import { apiSlice } from './apiSlice';
import { ATTENDANCE_URL } from '../../constants';
import { markAttendance } from './attendanceSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markAttendance: builder.mutation({
      query: (payload) => ({
        url: ATTENDANCE_URL,
        body: payload,
        method: 'POST',
      }),
    }),
  }),
});

export const { useMarkAttendanceMutation } = attendanceApiSlice;

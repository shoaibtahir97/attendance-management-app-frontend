import { REPORTS_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceReport: builder.query({
      query: (params) => ({
        url: `${REPORTS_URL}/attendance`,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
    }),
  }),
});

export const { useLazyGetAttendanceReportQuery } = reportApiSlice;

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
    getGroupAttendanceReport: builder.query({
      query: (params) => {
        const subjects_ = {};
        params.subjects.forEach((subject, index) => {
          subjects_[`subject[${index}]`] = subject;
        });

        return {
          url: `${REPORTS_URL}/attendance/group`,
          params: { ...params, ...subjects_ },
          credentials: 'include',
        };
      },
      transformResponse: (res) => res?.data,
    }),
    downloadGroupAttendanceReport: builder.query({
      query: (params) => ({
        url: `${REPORTS_URL}/attendance/group/download`,
        params,
        credentials: 'include',
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useLazyGetAttendanceReportQuery,
  useLazyGetGroupAttendanceReportQuery,
  useLazyDownloadGroupAttendanceReportQuery,
} = reportApiSlice;

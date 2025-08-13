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
    getWarningLettersReport: builder.query({
      query: (params) => {
        return {
          url: `${REPORTS_URL}/warningletter`,
          params: { ...params },
          credentials: 'include',
        };
      },
    }),
    downloadWarningLettersReport: builder.query({
      query: (params) => ({
        url: `${REPORTS_URL}/warningletter/download`,
        params,
        credentials: 'include',
        responseHandler: (response) => response.blob(),
      }),
    }),
    downloadGroupAttendanceReportV2: builder.query({
      query: (params) => ({
        url: `${REPORTS_URL}/course`,
        params,
        credentials: 'include',
        responseHandler: (response) => response.blob(),
      }),
    }),
    getCourseGroupsAttendanceReport: builder.query({
      query: (params) => ({
        url: `${REPORTS_URL}/coursegroups`,
        params,
        credentials: 'include',
        responseHandler: (response) => response.blob(),
      }),
    }),
    getCourseSubjectsAttendanceReport: builder.query({
      query: (params) => ({
        url: `${REPORTS_URL}/coursesubjects`,
        params,
        credentials: 'include',
        responseHandler: (response) => response.blob(),
      }),
    }),
    getStudentReport: builder.query({
      query: (params) => ({
        url: `${REPORTS_URL}/student`,
        params,
        credentials: 'include',
        responseHandler: (response) => response.blob(),
      }),
    }),
    getGroupReport: builder.query({
      query: (groupId) => ({
        url: `${REPORTS_URL}/group/${groupId}`,
        credentials: 'include',
        responseHandler: (response) => response.blob(),
      }),
    }),

    getCourseReportV2: builder.query({
      query: (params) => ({
        url: `${REPORTS_URL}/coursegroups/v2`,
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
  useLazyGetWarningLettersReportQuery,
  useLazyDownloadWarningLettersReportQuery,
  useLazyDownloadGroupAttendanceReportV2Query,
  useLazyGetCourseGroupsAttendanceReportQuery,
  useLazyGetCourseSubjectsAttendanceReportQuery,
  useLazyGetCourseReportV2Query,
  useLazyGetStudentReportQuery,
  useLazyGetGroupReportQuery,
} = reportApiSlice;

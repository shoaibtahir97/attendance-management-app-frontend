import { STUDENTS_URL } from '../../constants';
import { apiSlice } from './apiSlice';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: STUDENTS_URL,
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    getStudentDetails: builder.query({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
        keepUnusedDataFor: 5,
      }),
      transformResponse: (res) => res?.data,
    }),
  }),
});

export const { useGetStudentsQuery, useGetStudentDetailsQuery } =
  studentApiSlice;

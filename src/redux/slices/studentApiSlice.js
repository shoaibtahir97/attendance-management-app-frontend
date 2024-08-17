import { STUDENTS_URL } from '../../constants';
import { apiSlice } from './apiSlice';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: STUDENTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetStudentsQuery } = studentApiSlice;

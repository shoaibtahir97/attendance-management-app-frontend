import { STUDENTS_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (params) => ({ 
          url: STUDENTS_URL,
          params,
          credentials:'include'
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    
    }),
    getStudentDetails: builder.query({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
        keepUnusedDataFor: 5,
        credentials:'include'
      }),
      transformResponse: (res) => res?.data,
    }),
    registerStudent: builder.mutation({
      query: (payload) => ({
        url: STUDENTS_URL,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials:'include',
      }),
      invalidatesTags: ['Student'],
    }),
    updateStudentDetails: builder.mutation({
      query: (payload) => ({
        url: `${STUDENTS_URL}/${payload.id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials:'include'
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useLazyGetStudentsQuery,
  useGetStudentDetailsQuery,
  useRegisterStudentMutation,
  useUpdateStudentDetailsMutation,
} = studentApiSlice;

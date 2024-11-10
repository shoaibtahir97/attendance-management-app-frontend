import { STUDENTS_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (params) => ({
        url: STUDENTS_URL,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    getStudentDetails: builder.query({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
        keepUnusedDataFor: 5,
        credentials: 'include',
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
        credentials: 'include',
      }),
      invalidatesTags: ['Student'],
    }),
    uploadBulkStudents: builder.mutation({
      query: (file) => {
        const body = new FormData();
        body.append('Content-Type', file.type);
        body.append('registerBulkStudents', file);
        return {
          url: `${STUDENTS_URL}/upload`,
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
    }),
    updateStudentDetails: builder.mutation({
      query: (payload) => ({
        url: `${STUDENTS_URL}/${payload._id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials: 'include',
      }),
      invalidatesTags: ['Student'],
    }),
    getStudentsList: builder.query({
      query: (params) => ({
        url: `${STUDENTS_URL}/list`,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    deleteStudents: builder.mutation({
      query: (payload) => ({
        url: `${STUDENTS_URL}`,
        method: 'DELETE',
        body: payload,
        credentials: 'include',
      }),
    }),
    toggleStudentStatus: builder.mutation({
      query: (payload) => ({
        url: `${STUDENTS_URL}/${payload.id}`,
        method: 'PATCH',
        body: payload,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useLazyGetStudentsQuery,
  useGetStudentDetailsQuery,
  useRegisterStudentMutation,
  useUploadBulkStudentsMutation,
  useUpdateStudentDetailsMutation,
  useGetStudentsListQuery,
  useDeleteStudentsMutation,
  useToggleStudentStatusMutation,
} = studentApiSlice;

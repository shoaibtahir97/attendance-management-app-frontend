import { COURSES_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (params) => ({
        url: COURSES_URL,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    createCourse: builder.mutation({
      query: (payload) => ({
        url: COURSES_URL,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    // getStudentDetails: builder.query({
    //   query: (studentId) => ({
    //     url: `${COURSES_URL}/${studentId}`,
    //     keepUnusedDataFor: 5,
    //     credentials:'include'
    //   }),
    //   transformResponse: (res) => res?.data,
    // }),
    // registerStudent: builder.mutation({
    //   query: (payload) => ({
    //     url: STUDENTS_URL,
    //     method: 'POST',
    //     body: payload,
    //     headers: {
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     transformResponse: (res) => res?.data,
    //     credentials:'include',
    //   }),
    //   invalidatesTags: ['Student'],
    // }),
    // updateStudentDetails: builder.mutation({
    //   query: (payload) => ({
    //     url: `${STUDENTS_URL}/${payload.id}`,
    //     method: 'PUT',
    //     body: payload,
    //     header: {
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     transformResponse: (res) => res?.data,
    //     credentials:'include'
    //   }),
    //   invalidatesTags: ['Student'],
    // }),
  }),
});

export const {
  //   useGetStudentsQuery,
  useLazyGetCoursesQuery,
  useCreateCourseMutation,
  //   useGetStudentDetailsQuery,
  //   useRegisterStudentMutation,
  //   useUpdateStudentDetailsMutation,
} = courseApiSlice;

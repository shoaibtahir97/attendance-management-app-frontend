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
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
        keepUnusedDataFor: 5,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
    }),
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
    updateCourseDetails: builder.mutation({
      query: (payload) => ({
        url: `${COURSES_URL}/${payload._id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials: 'include',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  //   useGetStudentsQuery,
  useLazyGetCoursesQuery,
  useCreateCourseMutation,
  useGetCourseDetailsQuery,
  //   useRegisterStudentMutation,
  useUpdateCourseDetailsMutation,
} = courseApiSlice;

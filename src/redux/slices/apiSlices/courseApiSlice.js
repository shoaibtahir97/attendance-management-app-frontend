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
    getCoursesList: builder.query({
      query: () => ({
        url: `${COURSES_URL}/list`,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
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
  useLazyGetCoursesQuery,
  useCreateCourseMutation,
  useGetCourseDetailsQuery,
  useGetCoursesListQuery,
  useUpdateCourseDetailsMutation,
} = courseApiSlice;

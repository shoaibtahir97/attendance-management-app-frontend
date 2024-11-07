import { TIMETABLE_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const timetableApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadTimetable: builder.mutation({
      query: (payload) => {
        const body = new FormData();
        body.append('timetable', payload.timetableFile);

        return {
          url: `${TIMETABLE_URL}/upload`,
          body,
          method: 'POST',
          credentials: 'include',
        };
      },
    }),
    getTimetable: builder.query({
      query: (payload) => ({
        url: TIMETABLE_URL,
        params: payload,
        credentials: 'include',
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Timetable'],
    }),
    getTeacherTimeTable: builder.query({
      query: () => ({
        url: `${TIMETABLE_URL}/teacher`,
        credentials: 'include',
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Timetable'],
    }),
    assignCoverTeacher: builder.mutation({
      query: (payload) => ({
        url: `${TIMETABLE_URL}/coverteacher`,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useUploadTimetableMutation,
  useLazyGetTimetableQuery,
  useGetTimetableQuery,
  useLazyGetTeacherTimeTableQuery,
  useAssignCoverTeacherMutation,
} = timetableApiSlice;

import { apiSlice } from './apiSlice';
import { TIMETABLE_URL } from '../../../constants';

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
      query: () => ({
        url: TIMETABLE_URL,
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
  }),
});

export const {
  useUploadTimetableMutation,
  useLazyGetTimetableQuery,
  useLazyGetTeacherTimeTableQuery,
} = timetableApiSlice;

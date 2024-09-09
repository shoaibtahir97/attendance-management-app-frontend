import { SUBJECTS_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjectsList: builder.query({
      query: (params) => ({
        url: `${SUBJECTS_URL}/list`,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    getSubjects: builder.query({
      query: (params) => ({
        url: SUBJECTS_URL,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    addSubject: builder.mutation({
      query: (payload) => ({
        url: SUBJECTS_URL,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials: 'include',
      }),
      invalidatesTags: ['Subject'],
    }),
    getSubjectDetails: builder.query({
      query: (subjectId) => ({
        url: `${SUBJECTS_URL}/${subjectId}`,
        keepUnusedDataFor: 5,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
    }),
    updateSubjectDetails: builder.mutation({
      query: (payload) => ({
        url: `${SUBJECTS_URL}/${payload._id}`,
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
  }),
});

export const {
  useGetSubjectsListQuery,
  useLazyGetSubjectsQuery,
  useAddSubjectMutation,
  useGetSubjectDetailsQuery,
  useUpdateSubjectDetailsMutation,
} = subjectApiSlice;

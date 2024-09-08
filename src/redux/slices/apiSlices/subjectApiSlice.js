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
  }),
});

export const { useGetSubjectsListQuery } = subjectApiSlice;

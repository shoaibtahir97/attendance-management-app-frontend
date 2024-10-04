import { ADMISSIONS_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

const admissionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postAdmissionForm: builder.mutation({
      query: (payload) => ({
        url: ADMISSIONS_URL,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { usePostAdmissionFormMutation } = admissionsApiSlice;

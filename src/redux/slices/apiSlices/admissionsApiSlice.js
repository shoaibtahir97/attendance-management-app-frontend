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
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const { usePostAdmissionFormMutation } = admissionsApiSlice;

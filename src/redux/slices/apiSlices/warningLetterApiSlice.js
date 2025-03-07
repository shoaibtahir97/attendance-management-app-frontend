import { WARNING_LETTER_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

const warningLetterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    issueWarningLetter: builder.mutation({
      query: (payload) => ({
        url: WARNING_LETTER_URL,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    issueWarningLetters: builder.mutation({
      query: (payload) => ({
        url: WARNING_LETTER_URL,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useIssueWarningLetterMutation, useIssueWarningLettersMutation } =
  warningLetterApiSlice;

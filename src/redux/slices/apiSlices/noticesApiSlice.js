import { NOTICES_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

const noticesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getNotices: builder.query({
    //   query: () => ({
    //     url: `${NOTICES_URL}`,
    //     credentials: 'include',
    //   }),
    // }),
    publishNotice: builder.mutations({
      query: (payload) => ({
        url: `${NOTICES_URL}`,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { usePublishNoticeMutation } = noticesApiSlice;

import { NOTICES_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

const noticesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: () => ({
        url: `${NOTICES_URL}`,
        credentials: 'include',
      }),
    }),
    createNotice: builder.mutation({
      query: (payload) => ({
        url: `${NOTICES_URL}`,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    updateNotice: builder.mutation({
      query: (payload) => {
        const { id, ...data } = payload;
        return {
          url: `${NOTICES_URL}/${id}`,
          body: data,
          method: 'PUT',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useCreateNoticeMutation,
  useGetNoticesQuery,
  useLazyGetNoticesQuery,
  useUpdateNoticeMutation,
} = noticesApiSlice;

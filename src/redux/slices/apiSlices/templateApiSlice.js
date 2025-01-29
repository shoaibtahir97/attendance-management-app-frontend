import { TEMPLATES_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

const templateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: (params) => ({
        url: TEMPLATES_URL,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    addTemplate: builder.mutation({
      query: (payload) => ({
        url: TEMPLATES_URL,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials: 'include',
      }),
      invalidatesTags: ['Template'],
    }),
  }),
});

export const { useLazyGetTemplatesQuery, useAddTemplateMutation } =
  templateApiSlice;

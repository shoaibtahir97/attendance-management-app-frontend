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
    getTemplateDetails: builder.query({
      query: (templateId) => ({
        url: `${TEMPLATES_URL}/${templateId}`,
        keepUnusedDataFor: 5,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
    }),

    updateTemplateDetails: builder.mutation({
      query: (payload) => ({
        url: `${TEMPLATES_URL}/${payload._id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials: 'include',
      }),
      invalidatesTags: ['Template'],
    }),

    deleteTemplate: builder.mutation({
      query: (templateId) => ({
        url: `${TEMPLATES_URL}/${templateId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useLazyGetTemplatesQuery,
  useAddTemplateMutation,
  useGetTemplateDetailsQuery,
  useDeleteTemplateMutation,
  useUpdateTemplateDetailsMutation,
} = templateApiSlice;

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
    getTemplateList: builder.query({
      query: (params) => ({
        url: `${TEMPLATES_URL}/list`,
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
    getTemplateVariables: builder.query({
      query: (params) => {
        return {
          url: `${TEMPLATES_URL}/variables`,
          params,
          keepUnusedDataFor: 5,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useLazyGetTemplatesQuery,
  useGetTemplateListQuery,
  useAddTemplateMutation,
  useGetTemplateDetailsQuery,
  useDeleteTemplateMutation,
  useUpdateTemplateDetailsMutation,
  useLazyGetTemplateVariablesQuery,
} = templateApiSlice;

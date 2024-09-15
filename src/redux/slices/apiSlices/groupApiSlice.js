import { GROUPS_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const groupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: (params) => ({
        url: GROUPS_URL,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    getGroupsList: builder.query({
      query: () => ({
        url: `${GROUPS_URL}/list`,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    createGroup: builder.mutation({
      query: (payload) => ({
        url: GROUPS_URL,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    getGroupDetails: builder.query({
      query: (groupId) => ({
        url: `${GROUPS_URL}/${groupId}`,
        keepUnusedDataFor: 5,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
    }),
    updateGroupDetails: builder.mutation({
      query: (payload) => ({
        url: `${GROUPS_URL}/${payload._id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials: 'include',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useLazyGetGroupsQuery,
  useGetGroupsListQuery,
  useCreateGroupMutation,
  useGetGroupDetailsQuery,
  useUpdateGroupDetailsMutation,
  // useLazyGetSubjectsListQuery,
  // useGetStudentDetailsQuery,
  // useRegisterStudentMutation,
  // useUpdateStudentDetailsMutation,
} = groupApiSlice;

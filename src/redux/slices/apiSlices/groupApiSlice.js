import { GROUPS_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const groupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroupsList: builder.query({
      query: () => ({
        url: `${GROUPS_URL}/list`,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetGroupsListQuery,
  //   useLazyGetSubjectsListQuery,
  //   useGetStudentDetailsQuery,
  //   useRegisterStudentMutation,
  //   useUpdateStudentDetailsMutation,
} = groupApiSlice;

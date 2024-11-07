import { USERS_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    getUsers: builder.query({
      query: (params) => ({
        url: USERS_URL,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    getUsersList: builder.query({
      query: (params) => ({
        url: `${USERS_URL}/list`,
        params,
        credentials: 'include',
      }),
      transformResponse: (res) => res?.data,
      keepUnusedDataFor: 5,
    }),
    getUsersDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        credentials: 'include',
        keepUnusedDataFor: 5,
      }),
      transformResponse: (res) => res?.data,
    }),
    updateUserDetails: builder.mutation({
      query: (payload) => ({
        url: `${USERS_URL}/${payload._id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
    uploadBulkUsers: builder.mutation({
      query: (file) => {
        const body = new FormData();
        body.append('Content-Type', file.type);
        body.append('registerBulkUsers', file);
        return {
          url: `${USERS_URL}/upload`,
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
    }),
    resetPasswordRequest: builder.mutation({
      query: (payload) => ({
        url: `${USERS_URL}/request-password-reset`,
        method: 'POST',
        body: payload,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useAuthUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLazyGetUsersQuery,
  useGetUsersListQuery,
  useGetUsersDetailsQuery,
  useUpdateUserDetailsMutation,
  useUploadBulkUsersMutation,
  useResetPasswordRequestMutation,
} = usersApiSlice;

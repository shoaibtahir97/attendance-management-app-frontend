import { USERS_URL } from '../../constants';
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
  }),
});

export const {
  useAuthUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = usersApiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../constants';
import { logout } from '../authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'Student',
    'Teacher',
    'Admin',
    'Attendance',
    'Course',
    'Group',
    'Subject',
  ],
  endpoints: (builder) => ({}),
});

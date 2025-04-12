import { NOTES_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (payload) => {
        const body = new FormData();

        for (const [key, value] of Object.entries(payload)) {
          if (key === 'noteAttachment') {
            body.append(key, value, value?.name);
          } else {
            body.append(key, value);
          }
        }

        return {
          url: NOTES_URL,
          body,
          method: 'POST',
          credentials: 'include',
        };
      },
    }),
    updateNote: builder.mutation({
      query: (payload) => {
        console.log('payload', payload);
        const body = new FormData();

        for (const [key, value] of Object.entries(payload)) {
          if (key === 'noteAttachment') {
            body.append(key, value, value?.name);
          } else {
            body.append(key, value);
          }
        }
        console.log('body', body);

        return {
          url: `${NOTES_URL}/${payload._id}`,
          method: 'PUT',
          body,
          transformResponse: (res) => res?.data,
          credentials: 'include',
        };
      },
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation({
      query: (params) => ({
        url: `${NOTES_URL}`,
        params,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

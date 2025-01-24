import { NOTES_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (payload) => ({
        url: NOTES_URL,
        body: payload,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    updateNote: builder.mutation({
      query: (payload) => ({
        url: `${NOTES_URL}/${payload._id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformResponse: (res) => res?.data,
        credentials: 'include',
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `${NOTES_URL}/${noteId}`,
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

import { MAIL_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const mailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMail: builder.mutation({
      query: (payload) => {
        const body = new FormData();

        for (const [key, value] of Object.entries(payload)) {
          if (key === 'recipients') {
            value.forEach((recipient, index) => {
              body.append(`recipients[${index}]`, recipient);
            });
          } else if (key === 'attachment') {
            body.append(key, value, value?.name);
          } else {
            body.append(key, value);
          }
        }

        return {
          url: MAIL_URL,
          body: body,
          method: 'POST',
          credentials: 'include',
        };
      },
    }),
    sendDynamicMail: builder.mutation({}),
  }),
});

export const { useSendMailMutation } = mailApiSlice;

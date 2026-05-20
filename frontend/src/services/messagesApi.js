import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authorization.currentUser.token

      headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
  }),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addNewMessage: builder.mutation({
      query: newMessage => ({
        url: '',
        method: 'POST',
        body: newMessage,
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useAddNewMessageMutation,
} = messagesApi

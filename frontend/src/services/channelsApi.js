import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authorization.currentUser.token; 

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addNewChannel: builder.mutation({
      query: (newChannel) => ({
        url: '',
        method: 'POST',
        body: newChannel,
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ channelId, editedChannel }) => ({
        url: `/${channelId}`,
        method: 'PATCH',
        body: editedChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        url: `/${channelId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddNewChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;

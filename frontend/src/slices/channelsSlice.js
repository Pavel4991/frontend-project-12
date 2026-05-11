import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChannelId: '1',
  activeChannelName: 'general',
  channels: [],
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      const currentChannelsIds = state.channels.map(({ id }) => id)
      const newChannels = action.payload.filter(({ id }) => !currentChannelsIds.includes(id))
      state.channels = [...state.channels, ...newChannels]
    },
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload.id
      state.activeChannelName = action.payload.name
    },
  },
})

export const { addChannels, setActiveChannel } = channelsSlice.actions

export default channelsSlice.reducer
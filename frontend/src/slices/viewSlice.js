import { createSlice } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice'
import { addNewChannel } from './channelsSlice'

const initialState = {
  activeChannelId: '1',
  activeChannelName: 'general',
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload.id
      state.activeChannelName = action.payload.name
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      state.activeChannelId = '1'
      state.activeChannelName = 'general'
    })
    .addCase(addNewChannel, (state, action) => {
      state.activeChannelId = action.payload.id
      state.activeChannelName = action.payload.name
    })
  },
})

export const { setActiveChannel } = viewSlice.actions

export default viewSlice.reducer
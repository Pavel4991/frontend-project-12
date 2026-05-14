import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState()

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addNewChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
})

export const { addChannels, addNewChannel, renameChannel, removeChannel } = channelsSlice.actions

export default channelsSlice.reducer

export const selectors = channelsAdapter.getSelectors(state => state.channels)
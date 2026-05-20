import { createSlice } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice'
import { addNewChannel } from './channelsSlice'

const initialState = {
  activeChannel: { id: '1', name: 'general'}
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state) => {
      state.activeChannel = { id: '1', name: 'general'}
    })
    .addCase(addNewChannel, (state, action) => {
      state.activeChannel = action.payload
    })
  },
})

export const { setActiveChannel } = viewSlice.actions

export default viewSlice.reducer
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
      console.log(action.payload)
      state.activeChannel = action.payload
    },
  },
})

export const { setActiveChannel } = viewSlice.actions

export default viewSlice.reducer
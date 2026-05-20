import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChannel: { id: '1', name: 'general' },
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

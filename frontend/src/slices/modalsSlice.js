import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeModal: { type: null, channel: null },
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.activeModal = action.payload
    },
    removeModal: (state) => {
      state.activeModal = { type: null, channel: null }
    },
  },
})

export const { setModal, removeModal } = modalsSlice.actions

export default modalsSlice.reducer

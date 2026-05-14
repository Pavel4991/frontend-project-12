import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeModal: { type: null, item: null },
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.activeModal = action.payload
    },
    removeModal: (state) => {
      state.activeModal = { type: null, item: null}
    },
  },
})

export const { setModal, removeModal } = modalsSlice.actions

export default modalsSlice.reducer

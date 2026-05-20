import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authStatus: false,
  currentUser: {}
}

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.currentUser = action.payload
      state.authStatus = true
    },
    logOut: (state) => {
      state.currentUser = {}
      state.authStatus = false
    },
  },
})

export const { logIn, logOut} = authorizationSlice.actions

export default authorizationSlice.reducer
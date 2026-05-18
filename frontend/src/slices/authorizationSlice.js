import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  authStatus: false,
  currentUser: {}
}

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload
      state.authStatus = true
    },
    logout: (state) => {
      state.authStatus = false
    },
  },
})

export const { login, logout} = authorizationSlice.actions

export default authorizationSlice.reducer
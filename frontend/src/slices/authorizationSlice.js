import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authStatus: false,  
}

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true
    },
    logout: (state) => {
      state.authStatus = ''
    },
  },
})

export const { login, logout} = authorizationSlice.actions

export default authorizationSlice.reducer
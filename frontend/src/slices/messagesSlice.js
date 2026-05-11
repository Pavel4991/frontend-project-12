import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      console.log('hi')
      const currentMessagesIds = state.messages.map(({ id }) => id)
      const newMessages = action.payload.filter(({ id }) => !currentMessagesIds.includes(id))
      state.messages = [...state.messages, ...newMessages]
    },
    addNewMessage: (state, action) => {
      console.log("hi Jack")
      const currentMessagesIds = state.messages.map(({ id }) => id)
      state.messages = !currentMessagesIds.includes(action.payload.id) ? [...state.messages, action.payload] : state.messages
    },
  },
})

export const { addMessages, addNewMessage } = messagesSlice.actions

export default messagesSlice.reducer


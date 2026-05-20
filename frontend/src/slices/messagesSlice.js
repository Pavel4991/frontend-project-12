import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice'

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addNewMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload.id
      const restEntities = Object.values(state.entities).filter(e => e.channelId !== channelId)
      messagesAdapter.setAll(state, restEntities)
    })
  },
})

export const { addMessages, addNewMessage } = messagesSlice.actions

export default messagesSlice.reducer

export const selectors = messagesAdapter.getSelectors(state => state.messages)

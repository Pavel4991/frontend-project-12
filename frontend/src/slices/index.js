import { configureStore } from '@reduxjs/toolkit'
import authorizationReducer from './authorizationSlice.js'
import channelsReducer from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'
import modalsReducer from './modalsSlice.js'
import viewReducer from './viewSlice.js'

export default configureStore({
  reducer: {
    authorization: authorizationReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    view: viewReducer,
  },
})
import { configureStore } from '@reduxjs/toolkit'
import authorizationReducer from './authorizationSlice.js'
import channelsReducer from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'
import modalsReducer from './modalsSlice.js'
import viewReducer from './viewSlice.js'
import { channelsApi } from '../services/channelsApi.js'
import { messagesApi } from '../services/messagesApi.js'
import { authApi } from '../services/authApi.js'

export default configureStore({
  reducer: {
    authorization: authorizationReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    view: viewReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware)
      .concat(authApi.middleware),
})

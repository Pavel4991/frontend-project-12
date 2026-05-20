import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import resources from './locales/index.js'
import { io } from "socket.io-client"
import { Provider } from 'react-redux'
import { addNewMessage } from "./slices/messagesSlice.js"
import { addNewChannel } from "./slices/channelsSlice.js"
import { renameChannel } from "./slices/channelsSlice.js"
import { removeChannel } from "./slices/channelsSlice.js"
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import filter from 'leo-profanity'

const initApp = async (App, store) => {
  const i18n = i18next.createInstance()

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    })

  // filter.loadDictionary('ru')

  const socket = io()

  socket.on('newMessage', (payload) => {
    store.dispatch(addNewMessage(payload))
  })

  socket.on('newChannel', (payload) => {
    store.dispatch(addNewChannel(payload))
  })

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel({ id: payload.id, changes: { name: payload.name } }))
  })

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id))
  })

  const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN, // or VITE_ROLLBAR_ACCESS_TOKEN
  environment: import.meta.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary
        fallbackUI={() => (
          <div style={{ padding: '20px', color: 'red' }}>
            <h2>Oops, something went wrong.</h2>
            <p>We've been notified and are looking into it.</p>
          </div>
        )}
      >
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

export default initApp
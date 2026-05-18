import { io } from "socket.io-client"
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next'
import resources from './locales/index.js'
import { useDispatch } from "react-redux";
import { addNewMessage } from "./slices/messagesSlice.js";
import { Provider } from 'react-redux'
import store from './slices/index.js'

const initApp = async (App) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    })

  const socket = io()

  socket.on('newMessage', (payload) => {
    console.log(payload)
    // dispatch(addNewMessage(payload))
  })

  socket.on('newChannel', (payload) => {
    console.log(payload)
    // dispatch(addNewChannel(payload))
  })

  socket.on('renameChannel', (payload) => {
    console.log(payload)
    // dispatch(renameChannel({ id: payload.id, changes: { name: payload.name } }))
  })

  socket.on('removeChannel', (payload) => {
    console.log(payload)
    // dispatch(removeChannel(payload.id))
  })

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  )
}

export default initApp
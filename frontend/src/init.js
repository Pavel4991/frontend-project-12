import { io } from "socket.io-client"
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './locales/index.js'

const initApp = (app) => {
  i18next	
    .use(initReactI18next) 
    .init({
      resources,
      fallbackLng: 'ru', 
      interpolation: {
        escapeValue: false,
      },
    })

  const socket = io("http://localhost:5001", {
    transports: ["websocket"]
  })

  socket.on('newMessage', (payload) => {
    dispatch(addNewMessage(payload))
  })

  socket.on('newChannel', (payload) => {
    dispatch(addNewChannel(payload))
  })

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel({ id: payload.id, changes: { name: payload.name } }))
  })

  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload.id))
  })
}
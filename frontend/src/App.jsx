import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewMessage } from './slices/messagesSlice'
import { addNewChannel } from './slices/channelsSlice'
import { removeChannel } from './slices/channelsSlice'
import { renameChannel } from './slices/channelsSlice'
import { login } from './slices/authorizationSlice'
import { RequireAuth } from './hoc/RequireAuth'
import { io } from "socket.io-client"
import { Layout} from './pages/Layout'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Homepage } from './pages/Homepage'
import { NotFound } from './pages/Notfound'

function App() {
  const dispatch = useDispatch()
  const isAuth = localStorage.getItem('user')

  // const socket = io("http://localhost:5001", {
  //   transports: ["websocket"]
  // })

  // socket.on('newMessage', (payload) => {
  //   dispatch(addNewMessage(payload))
  // })

  // socket.on('newChannel', (payload) => {
  //   dispatch(addNewChannel(payload))
  // })

  // socket.on('renameChannel', (payload) => {
  //   dispatch(renameChannel({ id: payload.id, changes: { name: payload.name } }))
  // })

  // socket.on('removeChannel', (payload) => {
  //   dispatch(removeChannel(payload.id))
  // })

  if (isAuth) {
    const user = JSON.parse(isAuth)
    dispatch(login(user))
  }  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={
            <RequireAuth>
              <Homepage />
            </RequireAuth>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />}/>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
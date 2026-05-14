import { Homepage } from './pages/Homepage'
import { NotFound } from './pages/Notfound'
import { Login } from './pages/Login'
import { Layout} from './pages/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from './slices/authorizationSlice'
import { RequireAuth } from './hoc/RequireAuth'
import { io } from "socket.io-client"
import { addNewMessage } from './slices/messagesSlice'
import { addNewChannel } from './slices/channelsSlice'
import { removeChannel } from './slices/channelsSlice'
import { renameChannel } from './slices/channelsSlice'


function App() {
  const dispatch = useDispatch()
  const user = localStorage.getItem('user') ?? ''

  const socket = io("http://localhost:5001", {
    transports: ["websocket"]
  })

  socket.on('newMessage', (payload) => {
    dispatch(addNewMessage(payload))
  });

  socket.on('newChannel', (payload) => {
    dispatch(addNewChannel(payload))
  });

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel({ id: payload.id, changes: { name: payload.name } }))
  });

  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload.id))
  });

  if (user) {
    dispatch(login())
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
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
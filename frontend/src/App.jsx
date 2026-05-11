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


function App() {
  const dispatch = useDispatch()
  const user = localStorage.getItem('user') ?? ''

  const socket = io("http://localhost:5001", {
    transports: ["websocket"], // Помогает избежать проблем с polling
  })

  socket.on('newMessage', (payload) => {
    console.log('hi from messages')
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    dispatch(addNewMessage(payload))
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
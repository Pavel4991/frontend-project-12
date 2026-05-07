import { Homepage } from './pages/Homepage'
import { NotFound } from './pages/Notfound'
import { Login } from './pages/Login'
import { Layout} from './pages/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from './slices/authorizationSlice'
import { RequireAuth } from './hoc/RequireAuth'


function App() {
  const dispatch = useDispatch()
  const user = localStorage.getItem('user') ?? ''

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
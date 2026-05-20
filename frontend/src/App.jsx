import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logIn } from './slices/authorizationSlice'
import { RequireAuth } from './hoc/RequireAuth'
import { Homepage } from './pages/Homepage'
import { NotFound } from './pages/Notfound'
import { Signup } from './pages/Signup'
import { Layout } from './pages/Layout'
import { Login } from './pages/Login'

function App() {
  const dispatch = useDispatch()
  const isAuth = localStorage.getItem('user')

  if (isAuth) {
    const user = JSON.parse(isAuth)
    dispatch(logIn(user))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={
            <RequireAuth>
              <Homepage />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

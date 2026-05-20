import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ children }) => {
  const authStatus = useSelector(state => state.authorization.authStatus)

  if (!authStatus) {
    return <Navigate to="/login" />
  }

  return children
}

export { RequireAuth }

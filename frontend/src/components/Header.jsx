import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut } from "../slices/authorizationSlice"
import { useTranslation } from 'react-i18next'


const Header = () => {
  const { t } = useTranslation()
  const authStatus = useSelector(state => state.authorization.authStatus)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const logout = () => {
    navigate('/login')
    localStorage.clear()
    dispatch(logOut())
  }


  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {authStatus && <button type="button" className="btn btn-primary" onClick={logout}>{t('ui.homePage.logout')}</button>}
      </div>
    </nav>
  )
}

export { Header }
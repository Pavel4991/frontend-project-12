import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../slices/authorizationSlice"
import { useTranslation } from 'react-i18next'


const Header = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.authorization.authStatus)

  const logOut = () => {
    navigate('/login')
    localStorage.clear()
    dispatch(logout())
  }


  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {authStatus && <button type="button" className="btn btn-primary" onClick={logOut}>{t('ui.homePage.logout')}</button>}
      </div>
    </nav>
  )
}

export { Header }
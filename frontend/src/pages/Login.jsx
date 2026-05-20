import { Formik, Form, Field } from 'formik'
import { logIn } from '../slices/authorizationSlice'
import { useDispatch } from "react-redux"
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import loginAvatar from  '../assets/avatar-DIE1AEpS.jpg'
import { useLoginMutation } from '../services/authApi'
import { toast } from 'react-toastify'



export const Login = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [login, { isLoading }] = useLoginMutation()

  return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={loginAvatar} className="rounded-circle" alt={t('ui.loginPage.title')} />
                </div>
                <Formik
                  initialValues={{ username: "", password: "" }}
                  onSubmit={async (values) => {
                    try {
                      const data = await login({ username: values.username, password: values.password }).unwrap()
                      localStorage.setItem('user', JSON.stringify(data))
                      dispatch(logIn(data))
                      navigate('/')
                    } catch(e) {
                      if (e.status === 'FETCH_ERROR') {
                        toast.error(t(('ui.toast.disconnect')))
                        return
                      }
                      if (e.status === 401) {
                        setServerError('noUserError')
                        return
                      }  else {
                        setServerError('loginError')
                      }
                    }
                  }}
                >
                  {() => (
                    <Form className='col-12 col-md-6 mt-3 mt-md-0'>
                      <h1 className="text-center mb-4">{t('ui.loginPage.title')}</h1>
                      <div className="form-floating mb-3">
                        <Field
                          id="username"
                          type="text"
                          name="username"
                          className={serverError ? "form-control is-invalid" : "form-control"}
                          placeholder={t('ui.loginPage.nameField')}
                          autoComplete="username"
                          required
                        />
                        <label htmlFor="username" className='form-label'>{t('ui.loginPage.nameField')}</label>
                      </div>
                      <div className="form-floating mb-4">
                        <Field
                          id="password"
                          type="password"
                          name="password"
                          className={serverError ? "form-control is-invalid" : "form-control"}
                          autoComplete="current-password"
                          placeholder={t('ui.loginPage.passwordField')}
                          required
                        />
                        <label htmlFor="password" className="form-label">{t('ui.loginPage.passwordField')}</label>
                        {serverError && <div className="invalid-tooltip">{t(`ui.loginPage.${serverError}`)}</div>}
                      </div>
                      <button 
                        type="submit" 
                        className="w-100 mb-3 btn btn-outline-primary"
                        disabled={isLoading}
                      >
                        {t('ui.loginPage.title')}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span> 
                  <Link to="/signup">Регистрация</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
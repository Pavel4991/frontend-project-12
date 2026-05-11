import { Formik, Form, Field } from 'formik'
import { login } from '../slices/authorizationSlice'
import { useDispatch } from "react-redux"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { authorization } from '../api/index'



export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="./public/avatar-DIE1AEpS.jpg" className="rounded-circle" alt="Войти" />
                </div>
                <Formik
                  initialValues={{ username: "", password: "" }}
                  onSubmit={async (values,{ setSubmitting }) => {
                    try {
                      await authorization(values.username, values.password)
                        .then(response => {
                          const data = response.data
                          localStorage.setItem('user', JSON.stringify(data))
                          dispatch(login())
                          navigate('/')
                        })
                    } catch(e) {
                      setError(e.status)
                    }
                    
                    setSubmitting(false);
                  }}
                >
                  {() => (
                    <Form className='col-12 col-md-6 mt-3 mt-md-0'>
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3">
                        <Field
                          id="username"
                          type="text"
                          name="username"
                          className={error ? "form-control is-invalid" : "form-control"}
                          placeholder="Ваш ник"
                          autoComplete="username"
                          required=""
                        />
                        <label htmlFor="username" className='form-label'>Ваш ник</label>
                      </div>
                      <div className="form-floating mb-4">
                        <Field
                          id="password"
                          type="password"
                          name="password"
                          className={error ? "form-control is-invalid" : "form-control"}
                          autoComplete="current-password"
                          placeholder="Пароль"
                          required=""
                        />
                        <label htmlFor="password" className="form-label">Пароль</label>
                        {error && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>}
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span> 
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
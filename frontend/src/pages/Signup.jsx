import { Formik, Form, Field } from 'formik'
import { login } from '../slices/authorizationSlice'
import { useDispatch } from "react-redux"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { createNewUser } from '../api/index'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import signupAvatar from '../assets/avatar_1-D7Cot-zE.jpg'


export const Signup = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Минимум 3 буквы')
      .max(20, 'Максимум 20 букв')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Минимум 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать').required('Обязательное поле'),
  })


  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupAvatar} className="rounded-circle" alt="Регистрация" />
              </div>
              <Formik
                initialValues={{ username: '', password: '', confirmPassword: ''}}
                validationSchema={SignupSchema}
                onSubmit={async (values,{ setSubmitting }) => {
                   try {
                    await createNewUser(values.username, values.password)
                      .then(response => {
                        const data = response.data
                        localStorage.setItem('user', JSON.stringify(data))
                        dispatch(login(response.data))
                        navigate('/')
                      })
                  } catch(e) {
                    setError('Неверные имя пользователя или пароль')
                  }
                  
                  setSubmitting(false)
                }}
              >
                {({ errors, touched }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">{t('ui.signupPage.title')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        placeholder="От 3 до 20 символов"
                        name="username"
                        autoComplete="username"
                        required=""
                        id="username"
                        className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`}
                      />
                      <label className="form-label" htmlFor="username">{t('ui.signupPage.nameField')}</label>
                      <div className="invalid-tooltip">{errors.username}</div>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        placeholder="Не менее 6 символов"
                        name="password"
                        aria-describedby="passwordHelpBlock"
                        required=""
                        autoComplete="new-password"
                        type="password"
                        id="password"
                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                      />
                      <label className="form-label" htmlFor="password">{t('ui.signupPage.passwordField')}</label>
                      <div className="invalid-tooltip">{errors.password}</div>
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        placeholder="Пароли должны совпадать"
                        name="confirmPassword"
                        required=""
                        autoComplete="new-password"
                        type="password"
                        id="confirmPassword"
                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""}`}
                      />
                      <label className="form-label" htmlFor="confirmPassword">{t('ui.signupPage.confirmPasswordField')}</label>
                      <div className="invalid-tooltip">{errors.confirmPassword}</div>
                    </div>
                    <button type="submit" className="w-100 btn btn-outline-primary">{t('ui.signupPage.submitButton')}</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



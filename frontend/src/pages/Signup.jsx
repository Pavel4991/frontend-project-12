import { Formik, Form, Field } from 'formik'
import { logIn } from '../slices/authorizationSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import signupAvatar from '../assets/avatar_1-D7Cot-zE.jpg'
import { useSignupMutation } from '../services/authApi'
import { toast } from 'react-toastify'

export const Signup = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [signup, { isLoading }] = useSignupMutation()

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'shortOrLongError')
      .max(20, 'shortOrLongError')
      .required('requiredError'),
    password: Yup.string()
      .min(6, 'passwordMinError')
      .required('requiredError'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwordMatchError').required('requiredError'),
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
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                  try {
                    const data = await signup({ username: values.username, password: values.password }).unwrap()

                    localStorage.setItem('user', JSON.stringify(data))
                    dispatch(logIn(data))
                    navigate('/')
                  }
                  catch (e) {
                    if (e.status === 'FETCH_ERROR') {
                      toast.error(t(('ui.toast.disconnect')))
                      return
                    }
                    if (e.status === 409) {
                      setServerError('duplicateUserError')
                    }
                    else {
                      setServerError('registrationError')
                    }
                  }
                }}
              >
                {({ handleChange, errors, touched }) => (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">{t('ui.signupPage.title')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        placeholder="От 3 до 20 символов"
                        name="username"
                        autoComplete="username"
                        required
                        id="username"
                        className={`form-control ${((touched.username && errors.username) || serverError) ? 'is-invalid' : ''}`}
                      />
                      <label className="form-label" htmlFor="username">{t('ui.signupPage.nameField')}</label>
                      {errors.username && <div className="invalid-tooltip">{t(`ui.signupPage.${errors.username}`)}</div>}
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        placeholder="Не менее 6 символов"
                        name="password"
                        aria-describedby="passwordHelpBlock"
                        required
                        autoComplete="new-password"
                        type="password"
                        id="password"
                        className={`form-control ${((touched.password && errors.password) || serverError) ? 'is-invalid' : ''}`}
                      />
                      <label className="form-label" htmlFor="password">{t('ui.signupPage.passwordField')}</label>
                      {errors.password && <div className="invalid-tooltip">{t(`ui.signupPage.${errors.password}`)}</div>}
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        placeholder="Пароли должны совпадать"
                        name="confirmPassword"
                        required
                        autoComplete="new-password"
                        type="password"
                        id="confirmPassword"
                        className={`form-control ${((touched.confirmPassword && errors.confirmPassword) || serverError) ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          handleChange(e)
                          setServerError('')
                        }}
                      />
                      <label className="form-label" htmlFor="confirmPassword">{t('ui.signupPage.confirmPasswordField')}</label>
                      {(errors.confirmPassword) && <div className="invalid-tooltip">{t(`ui.signupPage.${errors.confirmPassword}`)}</div>}
                      {(serverError) && <div className="invalid-tooltip">{t(`ui.signupPage.${serverError}`)}</div>}
                    </div>
                    <button
                      type="submit"
                      className="w-100 btn btn-outline-primary"
                      disabled={isLoading}
                    >
                      {t('ui.signupPage.submitButton')}
                    </button>
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

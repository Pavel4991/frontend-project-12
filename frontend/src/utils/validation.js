import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: () => 'requiredError',
    notOneOf: () => 'duplicateName',
  },
  string: {
    min: () => 'shortOrLongError',
    max: () => 'shortOrLongError',
  },
})

export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(20)
    .required(),
  password: Yup.string()
    .min(6, 'passwordMinError')
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'passwordMatchError')
    .required(),
})

export const modalSchema = channels =>
  Yup.object().shape({
    name: Yup.string()
      .min(3)
      .max(20)
      .notOneOf(channels)
      .required(),
  })

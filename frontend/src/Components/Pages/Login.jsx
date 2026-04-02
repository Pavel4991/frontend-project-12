import { Formik, Form, Field, ErrorMessage } from 'formik'


function Login() {
  return (
    <div className='container w-50 position-absolute top-50 start-50 translate-middle'>
      <div className='row aling-items-center'>
        <div className='column border p-5'>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={({ setSubmitting }) => {
              console.log("Form is validated! Submitting the form...");
              setSubmitting(false);
            }}
          >
            {() => (
              <Form>
                <div className="form-group form-floating mb-3">
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className='form-label'>Email</label>
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group form-floating mb-3">
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <label htmlFor="password">Password</label>
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="invalid-feedback"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg float-end w-25">Log in</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export const Hello = () => {
  return (
    <div className='container w-50 position-absolute top-50 start-50 translate-middle'>
      <div className='row aling-items-center'>
        <div className='column border p-4 text-center'>
          <p>Hello World!</p>
        </div>
      </div>
    </div>
  )
}


export const PageOne = () => Login()

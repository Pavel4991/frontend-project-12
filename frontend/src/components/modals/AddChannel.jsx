import { Modal } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import { removeModal } from '../../slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addNewChannel } from '../../api'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectors } from '../../slices/channelsSlice'
import { object, string, setLocale } from 'yup'

const AddChannel = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(selectors.selectAll).map(channel => channel.name)
  const [error, setError] = useState('')
  
  const token = JSON.parse(localStorage.getItem('user')).token

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const closeModal = () => {
    dispatch(removeModal())
  }
  
  const validateName = async (name) => {
    setLocale({
      mixed: {
        notOneOf: 'duplicateName',
      },
      string: {
        min: 'shortOrLong',
        max: 'shortOrLong',
      },
    })

    const schema = object().shape({
      name: string()
        .min(3)
        .max(20)
        .notOneOf(channels)
    })

    await schema.validate({ name: name })
    return name
  }

  return (
    <>
    <Modal show onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            await validateName(values.name)
              .then(name => addNewChannel(token, { name: name }))
              .then(closeModal)
              .catch(e => setError(e.errors))
            
            setSubmitting(false)
          }}
        >
          {() => (
            <Form>
              <div>
                <Field
                  ref={inputRef}
                  id="name"
                  type="text"
                  name="name"
                  className={`mb-2 form-control ${error ? "is-invalid" : ""}`}
                />
                {error && <div className="invalid-feedback">{t(`ui.modals.${error}`)}</div>}
                <label htmlFor="name" className="visually-hidden">{t('ui.modals.channelName')}</label>
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>{t('ui.modals.cancelButton')}</button>
                <button type="submit" className="btn btn-primary">{t('ui.modals.sendButton')}</button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default AddChannel
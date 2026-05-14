import { Modal } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import { removeModal } from '../../slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { renameChannel } from '../../api'
import { useRef, useEffect } from 'react'

const RenameForm = () => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const dispatch = useDispatch()
  const channel = useSelector(state => state.modals.activeModal).item

  const closeRenameModal = () => {
    dispatch(removeModal())
  }

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <>
    <Formik
      initialValues={{ name: channel.name }}
      onSubmit={async (values,{ setSubmitting }) => {
        try {
          await renameChannel(token, channel.id, { name: values.name })
          closeRenameModal()
        } catch(e) {
          setError(e.status)
        }
        
        setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <div>
            <Field
              ref={inputRef}
              id="name"
              type="text"
              name="name"
              className="mb-2 form-control"
              onChange={props.handleChange}
              value={props.values.name}
            />
            <label htmlFor="name" className="visually-hidden">Имя канала</label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="me-2 btn btn-secondary">Отменить</button>
            <button type="submit" className="btn btn-primary">Отправить</button>
          </div>
        </Form>
      )}
    </Formik>
    </>
  )
}

const RenameChannel = () => {
  const dispatch = useDispatch()

  const closeRenameModal = () => {
    dispatch(removeModal())
  }


  return (
    <>
    <Modal show onHide={closeRenameModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameForm />
      </Modal.Body>
    </Modal>
    </>
  )
}

export default RenameChannel
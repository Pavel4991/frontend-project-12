import { Modal } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import { removeModal } from '../../slices/modalsSlice';
import { useDispatch } from 'react-redux';
import { addNewChannel } from '../../api';
import { useRef, useEffect } from 'react';

const AddForm = () => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const dispatch = useDispatch()

  const closeAddingModal = () => {
    dispatch(removeModal())
  }

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <>
    <Formik
      initialValues={{ name: "" }}
      onSubmit={async (values,{ setSubmitting }) => {
        try {
          await addNewChannel(token, { name: values.name })
          closeAddingModal()
        } catch(e) {
          setError(e.status)
        }
        
        setSubmitting(false);
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
              className="mb-2 form-control"
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

const AddChannel = () => {
  const dispatch = useDispatch()

  const closeAddingModal = () => {
    dispatch(removeModal())
  }


  return (
    <>
    <Modal show onHide={closeAddingModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddForm />
      </Modal.Body>
    </Modal>
    </>
  )
}

export default AddChannel
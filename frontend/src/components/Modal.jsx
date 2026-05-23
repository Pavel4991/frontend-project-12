import { Modal, Button } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import { removeModal } from '../slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectors } from '../slices/channelsSlice'
import { toast } from 'react-toastify'
import { useAddNewChannelMutation, useRenameChannelMutation, useRemoveChannelMutation } from '../services/channelsApi'
import { setActiveChannel } from '../slices/viewSlice'
import { modalSchema } from '../utils/validation'

const ModalInner = ({ closeModal, action }) => {
  const { t } = useTranslation()
  const channels = useSelector(selectors.selectAll).map(channel => channel.name)
  const channel = useSelector(state => state.modals.activeModal).channel
  const channelName = channel ? channel.name : ''
  const inputRef = useRef()
  const [error, setError] = useState('')
  const shema = modalSchema(channels)
  const dispatch = useDispatch()
  const notify = action => toast.success(t(`ui.toast.${action}`))

  const [addChannel] = useAddNewChannelMutation()
  const [renameChannel] = useRenameChannelMutation()
  const [removeChannel] = useRemoveChannelMutation()

  const submitAction = {
    adding: addChannel,
    renaming: renameChannel,
  }

  useEffect(() => {
    if (action !== 'removing') {
      inputRef.current.focus()
    }
  }, [])

  const deleteChannel = () => {
    removeChannel(channel.id)
    dispatch(setActiveChannel({ id: '1', name: 'general' }))
    closeModal()
    notify(action)
  }

  const handleSubmit = async (name) => {
    const data = action === 'adding' ? { name: name } : { channelId: channel.id, editedChannel: { name: name } }
    await submitAction[action](data)
      .then(responce => dispatch(setActiveChannel(responce.data)))
      .then(closeModal)
      .then(() => notify(action))
      .catch(e => setError(e.errors))
  }

  return action === 'removing'
    ? (
        <>
          <p className="lead">{t('ui.modals.prevention')}</p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={closeModal}>{t('ui.modals.cancelButton')}</Button>
            <Button variant="danger" onClick={deleteChannel}>{t('ui.modals.deleteButton')}</Button>
          </div>
        </>
      )
    : (
        <Formik
          initialValues={{ name: channelName }}
          validationSchema={shema}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
          onSubmit={async (values, { setSubmitting }) => {
            handleSubmit(values.name)

            setSubmitting(false)
          }}
        >
          { props => (
            <Form>
              <div>
                <Field
                  ref={inputRef}
                  id="name"
                  type="text"
                  name="name"
                  className={`mb-2 form-control ${(error || props.errors.name) ? 'is-invalid' : ''}`}
                  onChange={props.handleChange}
                  value={props.values.name}
                />
                <label htmlFor="name" className="visually-hidden">{t('ui.modals.channelName')}</label>
                {error && <div className="invalid-feedback">{t(`ui.validation.${error}`)}</div>}
                {props.errors.name && <div className="invalid-feedback">{t(`ui.validation.${props.errors.name}`)}</div>}
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>{t('ui.modals.cancelButton')}</button>
                <button type="submit" className="btn btn-primary">{t('ui.modals.sendButton')}</button>
              </div>
            </Form>
          )}
        </Formik>
      )
}

export const ChannelsModal = ({ action }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(removeModal())
  }

  return action
    ? (
        <>
          <Modal show onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{t(`ui.modals.${action}`)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ModalInner closeModal={closeModal} action={action} />
            </Modal.Body>
          </Modal>
        </>
      )
    : null
}

import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { removeModal } from "../../slices/modalsSlice"
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useRemoveChannelMutation } from "../../services/channelsApi"

const RemoveChannel = () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const channelId = useSelector(state => state.modals.activeModal).channel.id
  const token = JSON.parse(localStorage.getItem('user')).token
  const [removeChannel] = useRemoveChannelMutation()
  

  const closeRemoveModal = () => {
    dispatch(removeModal())
  }

  const deleteChannel = () => {
    removeChannel(channelId)
    closeRemoveModal()
    toast.success(t('ui.toast.removeChannel'))
  }


  return (
    <>
    <Modal show onHide={closeRemoveModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('ui.modals.prevention')}</p>
        <div className="d-flex justify-content-end">
          <Button variant='secondary' className="me-2" onClick={closeRemoveModal}>{t('ui.modals.cancelButton')}</Button>
          <Button variant='danger' onClick={deleteChannel}>{t('ui.modals.deleteButton')}</Button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default RemoveChannel
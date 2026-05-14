import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { removeModal } from "../../slices/modalsSlice"
import { removeChannel } from "../../api"

const RemoveChannel = () => {
  const dispatch = useDispatch()
  const channelId = useSelector(state => state.modals.activeModal).item.id
  const token = JSON.parse(localStorage.getItem('user')).token

  const closeRemoveModal = () => {
    dispatch(removeModal())
  }

  const deleteChannel = () => {
    removeChannel(token, channelId)
    closeRemoveModal()
  }


  return (
    <>
    <Modal show onHide={closeRemoveModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant='secondary' className="me-2" onClick={closeRemoveModal}>Отменить</Button>
          <Button variant='danger' onClick={deleteChannel}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default RemoveChannel
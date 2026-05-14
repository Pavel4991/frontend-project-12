import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import getModal from '../components/modals/index'
import { useSelector } from 'react-redux'


const renderModal = ({ activeModal, hideModal }) => {
  if (!activeModal.type) {
    return null
  }

  const Component = getModal(activeModal.type)
  return <Component modalInfo={activeModal} onHide={hideModal} />
}

export const Layout = () => {
  const activeModal = useSelector(state => state.modals.activeModal)

  const hideModal = () => setModalInfo({ type: null, item: null })
  const showModal = (type, item = null) => setModalInfo({ type, item })

  return (
    <>
      <div className="vh-100 bg-light" id="chat">
        <Outlet />
      </div>
      {renderModal({ activeModal, hideModal })}
    </>
  )
}
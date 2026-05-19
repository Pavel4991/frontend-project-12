import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import getModal from '../components/modals/index'
import { useSelector } from 'react-redux'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

// function TestRollbar() {
//   const rollbar = useRollbar();

//   return (
//     <div>
//       <button onClick={() => rollbar.info('Test message from React')}>
//         Send Test Message
//       </button>
//       <button
//         onClick={() => {
//           throw new Error('Test error from React ErrorBoundary');
//         }}
//       >
//         Trigger Test Error
//       </button>
//     </div>
//   );
// }


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
        <div className="d-flex flex-column h-100">
          <Header />
          <Outlet />
          <ToastContainer />
          {/* <TestRollbar /> */}
        </div>
      </div>
      {renderModal({ activeModal, hideModal })}
    </>
  )
}
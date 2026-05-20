import { Outlet } from 'react-router-dom'
import getModal from '../components/modals/index'
import { useSelector } from 'react-redux'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'

const renderModal = ({ activeModal }) => {
  if (!activeModal.type) {
    return null
  }

  const Component = getModal(activeModal.type)
  return <Component modalInfo={activeModal} />
}

export const Layout = () => {
  const activeModal = useSelector(state => state.modals.activeModal)

  return (
    <>
      <div className="vh-100 bg-light" id="chat">
        <div className="d-flex flex-column h-100">
          <Header />
          <Outlet />
          <ToastContainer />
        </div>
      </div>
      {renderModal({ activeModal })}
    </>
  )
}

import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import { ChannelsModal } from '../components/Modal'

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
      <ChannelsModal action={activeModal.type} />
    </>
  )
}

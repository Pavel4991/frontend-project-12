import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <div className="vh-100 bg-light" id="chat">
        <Outlet />
      </div>
    </>
  )
}
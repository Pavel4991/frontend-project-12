import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Channel } from "./Channel"
import { getChannels } from "../api"
import { addChannels } from "../slices/channelsSlice"

const Channels = () => {
  const channels = useSelector(state => state.channels.channels)
  
  const token = JSON.parse(localStorage.getItem('user')).token
  
  const dispatch = useDispatch()

  useEffect(() => {
    getChannels(token)
      .then((response) => {
        dispatch(addChannels(response.data))
      })
  }, [])

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({id, name}) => <Channel key={id} name={name} id={id}/>)}
      </ul>
    </div>
  )
}

export {Channels} 

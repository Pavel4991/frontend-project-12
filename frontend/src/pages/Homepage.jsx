import { Channels } from "../components/Channels"
import { Messages } from "../components/Messages"
import { getMessages } from "../api"
import { addMessages } from "../slices/messagesSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getChannels } from "../api"
import { addChannels } from "../slices/channelsSlice"

const Homepage = () => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const dispatch = useDispatch()

  useEffect(() => {
    getMessages(token)
      .then((response) => {
        dispatch(addMessages(response.data))
      })

    getChannels(token)
      .then((response) => {
        dispatch(addChannels(response.data))
      })
  }, [])

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  )
  
}

export {Homepage}

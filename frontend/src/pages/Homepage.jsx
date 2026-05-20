import { Channels } from '../components/Channels'
import { Messages } from '../components/Messages'
import { addMessages } from '../slices/messagesSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addChannels } from '../slices/channelsSlice'
import { useGetChannelsQuery } from '../services/channelsApi'
import { useGetMessagesQuery } from '../services/messagesApi'

const Homepage = () => {
  const dispatch = useDispatch()
  const { data: channels } = useGetChannelsQuery()
  const { data: messages } = useGetMessagesQuery()

  useEffect(() => {
    if (messages) {
      dispatch(addMessages(messages))
    }
    if (channels) {
      dispatch(addChannels(channels))
    }
  }, [channels, messages])

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  )
}

export { Homepage }

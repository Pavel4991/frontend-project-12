import { useDispatch, useSelector } from "react-redux"
import { setActiveChannel } from "../slices/channelsSlice"

const Channel = (props) => {
  const activeChannel = useSelector(state => state.channels.activeChannelId)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setActiveChannel({id: props.id, name: props.name}))
  }

  return (
    <li className="nav-item w-100">
      <button type="button"
        className={activeChannel === props.id ? "w-100 rounded-0 text-start btn btn-secondary" : "w-100 rounded-0 text-start btn"}
        onClick={handleClick}
      >
        <span className="me-1">#</span>{props.name}
      </button>
    </li>
  )
}

export {Channel}
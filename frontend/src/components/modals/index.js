import AddChannel from './AddChannel.jsx'
import RenameChannel from './RenameChannel.jsx'
import RemoveChannel from './RemoveChannel.jsx'

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
}

export default modalName => modals[modalName]

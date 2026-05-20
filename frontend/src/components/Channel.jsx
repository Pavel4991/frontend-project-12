import { useDispatch, useSelector } from 'react-redux'
import { setActiveChannel } from '../slices/viewSlice'
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { setModal } from '../slices/modalsSlice'
import filter from 'leo-profanity'

const BaseButton = ({ channel, handleClick, activeChannel }) => {
  const isActive = activeChannel === channel.id

  return (
    <Button className="w-100 rounded-0 text-start" variant={isActive ? 'secondary' : ''} onClick={handleClick}>
      <span className="me-1">#</span>
      {filter.clean(channel.name)}
    </Button>
  )
}

const NewChannelButton = ({ channel, handleClick, activeChannel }) => {
  const { t } = useTranslation()
  const isActive = activeChannel === channel.id
  const dispatch = useDispatch()

  const openRemoveModal = () => {
    dispatch(setModal({ type: 'removing', channel: channel }))
  }

  const openRenameModal = () => {
    dispatch(setModal({ type: 'renaming', channel: channel }))
  }

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <BaseButton channel={channel} handleClick={handleClick} activeChannel={activeChannel} />

      <Dropdown.Toggle split variant={isActive ? 'secondary' : ''} id={channel.name} className="flex-grow-0">
        <span className="visually-hidden">{t('ui.homePage.сhannelСontrol')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={openRemoveModal}>{t('ui.homePage.deleteChannel')}</Dropdown.Item>
        <Dropdown.Item as="button" onClick={openRenameModal}>{t('ui.homePage.renameChannel')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const Channel = ({ channel }) => {
  const activeChannel = useSelector(state => state.view.activeChannel)
  const dispatch = useDispatch()
  const isNewChannel = channel.removable

  const handleClick = () => {
    dispatch(setActiveChannel(channel))
  }

  return (
    <li className="nav-item w-100">
      {isNewChannel
        ? <NewChannelButton channel={channel} handleClick={handleClick} activeChannel={activeChannel.id} />
        : <BaseButton channel={channel} handleClick={handleClick} activeChannel={activeChannel.id} />}
    </li>
  )
}

export { Channel }

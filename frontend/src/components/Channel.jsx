import { useDispatch, useSelector } from "react-redux"
import { setActiveChannel } from "../slices/viewSlice"
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useState } from "react"
import { setModal } from "../slices/modalsSlice"


const BaseChannelButton = ({ channel, handleClick, activeChannel }) => {
  const isActive = activeChannel === channel.id

  return (
    <Button className='w-100 rounded-0 text-start' variant={isActive ? "secondary" : ""} onClick={handleClick}>
      <span className="me-1">#</span>{channel.name}
    </Button>
  )
}



const NewChannelButton = ({ channel, handleClick, activeChannel }) => {
  const { t, i18n } = useTranslation()
  const isActive = activeChannel === channel.id
  const dispatch = useDispatch()

  const openRemoveModal = () => {
    dispatch(setModal({type: 'removing', item: channel}))
  }

  const openRenameModal = () => {
    dispatch(setModal({type: 'renaming', item: channel}))
  }

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button className='w-100 rounded-0 text-start' variant={isActive ? "secondary" : ""} onClick={handleClick}>
        <span className="me-1">#</span>{channel.name}
      </Button>

      <Dropdown.Toggle split variant={isActive ? "secondary" : ""} id="dropdown-split-basic" className="flex-grow-0"/>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={openRemoveModal}>{t('ui.homePage.deleteChannel')}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={openRenameModal}>{t('ui.homePage.renameChannel')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}



const Channel = ({ channel }) => {
  const activeChannel = useSelector(state => state.view.activeChannelId)
  const dispatch = useDispatch()
  const isNewChannel = channel.removable

  const handleClick = () => {
    dispatch(setActiveChannel(channel))
  }

  return (
    <li className="nav-item w-100">
    {isNewChannel ?
      <NewChannelButton channel={channel} handleClick={handleClick} activeChannel={activeChannel}/> :
      <BaseChannelButton channel={channel} handleClick={handleClick} activeChannel={activeChannel}/>
    }
    </li> 
  )
}

export {Channel}


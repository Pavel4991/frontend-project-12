import axios from "axios"

const authorization = async (username, password) => {
  return await axios.post('api/v1/login', { username, password })
}

const createNewUser = async(username, password) => {
  return await axios.post('/api/v1/signup', { username, password })
}

const getChannels = async (token) => {
  return await axios.get('api/v1/channels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const getMessages = async (token) => {
  return await axios.get('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const addNewMessage = async (token, newMessage) => {
  axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const addNewChannel = async (token, newChannel) => {
  axios.post('/api/v1/channels', newChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const renameChannel = (token, channelId, editedChannel) => {
  axios.patch(`/api/v1/channels/${channelId}`, editedChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const removeChannel = (token, channelId) => {
  axios.delete(`/api/v1/channels/${channelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}


export { authorization, createNewUser, getChannels, getMessages, addNewMessage, addNewChannel, renameChannel, removeChannel }
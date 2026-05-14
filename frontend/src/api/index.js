import axios from "axios";

const authorization = async (username, password) => {
  return await axios.post('api/v1/login', { username, password })
}

const getChannels = async (token) => {
  return axios.get('api/v1/channels', {
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

// const newChannel = { name: 'new channel' };

const addNewChannel = async (token, newChannel) => {
  axios.post('/api/v1/channels', newChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// const editedChannel = { name: 'new name channel' };

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


export { authorization, getChannels, getMessages, addNewMessage, addNewChannel, renameChannel, removeChannel }
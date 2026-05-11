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


export { authorization, getChannels, getMessages, addNewMessage }
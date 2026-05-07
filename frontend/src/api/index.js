import axios from "axios";

const authorization = async (username, password) => {
  return await axios.post('api/v1/login', { username, password })
}

export { authorization }
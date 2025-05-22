import axios from 'axios'

axios.defaults.baseURL = '/api'

export async function registry(username, password) {
  return axios
    .post('/user', {
      username,
      password,
    })
    .then((res) => {
      return res.data
    })
}

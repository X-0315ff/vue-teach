import axios from 'axios'
import useUserInfoStore from '@/stores/userInfo'
axios.defaults.baseURL = '/api'


const userinfo = useUserInfoStore()


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

export async function login(username, password) {
  return axios.post('/auth/login', { username, password }).then((res) => {
    return res.data
  })
}


export async function sendPost(title,text) {
  return axios.post('/post/create',
    {
      title,
      text
    })
    .then(data => {
    return data
  })
}

export async function senListPost(page,size) {
  return axios.post('/post/list/page').then(data =>{
    return data
  })
}

export const instance = axios.create();


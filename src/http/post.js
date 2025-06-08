import instance from '@/http/index.js'

export const createPostApi = (title, text) => {
  return instance.post('/post', { title, text }).then((res) => {
    return res.data
  })
}
export const listPostApi = (page, size) => {
  return instance.post('/post/list', { page, size }).then((res) => {
    return res.data
  })
}

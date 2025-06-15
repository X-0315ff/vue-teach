import instance from '@/http/index.js'

export const createPostApi = (title, text) => {
  return instance.post('/post/create', { title, text }).then((res) => {
    return res.data
  })
}
export const listPostApi = (page, size) => {
  return instance.post('/post/list', { page, size }).then((res) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res.data)
      }, 1000)
    })
  })
}
export const updatePostApi = (post) => {
  return instance.post(`/post/update`, post).then((res) => {
    return res.data
  })
}
export const deletePostApi = (id) => {
  return instance.delete(`/post/delete/${id}`).then((res) => {
    console.log(res.data)
  })
}

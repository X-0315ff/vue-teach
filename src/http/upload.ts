import instance from '@/http/index.js'

export function uploadImg(fileData) {
  return instance.post('/upload/image', fileData).then((res) => {
    return res.data
  })
}
export function listImg() {
  return instance.get('/upload/list').then((res) => {
    return res.data
  })
}

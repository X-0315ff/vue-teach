import { defineStore } from 'pinia'
import piniaConstant from '@/constants/piniaConstant.js'
import { ref } from 'vue'


const useUserInfoStore = defineStore(piniaConstant.userinfo, () => {
  const user = ref({
    id:null,
    username: '',
    isLogin: false,
    token: ''
  })
  const setUser = (data) => {
    user.value.username = data.username
    user.value.isLogin = true
    user.value.token = data.token
  }
  return { user, setUser }
})

export default useUserInfoStore

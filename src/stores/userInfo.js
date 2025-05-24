import { defineStore } from 'pinia'
import piniaConstant from '@/constants/piniaConstant.js'
import { ref } from 'vue'

const useUserInfoStore = defineStore(piniaConstant.userinfo, () => {
  const user = ref({
    username: '',
    isLogin: false,
  })
  const setUser = (data) => {
    user.value.username = data.username
    user.value.isLogin = true
  }
  return { user, setUser }
})

export default useUserInfoStore

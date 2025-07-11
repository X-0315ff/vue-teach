<script setup>
import { computed, ref } from 'vue'
import instance, { login, registry } from '@/http/index.js'
import useUserInfoStore from '@/stores/userInfo.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const status = ref(true) // true表示登录，false表示注册
const userInfoStore = useUserInfoStore()
const router = useRouter()
const btnText = computed(() => {
  return status.value ? '登录' : '注册'
})
const toggleText = computed(() => {
  return status.value ? '还没账号，注册' : '已有账号，登录'
})
const toggleBtn = () => {
  status.value = !status.value
}
const handleBtn = () => {
  if (isLoading.value) {
    return
  }
  isLoading.value = true
  // 登录逻辑
  if (status.value) {
    login(username.value, password.value)
      .then((data) => {
        instance.defaults.headers.common['Authorization'] = data.token
        localStorage.setItem('token', data.token)
        userInfoStore.setUser(data)
        ElMessage({
          message: '账号登录成功',
          type: 'success',
        })
        router.push({ path: '/post' })
      })
      .finally(() => {
        isLoading.value = false
        
      })
  } else {
    // 注册
    registry(username.value, password.value)
      .then((data) => {
        status.value = true
        ElMessage({
          message: '账号注册成功，请登录',
          type: 'success',
        })
      })
      .finally(() => {
        isLoading.value = false
      })
  }
}
</script>

<template>
  <div class="login-container">
    <div class="panel">
      <div class="wrapper">
        <span>username</span>
        <input type="text" v-model="username" />
      </div>
      <div class="wrapper">
        <span>password</span>
        <input type="password" v-model="password" />
      </div>
      <div class="primary-btn" @click="handleBtn" :class="{ disable: isLoading }">
        {{ btnText }}
      </div>
      <span class="notify" @click="toggleBtn">{{ toggleText }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-direction: column;
  padding-top: 300px;
  justify-items: center;

  .panel {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    border: 2px solid #eaecef;
    padding: 24px;
    border-radius: 12px;
  }

  .wrapper {
    font-size: 18px;
    font-weight: 600;
    display: flex;
    gap: 12px;
    color: #3c4659;
    align-items: center;

    input {
      border: 2px solid #eaecef;
      cursor: pointer;
      width: 300px;
      height: 40px;
      border-radius: 12px;
      outline: none;
      font-size: 18px;

      &:hover,
      &:focus {
        border-color: #4822a5;
      }
    }
  }

  .primary-btn {
    color: #4822a5;
    background-color: #e8deff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    width: 180px;
    height: 40px;

    &:hover {
      cursor: pointer;
      background-color: #f5eeff;
    }
  }

  .notify {
    cursor: pointer;

    &:hover {
      color: #4822a5;
    }
  }

  .disable {
    opacity: 0.3;
  }
}
</style>

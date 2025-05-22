<script setup>
import { ref } from 'vue'
import VChild from './VChild.vue'

const a = { id: 1, name: 'jerry', age: 100, phone: '123' }
const b = { id: 2, name: 'tom', age: 100, phone: '123' }
const user = ref(a)
console.log(user)
console.log(user.value)
const toggleUser = () => {
  if (user.value.id === 1) {
    user.value = b
  } else {
    user.value = a
  }
}
// 参数val 是个普通对象
const changeUser = (val) => {
  console.log(val)
  user.value = val // user.value = reactive(val);
  console.log(val === user.value)
  console.log(user.value)
}
</script>

<template>
  <div class="container">
    <div>parent:{{ user }}</div>
    <div @click="toggleUser">change user</div>
    <div @click="user.id++">修改用户id</div>
    <!--      v-model="user.name" 相当于下面  -->
    <!--      :modelValue="user.name"        -->
    <!--      @update:modelValue="user.name = $event"     -->
    <VChild
      v-model="user.name"
      v-model:age="user.age"
      v-model:phone="user.phone"
      :user="user"
      @change-user="changeUser"
      :key="user.id"
    ></VChild>
  </div>
</template>

<style scoped lang="scss"></style>

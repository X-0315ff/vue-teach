<script setup>
import { ref } from 'vue'
import VChild from './VChild.vue'

const user = ref({ id: 1, name: 'tom', age: 100, phone: '123' })
console.log(user)
console.log(user.value)
const changeUser = (value) => {
  console.log(value)
  user.value = value
  console.log(value === user.value)
  console.log(user.value)
}
</script>

<template>
  <div class="container">
    <div>parent:{{ user }}</div>
    <div @click="user.id++">修改用户id</div>
    <VChild
      :user="user"
      v-model="user.name"
      v-model:age="user.age"
      v-model:phone="user.phone"
      @change-user="changeUser"
      :key="user.id"
    ></VChild>
  </div>
</template>

<style scoped lang="scss"></style>

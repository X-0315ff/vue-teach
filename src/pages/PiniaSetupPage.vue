<script setup>
import { useCounterStore, useUserStore } from '@/stores/counter.js'
import { storeToRefs } from 'pinia'
const counter = useCounterStore()
console.log(counter,'counter');
// 计算属性和响应式变量，需要使用storeToRefs进行结构
const { count, decrement } = storeToRefs(counter)
// 方法直接结构
const { increment, reset } = counter

const user = useUserStore()
</script>

<template>
  <div class="container">
    <div @click="counter.increment">{{ counter.count }} + 1</div>
    <div @click="counter.count--">{{ counter.count }} - 1</div>
    <div @click="counter.$patch({ count: counter.count + 5 })">{{ counter.count }} + 5  patch效率较低，可以不使用</div>
    <div @click="counter.increment(2)">{{ counter.count }} + 2</div>
    <div @click="increment">{{ count }} + 1</div>
    <div @click="reset">重置</div>
    <div>{{ decrement }}</div>
    <div>user</div>
    <div>{{ user.username }}</div>
    <div>
      <input
        type="text"
        :value="user.firstname"
        @input="user.changeFirstname($event.target.value)"
      />
    </div>
    <div>
      <input type="text" :value="user.lastname" @input="user.changeLastname($event.target.value)" />
    </div>
    <div @click="user.changeAgeAsync(5)">{{user.age}} + 5</div>
  </div>
</template>

<style scoped lang="scss"></style>

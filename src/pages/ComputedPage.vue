<script setup>
import { computed, reactive, ref } from 'vue'

/**
 * 1. 计算属性必须有返回值
 * 2. 当计算属性中的响应式变量发生变化的时候，会自动更新
 * 3. 如果计算属性中没有响应式，只会更新一次
 * 普通方法
 * 在页面每次更新的时候，都会执行一次
 */
const user = reactive({
  name: '',
  age: 10,
})
const showList = ref(true)
const list = reactive([
  {
    name: 'tom',
    age: 12,
  },
  {
    name: 'jerry',
    age: 5,
  },
])
// 响应式发生改变的时候执行
const filterList = computed(() => {
  return list.filter((item) => {
    return item.age > 6
  })
})
// 内部响应式变化，或者页面刷新的时候，都执行
const calcList = () => {
  return list.filter((item) => {
    return item.age > 6
  })
}
//
const addList = () => {
  list.push({
    ...user,
  })
}

const showList1 = ref(true)
const list1 = [
  {
    name: 'tom',
    age: 12,
  },
  {
    name: 'jerry',
    age: 5,
  },
]
// 内部没有响应式变量，只会执行一次
const filterList1 = computed(() => {
  return list1.filter((item) => {
    return item.age > 6
  })
})
// 内部没有响应式，只会在页面筛选的时候执行
const calcList1 = () => {
  return list1.filter((item) => {
    return item.age > 6
  })
}

const addList1 = () => {
  list1.push({
    ...user,
  })
}
</script>

<template>
  <div class="container">
    <input type="text" v-model="user.name" />
    <input v-model="user.age" type="number" />
    <button @click="addList">add list</button>
    <div @click="showList=!showList">list</div>
    <template v-if="showList">
      <div v-for="item in filterList">name is :{{ item.name }}, age is {{ item.age }}</div>
      <div v-for="item in calcList()">name is :{{ item.name }}, age is {{ item.age }}</div>
    </template>
    <div @click="showList1=!showList1">list1</div>
    <button @click="addList1">add list1</button>
    <template v-if="showList1">
      <div v-for="item in filterList1">computed name is :{{ item.name }}, age is {{ item.age }}</div>
      <div v-for="item in calcList1()">name is :{{ item.name }}, age is {{ item.age }}</div>
    </template>

  </div>
</template>

<style scoped lang="scss">
input {
  width: 200px;
  height: 30px;
  line-height: 30px;
}

button {
  width: 100px;
  height: 30px;
  line-height: 30px;
}
</style>

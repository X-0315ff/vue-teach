<script setup>
/**
 * 如果传入的是ref，或者getter函数，是浅层监听。只会在ref.value或者getter函数的返回值变化的时候触发，
 * 如果需要转成深层监听需要添加{deep:true}
 * 如果传入的是reactive,是深层监听。
 * 默认只有在数据源发生变化的时候，执行回调。立即执行 {immediate:true}
 * 监听器也是异步执行，当状态变化后不会立即执行。执行时机是在父组件实例更新之后，当前组件dom更新之前被调用
 * {flush:post},在dom更新之后执行回调。
 */

import { reactive, ref, watch, watchEffect } from 'vue'

const a = ref(0)
const b = ref({
  name: 'tom',
  age: 15,
})
const f = () => {
  a.value++
}
const f1 = () => {
  b.value.name = 'jerry' + Date.now()
}
const f2 = () => {
  b.value.age++
}
const f3 = () => {
  b.value = {
    name: 'spike',
    age: 15,
  }
}
watch(a, (value) => {
  console.log(a.value, 1111)
})
watch(
  () => b.value.name,
  (value) => {
    console.log(b.value, 3333)
    console.log(value, 3333)
  },
)
watch(b, (value) => {
  console.log(b.value, 4444)
  console.log(value, 4444)
})

// watchEffect,可以自动监听变化，但是如果存在异步，则自会监听第一个异步之前的响应式变化.并且监听模式和watch一样
// watchPostEffect,在dom更新之后调用回调
const f4 = () => {
  return new Promise((resolve) => {
    console.log(b.value, 111222233333)
    setTimeout(resolve, 1000)
  })
}

watchEffect(async () => {
  console.log(b.value,123123)
  await f4()
  console.log(a.value,456456)
})

// watch和watchEffect函数返回值是一个函数，可以利用这个函数清理掉监听。
// vue会清理掉顶层创建的监听器，其他情况下监听器需要自己手动销毁

let c = reactive({ a: 1 })
const changeC = () => {
  c = reactive({ a: 2 })
}
watch(c, () => {
  console.log(123123)
})

let d = ref({ a: 1 })
const changeD = () => {
  // d.value.a++
  d.value = { a: 2 }
}
watch(d, () => {
  console.log(123123)
})
</script>

<template>
  <div class="container">
    <div>监听ref和getter,默认是渐层监听</div>
    <div @click="f">修改a</div>
    <div @click="f1">只修改名字</div>
    <div @click="f2">只修改年龄</div>
    <div @click="f3">全部修改</div>
    <div>监听reactive是深层监听</div>
    <div @click="changeC">{{ c }}</div>
    <div @click="changeD">{{ d }}</div>
  </div>
</template>

<style scoped lang="scss"></style>

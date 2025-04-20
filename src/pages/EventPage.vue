<script setup>
// vue绑定事件。内联函数，方法
import { ref } from 'vue'

const num = ref(0)
const f1 = () => {
  num.value++
}
const f2 = (value) => {
}
const f3 = (e) => {
}
</script>

<template>
  <div class="container" @click="f2(123123)">
    <div @click="f1">f1</div>
    <div @click="num++">内联函数</div>
    <div @click="f2('hello tom')">内联函数</div>
    <div @click="e=>f3(e)">内联函数</div>
    <div @click="f3($event)">内联函数</div>
    <div @click.stop="f3($event)">内联函数</div>
    <div>num is {{ num }}</div>
  </div>
</template>

<style scoped lang="scss"></style>

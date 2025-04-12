<script setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue'

onBeforeMount(() => {
  console.log('son onBeforeMount-挂载前')
})
onMounted(() => {
  console.log('son onMounted-挂载后')
})

onUnmounted(() => {
  console.log('son onUnmounted-卸载后')
})
onUpdated(() => {
  console.log('son onUpdated-更新后')
})

onBeforeUpdate(() => {
  console.log('son onBeforeUpdate-更新前')
})
onBeforeUnmount(() => {
  console.log('son onBeforeUnmount-卸载前')
})
</script>

<template>
  <div>this is son component 这是组合式子组件</div>
</template>

<style scoped lang="scss"></style>

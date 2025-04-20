<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

const router = useRouter() // 保存着router对象
const route = useRoute() // 保存当前页面的路由性息
const gotoPage = () => {
  router.push('/router-page/123?name=tom&age=123')
}
</script>

<template>
  <div class="container">
    <div>路由参数{{ route.params.id }}</div>
    <div>路由的query {{ route.query }}</div>
    <div @click="gotoPage">页面跳转</div>
  </div>
</template>

<style scoped lang="scss"></style>

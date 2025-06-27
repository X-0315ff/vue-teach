<script setup>
import { RouterView } from 'vue-router'
import RouteList from '@/components/RouteList.vue'
</script>

<template>
  <div class="app">
    <div class="header flex-center">vue教学</div>
    <div class="main">
      <div class="left-menu">
        <RouteList></RouteList>
      </div>
      <div class="right-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    height: 60px;
    border-bottom: 1px solid #eaecef;
    font-size: 30px;
  }

  .main {
    flex: 1;
    display: flex;
    min-height: 0; // 关键，防止flex子项溢出

    .left-menu {
      width: 300px;
      height: 100%;     // 占满main的高度
      border-right: 1px solid #eaecef;
      background-color: #f9fafb;
      padding: 20px;
      overflow-y: auto; // 允许内容滚动
      box-sizing: border-box;
    }

    .right-content {
      padding: 20px;
      flex: 1;
      overflow-y: auto; // 允许内容滚动
      box-sizing: border-box;
      min-width: 0; // 防止内容溢出
    }
  }
}
</style>

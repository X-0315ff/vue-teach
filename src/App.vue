<script setup>
import { RouterView } from 'vue-router'
import RouteList from '@/components/RouteList.vue'
</script>

<template>
  <div class="app">
    <div class="header flex-center" >vue教学</div>
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
  height: 100%;
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

    .left-menu {
      width: 300px;
      height: 100%;
      border-right: 1px solid #eaecef;
      overflow-y: auto;
      background-color: #f9fafb;
      padding: 20px;
    }

    .right-content {
      padding: 20px;
      flex: 1;
      height: 100%;
    }
  }
}
</style>

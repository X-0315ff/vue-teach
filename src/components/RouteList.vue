<script setup>
import { ref } from 'vue'

const linkList = ref([
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/reactive',
    name: '响应式变量基本学习',
  },
  {
    path: '/computed',
    name: '计算属性学习',
  },
  {
    path: '/add-style',
    name: '绑定样式',
  },
  {
    path: '/if-show',
    name: 'if和show',
  },
  {
    path: '/for',
    name: 'for循环的使用',
  },
  {
    path: '/event',
    name: '绑定事件',
  },
  {
    path: '/form',
    name: '表单',
  },
  {
    path: '/watch',
    name: '监听器使用',
  },
  {
    path: '/dom',
    name: '引用dom',
  },
  {
    path: '/component',
    name: '组件的基本用法',
  },
  {
    path: '/life-cycle',
    name: '生命周期',
  },
  {
    path: '/v-model',
    name: '组件上的v-model',
  },
])
</script>

<template>
  <div class="route-list">
    <RouterLink
      v-for="link in linkList"
      :key="link.name"
      :to="link.path"
      exact-active-class="selected"
    >
      {{ link.name }}
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.route-list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    text-decoration: none;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    padding: 10px;
    border-radius: 12px;
    color: #4822a5;

    &:hover {
      background-color: #f5eeff;
    }
  }

  .selected {
    border-radius: 12px;
    background-color: #e8deff;
  }
}
</style>

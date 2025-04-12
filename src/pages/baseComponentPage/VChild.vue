<script setup>
// const props = defineProps(['title', 'user'])

import { watch } from 'vue'

/**
 * 1. 在模板中使用prop时，可以不使用prop.
 * 2. 监听时，需要使用getter方法
 */
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
  },
  male: {
    type: Boolean,
    default: false,
  },
  name: {
    type: Object,
    default: () => {
      return { first: 'hello', last: 'world' }
    },
  },
})
watch(props.user,()=>{
  console.log('user is changed')
})
const emit = defineEmits(['changeAge'])
const fn = () => {
  emit('changeAge')
}
</script>

<template>
  <div>
    <p>{{ title }}</p>
    <p @click="fn">{{ props.user }}</p>
    <p>user is male {{ male }}</p>
    <p>{{name.first}},{{name.last}}</p>
  </div>
</template>

<style scoped lang="scss">
p {
  margin-bottom: 20px;
  border: 1px solid #e8deff;
}
</style>

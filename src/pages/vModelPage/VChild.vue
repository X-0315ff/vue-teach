<script setup>
import { ref, watch } from 'vue'

/**
 * defineModel会返回一个ref。并且和父组件传入的prop已经绑定。这个时候可以直接修改
 */
const name = defineModel() //不带有名字
const age = defineModel('age') // 带有名字
// 不使用defineModel
const props = defineProps(['phone', 'user'])
const emit = defineEmits(['update:phone', 'update:age', 'changeUser'])

// 组件上v-model原理
const phoneInput = (e) => {
  emit('update:phone', e.target.value)
}
// defineModel返回的是ref,并且和父组件传递的age是同步的
const addAge = () => {
  age.value++
}

// props.user 类型reactive
const localUser = ref({ ...props.user })
watch(
  // props.user,
  () => props.user,
  () => {
    localUser.value = { ...props.user }
  },
  { deep: true },
)

const save = () => {
  emit('changeUser', { ...localUser.value })
}

// setInterval(()=>{
//   console.log(props.user)
// },5000)
</script>

<template>
  <div class="container">
    <div>
      <label>username is <input type="text" v-model="name" /></label>
    </div>
    <div>
      <label>age is <input type="number" v-model="age" /></label>
      <button @click="addAge">{{ age }}</button>
    </div>
    <div>
      <label>phone is <input type="text" :value="phone" @input="phoneInput" /></label>
    </div>
    <div>需要点击保存后才修改父组件中的user，并且父组件中user发生变化后，子组件需要立即更新</div>
    <div>
      <label>username is <input type="text" v-model="localUser.name" /></label>
      <button @click="save">save</button>
      <div>{{ localUser }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

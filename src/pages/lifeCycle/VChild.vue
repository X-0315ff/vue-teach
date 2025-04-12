<script>
import VSon from '@/pages/lifeCycle/VSon.vue'

export default {
  components: { VSon },
  data() {
    return {
      num: 1,
    }
  },
  beforeCreate() {
    console.log('child1 beforeCreate')
  },
  created() {
    // 组件实例已经创建，可以访问this,可以在这个生命周期中请求数据
    console.log('child1 created')
  },
  beforeMount() {
    // dom还未渲染，不可以执行dom操作
    console.log('child1 beforeMount')
  },
  mounted() {
    // dom已经生成，可以执行dom操作,可以在这个生命周期中请求数据
    console.log('child1 mounted')
  },
  beforeUpdate() {
    // 数据变更后，dom更新前
    console.log('child1 beforeUpdate')
  },
  updated() {
    // dom更新后，dom更新后
    console.log('child1 updated')
  },
  beforeUnmount() {
    console.log('child1 beforeUnmount')
  },
  unmounted() {
    console.log('child1 unmounted')
  },
  methods: {
    handleClick() {
      this.num++
      this.$emit('click')
    },
  }

}
</script>

<template>
  <div class="container">
    <div @click.stop="handleClick">this is child1 这是选项式子组件,num is {{ num }}</div>
    <VSon></VSon>
  </div>
</template>

<style scoped lang="scss"></style>

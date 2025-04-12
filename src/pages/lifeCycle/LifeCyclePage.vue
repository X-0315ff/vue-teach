<script>
import VChild from '@/pages/lifeCycle/VChild.vue'
import VSon from '@/pages/lifeCycle/VSon.vue'


/**
 * 挂载阶段 father beforeCreate-> father created-> father beforeMount-> child beforeCreate-> child created -> child beforeMount
 * -> child mounted -> father mounted
 * 更新阶段 father beforeUpdate -> child beforeUpdate -> father updated -> child updated
 * 销毁阶段 father beforeUnmount-> child beforeUnmount -> child unmounted -> father unmounted
 */

/**
 * 针对keep-alive包裹的组件，会额外多两个生命周期
 * activated: 组件插入到dom中
 * deactivated: 组件从dom中移除
 */
export default {
  components: { VSon, VChild },
  data() {
    return {
      show: true,
      showSon: false,
      count:100
    }
  },
  beforeCreate() {
    console.log('father beforeCreate')
  },
  created() {
    // 组件实例已经创建，可以访问this,可以在这个生命周期中请求数据
    console.log('father created')
  },
  beforeMount() {
    // dom还未渲染，不可以执行dom操作
    console.log('father beforeMount')
  },
  mounted() {
    // dom已经生成，可以执行dom操作,可以在这个生命周期中请求数据
    console.log('father mounted')
  },
  beforeUpdate() {
    // 数据变更后，dom更新前
    console.log('father beforeUpdate')
  },
  updated() {
    // dom更新后，dom更新后
    console.log('father updated')
  },
  methods:{
    changeCount() {
      this.count++
    }
  },

}
</script>

<template>
  <div class="container">
    <div>this is father component,count is {{count}}</div>

    <div @click="show = !show">toggle show child显示所有孩子</div>

    <VChild v-if="show" @click="changeCount"></VChild>

    <!-- <VSon v-if="showSon"></VSon> -->
  </div>
</template>

<style scoped lang="scss"></style>

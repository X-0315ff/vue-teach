<script>
import { useCounterStore, useUserStore } from '@/stores/counter.js'
import { mapActions, mapState, mapStores, mapWritableState } from 'pinia'

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(useCounterStore, ['count', 'decrement']), // 将counterStore中响应式数据进行绑定,绑定到this
    ...mapStores(useCounterStore), // 将counterStore绑定到this，注意不是counter
    ...mapWritableState(useUserStore, ['age'])
  },
  methods: {
    ...mapActions(useCounterStore, ['increment']),
  },
}
</script>

<template>
  <div class="container">
    <div @click="increment">{{ count }}</div>
    <div>{{ decrement }}</div>
    <div>{{ counterStore.count }} 1111</div>
    <div>
      {{ userStore.username }}
    </div>
    <div>
      <input
        type="text"
        :value="userStore.firstname"
        @input="userStore.changeFirstname($event.target.value)"
      />
    </div>
    <div>
      <input
        type="text"
        :value="userStore.lastname"
        @input="userStore.changeLastname($event.target.value)"
      />
    </div>
    <div @click="this.age++">{{age}} ++ 111</div>
  </div>
</template>

<style scoped lang="scss"></style>

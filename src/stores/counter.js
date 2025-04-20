import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import piniaConstant from '@/constants/piniaConstant.js'

/**
 * 1. 状态的名字不能重复，因此可以定义成常量
 * 2. 名字使用use开头，store结尾，不是强制要求，但是是一个很好的习惯。
 * 3. 必须要调用useStore之后才会创建store
 * 4. 调用store后返回的是个用reactive包裹的对象，包含了属性，方法，和计算属性
 */

/**
 * 在store内部使用computer相当于vuex的getter;
 * 需要暴露的方法和变量，需要在return中返回
 */
export const useCounterStore = defineStore(piniaConstant.counter, () => {
  const count = ref(0) // 对应state中的属性
  const a = ref(111)
  function increment(num) {
    // 对应action中的方法
    if (typeof num === 'number') {
      count.value = count.value + num
    } else {
      count.value++
    }
  }

  const decrement = computed(() => {
    // 对应getters中的计算属性
    return count.value * 2
  })

  const reset = () => {
    count.value = 0
  }

  return { count, increment, decrement, reset }
})

// 选项式写法
export const useUserStore = defineStore(piniaConstant.user, {
  state() {
    return {
      firstname: '',
      lastname: '',
      age: 12,
    }
  },
  // 不能包含副作用
  getters: {
    username() {
      return this.firstname + ' ' + this.lastname
    },
  },
  // 可以是同步，也可以是异步的。区别一下vuex: vuex中mutations中是同步任务，actions中是异步任务。
  actions: {
    changeAge(age) {
      this.age = age
    },
    changeFirstname(firstname) {
      this.firstname = firstname
    },
    changeLastname(lastname) {
      this.lastname = lastname
    },
    changeAgeAsync(age) {
      setTimeout(() => {
        this.age = this.age + age
      }, 1000)
    },
  },
})

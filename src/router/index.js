import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import useUserInfoStore from '@/stores/userInfo.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/reactive',
      name: 'reactive',
      component: () => import('@/pages/ReactivePage.vue'),
    },
    {
      path: '/computed',
      name: 'computed',
      component: () => import('@/pages/ComputedPage.vue'),
    },
    {
      path: '/add-style',
      name: 'addStyle',
      meta: {
        needLogin: true,
      },
      component: () => import('@/pages/AddStylePage.vue'),
    },
    {
      path: '/if-show',
      name: 'ifAndShow',
      component: () => import('@/pages/IfAndShowPage.vue'),
    },
    {
      path: '/for',
      name: 'forPage',
      component: () => import('@/pages/ForPage.vue'),
    },
    {
      path: '/event',
      name: 'eventPage',
      component: () => import('@/pages/EventPage.vue'),
    },
    {
      path: '/form',
      name: 'formPage',
      component: () => import('@/pages/FormPage.vue'),
    },
    {
      path: '/watch',
      name: 'watchPage',
      component: () => import('@/pages/WatchPage.vue'),
    },
    {
      path: '/dom',
      name: 'domPage',
      component: () => import('@/pages/DomPage.vue'),
    },
    {
      path: '/component',
      name: 'componentPage',
      component: () => import('@/pages/baseComponentPage/BaseComponentPage.vue'),
    },
    {
      path: '/life-cycle',
      name: 'lifeCyclePage',
      component: () => import('@/pages/lifeCycle/LifeCyclePage.vue'),
    },
    {
      path: '/v-model',
      name: 'VModelPage',
      component: () => import('@/pages/vModelPage/VModelPage.vue'),
    },
    {
      path: '/pinia-setup',
      name: 'piniaSetup',
      component: () => import('@/pages/PiniaSetupPage.vue'),
    },
    {
      path: '/pinia-option',
      name: 'piniaOption',
      component: () => import('@/pages/PiniaOptionPage.vue'),
    },
    {
      path: '/router-page/:id',
      name: 'routerPage',
      meta: {
        needLogin: true,
      },
      component: () => import('@/pages/RouterPage.vue'),
    },
    {
      path: '/login',
      name: 'loginPage',
      component: () => import('@/pages/LogIn.vue'),
    },
    {
      path: '/post',
      name: 'postPage',
      meta: {
        needLogin: false,
      },
      component: () => import('@/pages/PostPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/pages/404Page.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  document.title = to.name
  const userinfoStore = useUserInfoStore()
  // 判断是否需要登录
  if (to.meta.needLogin) {
    if (userinfoStore.user.isLogin) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})
router.afterEach((to, from) => {
  let num = Number(localStorage.getItem('duration')) || Date.now()
  console.log('duration', (Date.now() - num) / 1000)
  localStorage.setItem('duration', Date.now())
})
export default router

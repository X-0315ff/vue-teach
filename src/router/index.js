import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

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
  ],
})

export default router

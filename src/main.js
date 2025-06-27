import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/reset.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus' // 加这一行
import router from './router'
import VChild from '@/pages/lifeCycle/VChild.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.component('VChild', VChild)
app.use(ElementPlus) // 加这一行
app.use(createPinia())
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')

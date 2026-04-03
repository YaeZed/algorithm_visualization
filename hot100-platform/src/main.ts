import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useProgressStore } from './stores/progress'

// 样式：先 EP 覆盖，再全局
import './styles/element-override.css'
import './styles/global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化从 localStorage 加载进度
const progressStore = useProgressStore()
progressStore.loadFromStorage()

app.mount('#app')

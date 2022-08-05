export {}
import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import './permission'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
const app = createApp(App)
//svg-icon
//import svg-icon doc in  https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', svgIcon)
console.log(import.meta.env.VITE_APP_BASE_URL, 'VITE_APP_BASE_URL')
app.use(router).use(createPinia()).mount('#app')

// setTimeout(()=>{
// 	app.mount('#app')
// },10000)

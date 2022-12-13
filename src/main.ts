import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-loading.css'
import { vLoading } from 'element-plus/es/components/loading/src/directive'
import './styles/index.scss'
import './permission'
import * as d3 from 'd3'
window.d3 = d3
const app = createApp(App)
//svg-icon
//import svg-icon doc in  https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', svgIcon)
console.log(import.meta.env.VITE_APP_BASE_URL, 'VITE_APP_BASE_URL')
app.use(router).use(createPinia()).directive('loading', vLoading).mount('#app')

// setTimeout(()=>{
// 	app.mount('#app')
// },10000)

import './assets/main.css'
// src/main.ts
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
// 引入 locales/index.ts 文件，请确认引入路径是否正确
import VueI18n from './TUIRoom/locales/index';
import ElementPlus from 'element-plus';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'



const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueI18n);
app.use(ElementPlus, {
    locale: zhCn,
})
// app.use(ElementTiptapPlugin,{
//   lang: 'zh', // 设置语言为中文
// });
app.mount('#app')

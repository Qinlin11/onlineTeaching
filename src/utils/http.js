import axios from "axios";
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const http  = axios.create({
    baseURL: '/api',
    timeout: 50000,
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
    //1.从pinia获取token数据
    const userStore = useUserStore()
    // 获取token
    const token = userStore.userInfo.token
    if(token) {
        config.headers.Authorization = `bearer ${token}`
    }
    // 在发送请求之前做些什么
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

http.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()
    const router = useRouter()
    //统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    //401 token失效处理
    //1.清除本地用户数据
    //2.跳转登录页
    console.log(e.response)
    if(e.response.status === 401 || e.response.data.code === 0) {
        console.log(111)
        userStore.clearInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default http

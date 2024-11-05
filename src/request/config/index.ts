import axios from 'axios'
import { getQueryString } from '@/untils/common.js';
import Qs from 'qs'
// 创建axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,// 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间(毫秒)
    withCredentials:true,
    // headers: {
    // 设置后端需要的传参类型
    // 'Content-Type': 'application/json',
    // 'token': x-auth-token',//一开始就要token
    // 'X-Requested-With': 'XMLHttpRequest',
    // },
})
request.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
//TODO GET 请求 params 序列化
request.defaults.paramsSerializer = function (params) {
    return Qs.stringify(params)
}
// request拦截器
request.interceptors.request.use(
    config => {
        console.log(config.url)
        if (localStorage.getItem('token')&& config.url != '/v1/member/oauth') {
            config.headers.Authorization = 'Bearer' + (localStorage.getItem('token') ? localStorage.getItem('token') : getQueryString()?.token)
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error)
    }
)
 
// response 拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data
    },
    error => {  
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
export default request
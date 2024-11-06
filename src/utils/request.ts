import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showNotify } from 'vant'
import { localStorage } from '@/utils/local-storage'

// 这里是用于设定请求后端时，所用的 Token KEY
// 可以根据自己的需要修改，常见的如 Access-Token，Authorization
// 需要注意的是，请尽量保证使用中横线`-` 来作为分隔符，
// 避免被 nginx 等负载均衡器丢弃了自定义的请求头
export const REQUEST_TOKEN_KEY = 'Access-Token'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 60000, // 请求超时时间
})

export type RequestError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

// 异常拦截处理器
function errorHandler(error: RequestError): Promise<any> {
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 无权限
    if (status === 403) {
      showNotify({
        type: 'danger',
        message: (data && data.message) || statusText,
      })
    }
    // 401 未登录/未授权
    if (status === 401 && data.result && data.result.isLogin) {
      showNotify({
        type: 'danger',
        message: 'Authorization verification failed',
      })
      // 如果你需要直接跳转登录页面
      // location.replace(loginRoutePath)
    }
  }
  return Promise.reject(error)
}

// 请求拦截器
function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  if (config.url == '/v1/member/oauth') {
    return config
  }
  if (localStorage.get('token')) {
    config.headers.Authorization = 'Bearer' + localStorage.get('token')
  }
  return config
}

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler)

// Res是返回的参数，返回对数统一管理***
export type Res<TData> = Promise<ItypeAPI<TData>>;

export interface ItypeAPI<TData = unknown> {
  data: TData,//请求的数据，用泛型
  msg: string | null // 返回状态码的信息，如请求成功等
  code: number //返回后端自定义的200，404，500这种状态码
}

// 响应拦截器
function responseHandler(response) {
  return response.data
}

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler)

export default request

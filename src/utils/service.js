import axios from 'axios'
import router from '@/router'
axios.defaults.withCredentials = true
//axios.defaults.headers.post['Content-Type']="application/json"
// 创建一个axios实例
const service = axios.create({
  //baseURL: 'http://localhost:7000/api',  // 后端接口的基础路径
  baseURL: '/api',
  timeout: 10000 // 请求超时时间 30-30000ms
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log("request error:" + error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做一些处理，这里只返回响应数据中的data部分
    let res = response

    // 兼容服务器端的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res
    }

    return res;
  },

  error => {
    // 对响应错误做些什么
    console.log('response err:' + error)
    return Promise.reject(error)
  }
)

export default service
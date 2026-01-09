import axios from "axios"
import { Message } from "element-ui"
import { get, merge } from "lodash-es"
import Cookie from "js-cookie";

/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
    this.$store.commit('clearToken')
    this.$store.commit('clearMenu')
    this.$router.push('/')
}

/** 创建请求实例 */
function createService() {
    // 创建一个 axios 实例
    const service = axios.create()
    // 请求拦截
    service.interceptors.request.use(
        (config) => config,
        // 发送失败
        (error) => Promise.reject(error)
    )
    // 响应拦截
    service.interceptors.response.use(
        (response) => {
            const apiData = response.data
            const responseType = response.request?.responseType
            if (response.status === 200) return response
        },
        (error) => {
            const status = get(error, "response.status")
            switch (status) {
                case 400:
                    error.message = "请求错误"
                    break
                case 401:
                    logout()
                    break
                case 403:
                    error.message = "拒绝访问"
                    break
                case 404:
                    error.message = "请求地址出错"
                    break
                case 408:
                    error.message = "请求超时"
                    break
                case 500:
                    error.message = "服务器内部错误"
                    break
                case 501:
                    error.message = "服务未实现"
                    break
                case 502:
                    error.message = "网关错误"
                    break
                case 503:
                    error.message = "服务不可用"
                    break
                case 504:
                    error.message = "网关超时"
                    break
                case 505:
                    error.message = "HTTP 版本不受支持"
                    break
                default:
                    break
            }
            Message.error(error.message)
            return Promise.reject(error)
        }
    )
    return service
}

/** 创建请求方法 */
function createRequest(service) {
    return function(config) { // 这里使用普通函数
        const token = Cookie.get('token')
        const defaultConfig = {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            timeout: 60 * 5000,
            baseURL: 'http://127.0.0.1:9090/',
            data: {}
        };
        const mergeConfig = merge(defaultConfig, config);
        return service(mergeConfig);
    }
}


// 创建请求实例和请求方法
const service = createService()
export const request = createRequest(service)


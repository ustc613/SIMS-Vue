import Axios from 'axios'
import preference from './preference'
import { Message } from "@arco-design/web-vue"

const instance = Axios.create({
    timeout: 1000 * 8,
    withCredentials: true,
})

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
const baseURL = import.meta.env.MODE === 'production' ? 'https://sims-api.sudocs.com' : 'http://localhost:8080'
instance.defaults.baseURL = baseURL

// 设置超时时间
instance.defaults.timeout = 5000

// 超时重新请求参考 https://juejin.im/post/5abe0f94518825558a06bcd9

// 请求拦截器，设置请求头 Authorization
instance.interceptors.request.use(
    config => {
        const token = preference.get('token')
        if (token) {
            config.headers.Authorization = `Bearer ${ token }`
        }

        // 如果没有配置重新请求次数，设置默认为2
        if (config.retry === undefined) {
            config.retry = 0
        } else {
            // 剩余重新请求次数减一
            config.retry -= 1
        }
        return config
    },
)

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        case 403:
            console.log('permission deny')
            break
        case 500:
        case 502:
            console.log('server error')
            break
        default:
            console.log(other)
            break
    }
}

// axios 错误处理，resolve(null) 返回一个null阻止浏览器console打印报错信息
function axiosRejectHandler(error) {
    console.error(error.code, error.message)
    const { response } = error
    if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response.data.message)
        return Promise.resolve(null)
    } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        if (!window.navigator.onLine) {
            // store.commit('changeNetwork', false)
        } else {
            return Promise.resolve(null)
        }
    }
}

function isTimeout(err) {
    return err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1
}

// 错误处理遇到错误不reject而是resolve({})空对象
instance.interceptors.response.use(
    function (res) {
        // 当请求成功时，返回res.data
        return Promise.resolve(res.data)
    },
    function (err) {
        const config = err.config
        console.log(config)

        // 如果不是超时
        if (!isTimeout(err)) {
            return axiosRejectHandler(err)
        }

        // 如果不是请求的API，不重新请求
        if (config.baseURL !== baseURL) {
            return axiosRejectHandler(err)
        }

        // 剩余重新请求次数为0
        if (!config || config.retry === 0) {
            return axiosRejectHandler(err)
        }

        console.log('request timeout, retry')

        const backoff = new Promise(function (resolve) {
            setTimeout(() => {
                resolve()
            }, 500) // 重新请求间隔500ms
        })

        return backoff.then(function () {
            return instance.request(config)
        })
    },
)

export default instance
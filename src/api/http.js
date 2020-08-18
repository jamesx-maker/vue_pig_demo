import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router/index.js'

let loading

function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(
  (confing) => {
    startLoading()

    // 设置请求头
    if (sessionStorage.token) {
      confing.headers.Authorization = 'JWT ' + sessionStorage.token
    }

    return confing
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截

axios.interceptors.response.use(
  (response) => {
    endLoading()
    return response
  },
  (error) => {
    // Message.error(error.response.data)
    // Message.error('请求失败，请重试')
    endLoading()

    // 获取状态码
    const { status } = error.response

    if (status === 401) {
      Message.error('用户名或密码错误，请重试')
      // 清除token
      localStorage.removeItem('token')
      // 跳转到登录页面
      router.push('/login')
    } else if (status === 403) {
      // token已过期
      // 清除token
      localStorage.removeItem('token')
      // 跳转到登录页面
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default axios

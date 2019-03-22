// 处理axios请求响应
import axios from 'axios'
// import { Indicator, Toast } from 'mint-ui'

const Axios = axios.create({
  timeout: 6000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
})

// 请求拦截，处理
Axios.interceptors.request.use(config => {
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'double-bounce'
  // })
  return config
}, error => {
  console.log('进入请求错误')
  return Promise.reject(error)
})

// 响应处理
Axios.interceptors.response.use(res => {
  // setTimeout(function () {
  //   Indicator.close()
  // }, 300)

  // if (res.status !== 200) {
  //   Toast({
  //     message: '响应出错！',
  //     position: 'bottom',
  //     duration: 3000
  //   })
  // }
  return res
}, error => {
  console.log('进入响应错误')
  // Toast({
  //   message: error.message,
  //   position: 'bottom',
  //   duration: 5000
  // })
  return Promise.reject(error)
})

export default Axios

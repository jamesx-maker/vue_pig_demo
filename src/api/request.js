import axios from '../api/http'
import base from './base'

//
// 这是测试接口的方法
// get方法，对应get请求
// @desc登录请求
// @param {String} url [请求的url地址]
// @param {Object} params [请求时携带的参数]
//
export function TestLogin () {
  return axios({
    url: `${base.url}/login/`,
    method: 'get'
  })
}

// post方法，对应post请求
// @desc注册请求
// @param {String} url [请求的url地址]
// @param {Object} params [请求时携带的参数]
export function Login (data) {
  return axios({
    url: `${base.url}/login/`,
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 查询饲喂站id
export function getstation (data) {
  return axios({
    url: `${base.url}/station/`,
    method: 'get',
    params: data
    // params: { params: JSON.stringify(data) }
  })
}

// 添加饲喂站id
export function addstation (data) {
  return axios({
    url: `${base.url}/station/`,
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 获取猪只信息
export function getStationPig (data) {
  return axios({
    url: `${base.url}/pigbase/`,
    method: 'get',
    params: data
  })
}

// 入栏母猪
export function additionpig (data) {
  return axios({
    url: `${base.url}/pigbase/`,
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 离栏母猪
export function subtractionpig (data) {
  return axios({
    url: `${base.url}/pigbase/`,
    method: 'delete',
    data: JSON.stringify(data)
  })
}

// 获取拟合散点
export function getpoint () {
  return axios({
    url: `${base.url}/getpoint/`,
    method: 'get'
  })
}

// 获取拟合函数
export function getcoefficient () {
  return axios({
    url: `${base.url}/getcoefficient/`,
    method: 'get'
  })
}

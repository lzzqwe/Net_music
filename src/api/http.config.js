import axios from 'axios'
import { Notify } from 'vant';
/*
* 全局 axios 默认配置
*/
axios.defaults.timeout = 50000
axios.defaults.withCredentials = true
// axios.defaults.headers.common.Authorization = ''
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.get.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['X-Requested-With'] = 'XMLHttpRequest'

  function transformRequest(param) {
    return Object.keys(param).map(key => {
      const value = typeof param[key] === 'object' ? encodeURIComponent(JSON.stringify(param[key])) : param[key]
      return `${key}=${value}`
    }).join('&')
  }

  function request(options) {
    return new Promise((resolve, reject) => {
      axios(options).then(res => {
        if (res.data.code === 200) {
          resolve(res.data)
        } else if (res.data.code === 302) {
          window.location.href = res.data.data
        } else {
          // Message.error(res.data.msg)
          Notify(res.data.msg);
        }
      }, err => {
        handleError(err)
        reject(err)
      })
    })
  }

  function handleError(error) {
    Message.error(error)
    console.log(error)
  }

  export default {
    get(url, params = {}) {
      return request({
        url: url,
        method: 'get',
        params: params,
        paramsSerializer: function (params) {
          return transformRequest(params)
        }
      })
    },

    post(url, data = {}) {
      return request({
        url: url,
        method: 'post',
        data: data,
        transformRequest: [function (data, headers) {
          return JSON.stringify(data)
        }]
      })
    },
    put(url, data = {}) {
      return request({
        url: url,
        method: 'put',
        data: data,
        transformRequest: [function (data, headers) {
          return JSON.stringify(data)
        }]
      })
    },
    delete(url, params) {
      return request({
        url: url,
        method: 'delete',
        params: params,
        paramsSerializer: function (params) {
          return transformRequest(params)
        }
      })
    },
    head(url, params) { },
    options(url, params) { },

    patch(url, params) { }
  }

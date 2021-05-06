import axios from 'axios'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  if (/get/i.test(config.method)) { //判断get请求
    config.params = config.params || {};
    config.params.t = Date.parse(new Date()) / 1000; //添加时间戳
  }
  return config;
}, error => {
  return Promise.reject(error);
})
export default (url, data = {}, type = 'GET') => {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      promise = axios.get(url, { params: data })
    }
    if (type === 'POST') {
      promise = axios.post(url, data)
    }
    promise.then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}


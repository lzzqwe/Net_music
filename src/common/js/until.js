import axios from 'axios'

const service = axios.create({
    baseURL:'',
    withCredentials:true,
    timeout:5000
})

service.interceptors.request.use(function(config) {
  // 在请求之前做些什么
  if (/get/i.test(config.method)) { //判断get请求
    config.params = config.params || {};
    config.params.t = Date.parse(new Date()) / 1000; //添加时间戳
  }
  console.log(config)
  return config
},function(error) {
   // 对应请求错误的话做些什么
   return Promise.reject(error)
})

service.interceptors.response.use(function(response) {
    // 对响应的数据做些什么
    return Promise.resolve(response)
},function(error) {
    // xiangyin
   return Promise.reject(error)
})
export default service

import axios from 'axios'
axios.defaults.withCredentials = true
export default (url,data={},type='GET') => {
  return new Promise((resolve, reject) => {
    let promise
    if(type==='GET') {
      promise = axios.get(url,{params:data})
    }
    if(type==='POST') {
      promise =axios.post(url,data)
    }
    promise.then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}


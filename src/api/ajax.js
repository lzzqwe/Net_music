import axios from 'axios'

import Vue from 'vue'
import {
    Toast
} from 'vant'
Vue.use(Toast)

export default (url, data = {}, type = 'GET') => {
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        promise.then((res) => {
            resolve(res.data)
        }, (err) => {
            reject(err);
            Toast('服务器请求失败')
        })
    })
}
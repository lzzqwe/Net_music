import axios from 'axios'

import Vue from 'vue'
import {
    Toast
} from 'vant'
Vue.use(Toast)
 // promise 是解决异步编程的 一种方案
/*
* promise 有三种状态
* 1 已成功 已失败 进行中
* 2 一旦状态改变 就不会改变  任何时候都是这个结果
* */
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

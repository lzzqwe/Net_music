import axios from 'axios'


let BASE = ''
const env = process.env.NODE_ENV
if (env === 'development') {
    BASE = 'http://127.0.0.1:3000'
} else if (env === 'production') {
    BASE = ''
}

export const getLyric = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE}/lyric?id=${id}`).then((res) => {
            res = res.data
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const getComment = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE}/comment/music?id=${id}`).then((res) => {
            res = res.data
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

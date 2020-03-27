import axios from 'axios'

export const getLyric = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/lyric?id=${id}`).then((res) => {
            res = res.data
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const getComment = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/comment/music?id=${id}`).then((res) => {
            res = res.data
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
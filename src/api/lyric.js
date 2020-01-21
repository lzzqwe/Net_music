import axios from 'axios'

export function getLyric (id) {
	 return new Promise((resolve,reject) => {
       axios.get(`/lyric?id=${id}`).then((res) => {
       	res = res.data
         resolve(res)
      }).catch((err) => {
          reject(err)
      })
	 })
}
export function getComment(id) {
   return new Promise((resolve,reject) => {
     axios.get(`/comment/music?id=${id}`).then((res) => {
       res = res.data
       resolve(res)
     }).catch((err) => {
       reject(err)
     })
   })
}
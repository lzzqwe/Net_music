import { getLyric, getComment } from 'api/lyric.js'
import Vue from 'vue'
import {
    Toast
} from 'vant'
Vue.use(Toast)
export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

    _getLyric() {
        // if (this.lyric) {
        //     return Promise.resolve(this.lyric)
        // }
        return new Promise((resolve, reject) => {
            getLyric(this.id).then((res) => {
                // this.lyric = res.lrc.lyric
                resolve(res)
            }).catch((err) => {
                Toast('很抱歉没有歌词')
                reject(err)
            })
        })
    }
    _getComment() {
        if (this.comment) {
            return Promise.resolve(this.comment)
        }
        return new Promise((resolve, reject) => {
            getComment(this.id).then((res) => {
                // this.comment = res.hotComments.concat(res.comments)
                resolve(res)
            }).catch((err) => {
                Toast('没有评论')
                reject(err)
            })
        })
    }
}

export const createSong = (musicData) => {
    return new Song({
        id: musicData.id,
        mid: musicData.mid,
        singer: musicData.singer,
        name: musicData.name,
        album: musicData.album,
        duration: musicData.duration,
        image: musicData.image,
        url: genSongPlayUrl(musicData.id)
    })
}

const genSongPlayUrl = (id) => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
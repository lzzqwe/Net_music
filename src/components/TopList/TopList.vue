<template>
    <music-list :title='title' :bgImage='bgImage' :songs='songlist'></music-list>
</template>
<script>
const MAX = 500
import MusicList from 'base/MusicList/MusicList'

import { getTopDetail,getSongDetail } from 'api/index.js'

import { mapGetters } from 'vuex'

import { createSong } from 'common/js/song'

export default {
    name: 'TopList',
    created() {
        this._getTopDetail()
    },
    data() {
        return {
            songlist: [],
            idx: parseInt(this.$route.params.id)
        }
    },
    computed: {
        title() {
            return this.topList.name
        },
        bgImage() {
            if (this.songlist.length) {
                return this.songlist[0].image
            } else {
                return ''
            }
        },
        ...mapGetters(['topList'])
    },
    methods: {
        async _getTopDetail() {
            if (!this.$route.params.id) {
                this.$router.push('/rank')
            }
            const { code, playlist } = await getTopDetail(this.idx)
            if (code === 200) {
              this._nomalizeSongs(playlist)
            }
        },
        async _nomalizeSongs(list) {
            const trackIds = list.trackIds.map(({ id }) => id)
            const copyTrackIds = trackIds.slice(0, MAX)
            const { songs } = await getSongDetail(copyTrackIds)
            const songList = songs.map(({ id, name, ar, al, dt }) => {
                return createSong({
                    id,
                    mid: al.id,
                    singer: ar[0].name,
                    name,
                    album: al.name,
                    duration: dt / 1000,
                    image: al.picUrl
                })
            })

            this.songlist = songList
        },
    },
    components: {
        MusicList
    }
}
</script>
<style lang="less" scoped>
</style>
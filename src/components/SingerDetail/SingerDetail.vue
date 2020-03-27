<template>
  <music-list 
   :title="title"
   :bgImage ='bgImage'
   :songs='songlist'
  ></music-list> 
</template>
<script>
import MusicList from 'base/MusicList/MusicList'
import {mapGetters} from 'vuex'
import {getArtistSongs} from 'api/index.js'
import {createSong} from 'common/js/song'
export default {
    name:'SingerDetail',
    components:{
      MusicList
    },
    data() {
     return {
       songlist:[]
     }
    },
    computed:{
      ...mapGetters(['singer']),
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.picUrl
      }
    },
    created() {
      this._getArtistSongs()
    },
    methods:{
      async _getArtistSongs() {
        if(!this.singer.id) {
          this.$router.push('/singer')
          return
        }
       const {code,songs} =await getArtistSongs(this.singer.id)
       if(code === 200) {
        this._nomalizeSongs(songs)
       }
      },
      async _nomalizeSongs(list) {
      const songList = list.map(({id,name,ar,al,dt}) => {
        return createSong({
          id,
          mid:al.id,
          singer:ar[0].name,
          name,
          album:al.name,
          duration:dt/1000,
          image:al.picUrl
        })
      })

      this.songlist = songList
  },
    }
}
</script>
<style lang="less" scoped>
 
</style>

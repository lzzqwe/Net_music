import { mapGetters } from 'vuex'
export const playListMixin = {
    watch: {
        playList(val) {
            this.handlePlaylist(val)
        }
    },
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    activated() {
        this.handlePlaylist(this.playList)
    },
    mounted() {
        this.handlePlaylist(this.playList)
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handleplaylist')
        }
    }
}
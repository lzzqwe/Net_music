import {
    SET_BANNERS,
    SET_PLAYLIST,
    SET_CURRENTINDEX,
    SET_FULLSCREEN,
    GET_PRIVATEFM,
    SET_PLAYING_STATUS,
    SAVE_USER_INFO,
    SET_OBJ,
    SAVE_FAVORITE,
    SAVE_HISTORY,
    CLEAR_USER_INFO,
    CLAER_PLAYLIST,
    SET_SEARCHES,
    CLEAR_ALL_SEARCHES,
    SET_TOKEN
} from './mutation-types'
export default {
    [SET_FULLSCREEN](state, fullscreen) {
        state.fullscreen = fullscreen
    },
    [SET_PLAYLIST](state, playlist) {
        state.playList = playlist
    },
    [SET_CURRENTINDEX](state, currentIndex) {
        state.currentIndex = currentIndex
    },
    [SET_BANNERS](state, banners ) {
        state.banners = banners
    },
    [GET_PRIVATEFM](state, { privateFm }) {
        state.privateFm = privateFm
    },
    [SET_PLAYING_STATUS](state, playing) {
        state.playing = playing
    },
    [SAVE_USER_INFO](state, userInfo) {
        state.user = userInfo
    },
    [SET_OBJ](state, { obj }) {
        state.obj = obj
    },
    [SAVE_FAVORITE](state, { favorite }) {
        state.favorite = favorite
    },
    [SAVE_HISTORY](state, { history }) {
        state.playHistory = history
    },
    [CLEAR_USER_INFO](state) {
        state.user = {}
    },
    [CLAER_PLAYLIST](state) {
        state.playList = []
    },
    [SET_SEARCHES](state, searches) {
        state.searches = searches
    },
    [CLEAR_ALL_SEARCHES](state) {
        state.searches = []
    },
    [SET_TOKEN](state,token) {
      state.token = token
    }
}

import { getPrivateFm, getHomeSwiper } from '../api/index.js'
import { createSong } from '../common/js/song'
import { saveSearches, clearAllSearches } from '../common/js/cache'
import {
    SET_BANNERS,
    SET_CURRENTINDEX,
    SET_PLAYLIST,
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
    async set_banners({ commit }) {
        const params = {
            type: 1,
        };
        const res = await getHomeSwiper(params)
        if (res.code === 200) {
            commit(SET_BANNERS, res.banners)
        }
    },
    select_play({ commit }, { playlist, index }) {
        commit(SET_PLAYLIST, playlist)
        commit(SET_CURRENTINDEX, index)
        commit(SET_PLAYING_STATUS, true)
        commit(SET_FULLSCREEN, true)
    },
    async get_privateFm({ dispatch, commit, state }) {
        const res = await getPrivateFm()
        let result = []
        res.data.forEach((item) => {
            result.push(createSong({
                id: item.id,
                picUrl: item.album.picUrl,
                duration: item.duration,
                singer: item.artists[0].name,
                name: item.name
            }))
        })
        commit(GET_PRIVATEFM, { privateFm: result })
        await dispatch('select_play', { playlist: state.privateFm, index: 0 })
    },
    save_user_info({ commit }, userInfo) {
        commit(SAVE_USER_INFO, userInfo)
    },
    save_obj({ commit }, { obj }) {
        commit(SET_OBJ, { obj })
    },
    save_favorite({ commit }, { favorite }) {
        commit(SAVE_FAVORITE, { favorite })
    },
    save_history({ commit }, { history }) {
        commit(SAVE_HISTORY, { history })
    },
    save_searches({ commit }, searches) {
        console.log(searches);
        commit(SET_SEARCHES, saveSearches(searches))
    },
    clear_all_searches({ commit }) {
        commit(CLEAR_ALL_SEARCHES, clearAllSearches())
    },
    clear_user_info({ commit }) {
        commit(CLEAR_USER_INFO)
    },
    clear_playlist({ commit }) {
        commit(CLAER_PLAYLIST)
        commit(SET_CURRENTINDEX, -1)
        commit(SET_PLAYING_STATUS, false)
    },
    save_token({ commit }, token) {
        commit(SET_TOKEN, token)
    }
}
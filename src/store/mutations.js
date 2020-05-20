import {
  SET_SINGER,
  SET_DISC,SET_PLAYLIST,
  SET_FAVORITE_LIST,
  SET_TOPLIST,
  SET_FULLSCREEN,
  SET_PLAYING_STATE,
  SET_CURRENTINDEX,
  SET_SEQUENCELIST,
  SET_MODE,
  SET_SEARCH_HISTORY,
  SET_PLAY_HISTORY
} from './mutation-type'
export default {
  [SET_SINGER](state,singer) {
      state.singer = singer
  },
  [SET_DISC](state,disc) {
     state.disc = disc
  },
  [SET_TOPLIST](state,topList) {
     state.topList = topList
  },
  [SET_FULLSCREEN](state,fullscreen) {
    state.fullscreen = fullscreen
  },
  [SET_PLAYING_STATE](state,playing) {
    state.playing = playing
  },
  [SET_CURRENTINDEX](state,currentIndex) {
    state.currentIndex = currentIndex
  },
  [SET_SEQUENCELIST](state,sequenceList) {
    state.sequenceList = sequenceList
  },
  [SET_PLAYLIST](state,playList) {
    state.playList = playList
  },
  [SET_MODE](state,mode) {
    state.mode = mode
  },
  [SET_SEARCH_HISTORY](state,searchHistory) {
    state.searchHistory = searchHistory
  },
  [SET_PLAY_HISTORY](state,playHistory) {
    state.playHistory = playHistory
  },
  [SET_FAVORITE_LIST](state,favoriteList) {
    state.favoriteList = favoriteList
  }
}

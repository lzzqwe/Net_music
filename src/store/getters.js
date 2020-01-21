export default {
    singer(state) {
      return state.singer
    },
    disc(state) {
      return state.disc
    },
    topList(state) {
      return state.topList
    },
    playList(state) {
      return state.playList
    },
    fullscreen(state) {
      return state.fullscreen
    },
    sequenceList(state) {
      return state.sequenceList 
    },
    currentIndex(state) {
      return state.currentIndex
    },
    currentSong(state) {
      return state.playList[state.currentIndex] || {}
    },
    playing(state) {
      return state.playing
    },
    mode(state) {
      return state.mode
    },
    searchHistory(state) {
      return state.searchHistory
    },
    playHistory(state) {
      return state.playHistory
    },
    favoriteList(state) {
      return state.favoriteList
    }
}
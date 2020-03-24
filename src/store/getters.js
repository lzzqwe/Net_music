export default {
  singer: state => state.singer,

  disc: state => state.disc,
  
  topList: state => state.topList,

  playList: state => state.playList,

  fullscreen: state => state.fullscreen,

  sequenceList: state => state.sequenceList,

  currentIndex: state => state.currentIndex,

  currentSong: state => state.playList[state.currentIndex] || {},

  playing: state => state.playing,

  mode: state => state.mode,

  searchHistory: state => state.searchHistory,

  playHistory: state => state.playHistory,

  favoriteList: state => state.favoriteList

}
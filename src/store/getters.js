export default {
  user:state =>  { return state.user},
  fullscreen:state => {return state.fullscreen},
  playList:state => state.playList,
  currentIndex:state => state.currentIndex,
  currentSong:state => state.playList[state.currentIndex] || {},
  banners:state => state.banners,
  playing:state => state.playing,
  obj:state => state.obj,
  favorite:state => state.favorite,
  history:state => state.playHistory
}

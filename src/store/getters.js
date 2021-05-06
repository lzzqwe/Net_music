export default {
    user: state => { return state.user },
    banners: state => { return state.banners },
    fullscreen: state => { return state.fullscreen },
    playList: state => state.playList,
    currentIndex: state => state.currentIndex,
    currentSong: state => state.playList[state.currentIndex] || {},
    playing: state => state.playing,
    obj: state => state.obj,
    favorite: state => state.favorite,
    history: state => state.playHistory,
    searches: state => state.searches,
    token: state => state.token
}
import{playMode} from 'common/js/config'
import {loadSearch,loadPlay,loadFavorite} from 'common/js/cache'
export default {
    singer:{},
    disc:{},
    topList:{},
    playList:[], // 播放列表
    sequenceList:[], // 顺序列表
    currentIndex:-1, // 当前歌曲的索引
    playing:false,  // 播放状态
    fullscreen:false, // 是否全屏
    mode:playMode.sequence,
    searchHistory:loadSearch(),//本地的缓存去读取数据
    playHistory:loadPlay(),
    favoriteList:loadFavorite()
}
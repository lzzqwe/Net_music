import{playMode} from 'common/js/config'
import {loadSearch,loadPlay,loadFavorite} from 'common/js/cache'
export default {
    singer:{}, // 歌曲
    disc:{},// 专辑
    topList:{},//排行榜
    playList:[], // 播放列表
    sequenceList:[], // 顺序列表
    currentIndex:-1, // 当前歌曲的索引
    playing:false,  // 播放状态
    fullscreen:false, // 是否全屏
    mode:playMode.sequence, // 播放模式
    searchHistory:loadSearch(),//本地的缓存去读取数据
    playHistory:loadPlay(),// 播放历史
    favoriteList:loadFavorite() // 收藏列表
}

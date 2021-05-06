import { loadUserInfo, loadFavorite, loadHistory, loadSearches } from '../common/js/cache'
import {getToken} from '../common/js/auth'
export default {
    user: loadUserInfo(), //页面刷新的时候会去localstorage读取数据
    fullscreen: false,
    currentIndex: -1,
    playList: [],
    banners: [],
    privateFm: [],
    playing: false,
    obj: {},
    favorite: loadFavorite(),
    playHistory: loadHistory(),
    searches: loadSearches(),
    list:[],
    token:getToken() || ''
}

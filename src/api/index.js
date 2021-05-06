import ajax from './ajax.js'
import http from './http.config'
//基础地址
let BASE
if (process.env.VUE_APP_ENV === 'development') {
    BASE = 'http://127.0.0.1:3000'
} else if (process.env.VUE_APP_ENV === 'production') {
    BASE = ''
}
/*
 * 1.获取移动端首页的轮播图
 */
export const getHomeSwiper = (params) => {
    return http.get(BASE + '/banner', params)
}
/*
 * 2.推荐歌单 /personalized?limit=10
 * */
export const getRecommendList = (params) => {
    return http.get(BASE + '/personalized', params)
}
/*
 * 3.私人定制 获取最新的音乐  /personalized/newsong
 * */
export const getPrivateMusic = (params) => {
    return http.get(BASE + '/personalized/newsong', params)
}
/*
 * 4.歌单标签 就是歌单分类
 * */
export const getSongsTags = (params) => {
    return http.get(BASE + '/playlist/catlist',params)
}
/*
 * 5.歌单列表
 * */
export const getSongList = (params) => {
    return http.get(BASE + '/top/playlist',params)
}
/*
 * 6.热搜列表详细
 * */
export const getHotSearchDetail = (params) => {
    return http.get(BASE + '/search/hot/detail',params)
}
/*
 * 7.搜索建议
 * */
export const getSearchSuggest = (params) => {
    return http.get(BASE + '/search/suggest', params)
}
/*
 * 8.登录
 * */
export const getLogin = (params) => {
    return http.post(BASE + '/login/cellphone',params)
}
/*
 * 9.每日推荐
 * */
export const getDayRecommend = (params) => {
    return http.get(BASE + '/recommend/songs',params)
}
/*
 * 10.获取歌单详情
 * */
export const getSongListDetail = (params) => {
    return http.get(BASE + '/playlist/detail', params)
}
/*
 * 11.获取歌单的所有歌曲
 * */
export const getAllSongs = (params) => {
    return http.get(BASE + '/song/detail',params)
}
/*
 * 12.获取首页的圆形图标
 * */
export const getHomeCircleIcon = (params) => {
    return http.get(BASE + '/homepage/dragon/ball',params)
}
/*
 * 13.获取歌单评论
 * */
export const getCommentPlaylist = (params) => {
    return http.get(BASE + '/comment/playlist',params)
}
/*
 * 14.获取私人FM
 * */
export const getPrivateFm = (params) => {
    return http.get(BASE + '/personal_fm',params)
}
/*
 *15.获取歌曲评论
 * */
export const getSongComment = (params) => {
    return http.get(BASE + '/comment/music', params)
}
/*
 * 16.判断音乐是否可以用
 * */
export const distinguishMusicUrl = (params) => {
    return http.get(BASE + '/check/music', params)
}
/*
 * 17.获取歌词
 * */
export const getlyric = (params) => {
    return http.get(BASE + '/lyric',params)
}
/*
 * 18.搜索
 * */
export const getSearch = (keywords, type = 1018) => {
    return ajax(BASE + '/search', { keywords, type })
}
/*
 * 21.获取歌单的排行榜
 * */
export const getTop = () => {
    return http.get(BASE + '/toplist/detail')
}
/*
 * 22.获取Mv
 * */
export const getMv = (params) => {
    return http.get(BASE + '/mv/first',params)
}
/*
 * 23.获取用户详情
 * */
export const getUserDetail = (params) => {
    return http.get(BASE + '/user/detail', params)
}
/*
 * 24.获取用户的歌单
 * */
export const getUserSonglist = (params) => {
    return http.get(BASE + '/user/playlist',params)
}
/*
 * 25.mv地址
 * */
export const getMvUrl = (params) => {
    return http.get(BASE + '/mv/url',params)
}
/*
 * 26.获取歌手详情
 * */
export const getSingerDetail = (params) => {
    return http.get(BASE + '/artist/detail',params)
}
/*
 * 27.获取mv的数据
 * */
export const getMvDetail = (params) => {
    return http.get(BASE + '/mv/detail',params)
}
/*
 * 28.获取 mv 点赞转发评论数数据
 * */
export const getMvInfo = (params) => {
    return http.get(BASE + '/mv/detail/info',params)
}
/**
 * 30.mv评论
 */
export const getMvComment = (params) => {
    return http.get(BASE + '/comment/mv',params)
}
/**
 * 31.获取用户的信息
 */
export const getuserInfo = (params) => {
    return http.get(BASE + '/user/detail',params)
}
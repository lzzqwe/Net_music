import ajax from './ajax'
let BASE = ''
const env = process.env.NODE_ENV
if (env === 'development') {
    BASE = 'http://127.0.0.1:3000'
} else if (env === 'production') {
    BASE = ''
}
//获取轮播图  /banner?type=1
export const getlunbo = () => ajax(BASE + '/banner', { type: 1 })
    // 获取推荐歌单
export const getRecommend = () => ajax(BASE + '/personalized?limit=6')

//获取歌单详情
export const getdetail = (id) => ajax(BASE + '/playlist/detail', { id })
    //获取热门歌手列表
export const getHotSinger = () => ajax(BASE + '/top/artists?offset=0')
    // 获取歌手列表
export const getSinger = (cat, initial) => ajax(BASE + '/artist/list', { cat, limit: 100, initial })
    // 歌手热门50首歌曲
export const getArtistSongs = (id) => ajax(BASE + '/artist/top/song', { id })

// 获取音乐详情
export const getSongDetail = (ids) => ajax(BASE + `/song/detail?ids=${ids}`)

//所有榜单 toplist

export const getToplist = () => ajax(BASE + '/toplist/detail')
    //排行榜top/list
export const getTopDetail = (idx) => ajax(BASE + '/top/list', { idx })
    // 热搜关键词/search/hot
export const getHotKey = () => ajax(BASE + '/search/hot/detail')
    // 搜索 /search?keywords= 海阔天空
export const getSearch = (keywords, limit, offset, type) => ajax(BASE + '/search', { keywords, limit, offset, type })
    // 获取歌词接口
export const getLyric = (id) => ajax(BASE + '/lyric', { id })
    // 歌单分类
export const getSongClassify = () => ajax(BASE + '/playlist/catlist')
    // 歌单
export const getPlayList = (cat, limit, offset) => ajax(BASE + '/top/playlist', {
        cat,
        limit,
        offset
    })
    //新歌速递
export const getNewSong = (type) => ajax(BASE + '/top/song', { type })
    //mv 排行
export const getMvRank = (offset, limit) => ajax(BASE + '/top/mv', { offset, limit })
    // 获取mv数据
export const getMvData = (mvid) => ajax(BASE + '/mv/detail', { mvid })
    // 获取mv热门评论
export const getMvComment = (id) => ajax(BASE + '/comment/mv', { id })
    //获取视频标签列表
export const getVideoGroup = () => ajax(BASE + '/video/group/list')
    //获取视频标签下的视频
export const getVideo = ({ id }) => ajax(BASE + '/video/group', { id })
    ///   全部 mv  mv/all?area=港台
export const getAllMv = (area, limit, offset, order) => ajax(BASE + '/mv/all', { area, limit, offset, order })
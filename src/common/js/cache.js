import storage from 'good-storage'

const SEARCH_KEY = '__search__'

const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'

const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'

const FAVORITE_MAX_LEN = 200

// 插入数组中的某个元素
function insertArray(arr,val,compare,maxlen) {
   const index = arr.findIndex(compare)
   if(index ===0 ) {
       return
   }
   if(index > 0) {
       arr.splice(index,1)
   }
   arr.unshift(val)
   if(maxlen && arr.length > maxlen) {
       arr.pop()
   }
}
// 删除数组中的某个元素
function deleteArray(arr,compare) {
  const index = arr.findIndex(compare)
  if(index > -1) {
      arr.splice(index,1)
  }
}
// 本地的缓存去读取数据
export function loadSearch() {
    return storage.get(SEARCH_KEY,[])
}
// 保存 搜索历史
export function saveSearch(query) {
    // 如果没有 则返回空数组
    let searchs = storage.get(SEARCH_KEY,[])
    insertArray(searchs,query,(item) => {
      return item == query
    },SEARCH_MAX_LEN)
    storage.set(SEARCH_KEY,searchs)
    return searchs
}

// 清空某个搜索历史
export function deleteSearch(query) {
    let searchs = storage.get(SEARCH_KEY,[])
    deleteArray(searchs,(item) => {
      return item === query 
    })
    storage.set(SEARCH_KEY,searchs)
    return searchs
}
// 清空所有的搜索历史
export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}

// export function loadPlay() {
//     return storage.get(PLAY_KEY,[])
// }
// console.log(loadPlay())
export function savePlay(song) {
    let plays = storage.get(PLAY_KEY,[])
    insertArray(plays,song,(item) => {
      return item.id === song.id 
    },PLAY_MAX_LEN)
    storage.set(PLAY_KEY,plays)
    return plays
}

export function loadPlay () {
    return storage.get(PLAY_KEY, [])
  }

export function loadFavorite() {
    return storage.get(FAVORITE_KEY,[])
}

export function saveFavorite(song) {
    let favorites = storage.get(FAVORITE_KEY,[])
    insertArray(favorites,song,(item) => {
        return item.id === song.id
    },FAVORITE_MAX_LEN)
    storage.set(FAVORITE_KEY,favorites)
    return favorites
}

export function deleteFavorites (song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteArray(songs, (item) => {
      return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
  }


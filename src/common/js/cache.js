import store from 'store'

const SEARCH_KEY = '__search__'

const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'

const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'

const FAVORITE_MAX_LEN = 200
    // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1
    // pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
    // unshift() 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。
    // splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
    // 插入数组中的某个元素
const insertArray = (arr, val, compare, maxLen) => {
        const index = arr.findIndex(compare)
        if (index === 0) {
            return
        }
        if (index > 0) {
            arr.splice(index, 1)
        }
        arr.unshift(val)
        if (maxLen && arr.length > maxLen) {
            arr.pop()
        }
    }
    // 删除数组中的某个元素
const deleteArray = (arr, compare) => {
        const index = arr.findIndex(compare)
        if (index > -1) {
            arr.splice(index, 1)
        }
    }
    // 本地的缓存去读取数据
export const loadSearch = () => {
        let searches = store.get(SEARCH_KEY)
        if (!searches) {
            searches = []
        }
        return searches
    }
    // 保存 搜索历史
export const saveSearch = (query) => {
    // 如果没有 则返回空数组
    let searches = store.get(SEARCH_KEY)
    if (!searches) {
        searches = []
    }
    insertArray(searches, query, (item) => {
        return item == query
    }, SEARCH_MAX_LEN)
    store.set(SEARCH_KEY, searches)
    return searches
}

// 清空某个搜索历史
export const deleteSearch = (query) => {
        let searches = store.get(SEARCH_KEY)
        if (!searches) {
            searches = []
        }
        deleteArray(searches, (item) => {
            return item === query
        })
        store.set(SEARCH_KEY, searches)
        return searches
    }
    // 清空所有的搜索历史
export const clearSearch = () => {
    store.remove(SEARCH_KEY)
    return []
}
export const savePlay = (song) => {
    let plays = store.get(PLAY_KEY)
    if (!plays) {
        plays = []
    }
    insertArray(plays, song, (item) => {
        return item.id === song.id
    }, PLAY_MAX_LEN)
    store.set(PLAY_KEY, plays)
    return plays
}

export const loadPlay = () => {
    let plays = store.get(PLAY_KEY)
    if (!plays) {
        plays = []
    }
    return plays
}

export const loadFavorite = () => {
    let favorites = store.get(FAVORITE_KEY)
    if (!favorites) {
        favorites = []
    }
    return favorites
}

export const saveFavorite = (song) => {
    let favorites = store.get(FAVORITE_KEY)
    if (!favorites) {
        favorites = []
    }
    insertArray(favorites, song, (item) => {
        return item.id === song.id
    }, FAVORITE_MAX_LEN)
    store.set(FAVORITE_KEY, favorites)
    return favorites
}

export const deleteFavorites = (song) => {
    let songs = store.get(FAVORITE_KEY)
    if (!songs) {
        songs = []
    }
    deleteArray(songs, (item) => {
        return item.id === song.id
    })
    store.set(FAVORITE_KEY, songs)
    return songs
}
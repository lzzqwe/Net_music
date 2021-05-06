import storage from 'good-storage';

const NETTOKEN = 'netToken';
// 收藏的键
const FAVORITE_KEY = '__favorite__';
const HISTORY_KEY = '__history__';
const SEARCH_KEY = '__search__'
//允许收藏的歌曲的最大量
const FAVORITE_MAX_LEN = 200;
const HISTORY_MAX_LEN = 200;
const SEARCH_KEY_LEN = 10;
//让vuex读取localstorage
export const loadUserInfo = () => {
    return storage.get(NETTOKEN, {});
}
export const saveUserInfo = (user) => {
    storage.set(NETTOKEN, user);
    return storage.get(NETTOKEN, {});
}
// 删除用户记录
export const delUserInfo = () => {
    storage.remove(NETTOKEN);
}
// 数组中插入值
const insertArray = (arr, val, compare, maxLen) => {
    const index = arr.findIndex(compare);
    if (index === 0) {
        return;
    }
    if (index > 0) {
        arr.splice(index, 1);
    }
    arr.unshift(val);
    if (arr && arr.length > maxLen) {
        arr.pop();
    }
}
// 数组中删除值
const delArr = (arr, val, compare) => {
    //找到索引
    const index = arr.findIndex(compare);
    //删除歌曲
    if (index > -1) {
        arr.splice(index, 1);
    }
}
// 保存搜索的值
export const saveSearches = (search) => {
    const arr = storage.get(SEARCH_KEY, []);
    insertArray(arr, search, (item) => {
        return item === search
    }, SEARCH_KEY_LEN)
    storage.set(SEARCH_KEY, arr);
    return arr;
}
// 删除arr
export const clearAllSearches = () => {
    const arr = storage.get(SEARCH_KEY, []);
    storage.set(SEARCH_KEY, []);
    return arr;
}
export const loadSearches = () => {
    return storage.get(SEARCH_KEY, [])
}
// 保存收藏的的值
export const saveFavorite = (song) => {
    const arr = storage.get(FAVORITE_KEY, [])
    insertArray(arr, song, (item) => {
        return item.id === song.id;
    }, FAVORITE_MAX_LEN);
    storage.set(FAVORITE_KEY, arr);
    return arr;
}
//读取收藏的值 
export const loadFavorite = () => {
    return storage.get(FAVORITE_KEY, []);
}
//删除收藏的值
export const delFavorite = (song) => {
    const arr = storage.get(FAVORITE_KEY, []);
    delArr(arr, song, (item) => {
        return item.id === song.id;
    });
    storage.set(FAVORITE_KEY, arr);
    return arr;
}
//保存播放的歌曲
export const saveHistory = (song) => {
    const arr = storage.get(HISTORY_KEY, []);
    insertArray(arr, song, (item) => {
        return item.id === song.id;
    }, HISTORY_MAX_LEN);
    storage.set(HISTORY_KEY, arr);
    return arr;
}
// 读取历史播放的歌曲
export const loadHistory = () => {
    return storage.get(HISTORY_KEY);
}
// 删除历史播放的歌曲
export const delHistory = (song) => {
    const arr = storage.get(HISTORY_KEY, []);
    delArr(arr, (item) => {
        return item.id === song.id;
    });
    storage.set(HISTORY_KEY, arr);
    return arr;
}
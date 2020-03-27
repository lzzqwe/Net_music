import { shuffle } from 'common/js/until'
import { playMode } from 'common/js/config'
import {
    saveSearch,
    deleteSearch,
    clearSearch,
    savePlay,
    saveFavorite,
    deleteFavorites
} from 'common/js/cache'
import {
    SET_PLAYLIST,
    SET_SEARCH_HISTORY,
    SET_PLAY_HISTORY,
    SET_FAVORITE_LIST,
    SET_FULLSCREEN,
    SET_PLAYING_STATE,
    SET_CURRENTINDEX,
    SET_SEQUENCELIST
} from './mutation-type'


const findIndex = (list, song) => {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

export const selectPlay = ({ commit, state }, { list, index }) =>{
    commit(SET_SEQUENCELIST, list)
    if (state.mode == playMode.random) {
        let randomList = shuffle(list)
        commit(SET_PLAYLIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(SET_PLAYLIST, list)
    }
    commit(SET_CURRENTINDEX, index)
    // commit(SET_FULLSCREEN, true)
    commit(SET_PLAYING_STATE, true)
}

export const randomPlay = ({ commit }, { list }) => {
    commit(SET_PLAYING_STATE, playMode.random)
    commit(SET_SEQUENCELIST, list)
    let randomList = shuffle(list)
    commit(SET_PLAYLIST, randomList)
    commit(SET_CURRENTINDEX, 0)
    commit(SET_FULLSCREEN, true)
    commit(SET_PLAYING_STATE, true)
}


export const insertSong = ({ commit, state }, song) => {
    // 返回副本 修改state的值
    let playList = state.playList.slice()

    let sequenceList = state.sequenceList.slice()
    // currentIndex是值类型 相当于赋值
    let currentIndex = state.currentIndex
    // 记录一下当前歌曲
    let currentSong = playList[currentIndex]
    //查找当前列表中是否有待插入歌曲 并且返回索引

    let fpIndex = findIndex(playList, song)

    currentIndex++

    playList.splice(currentIndex, 0, song)

    if (fpIndex > -1) {
        // 如果当前插入的序号大于列表中的序号
        if (currentIndex > fpIndex) {
            playList.splice(fpIndex, 1)
            currentIndex--
        } else {
            playList.splice(fpIndex + 1, 1)
        }
    }
    // 查找顺序列表中当前歌曲的索引 然后加1

    let currentSIndex = findIndex(sequenceList, currentSong) + 1

    // 查找顺序列表中是否有有待插入歌曲 并且返回索引

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }
    commit(SET_PLAYLIST, playList)

    commit(SET_SEQUENCELIST, sequenceList)

    commit(SET_CURRENTINDEX, currentIndex)

    commit(SET_FULLSCREEN, true)

    commit(SET_PLAYING_STATE, true)
}
// 保存搜索历史
export const saveSearchHistory = ({ commit }, query) =>{
    commit(SET_SEARCH_HISTORY, saveSearch(query))
}
// 删除某个搜索历史
export const deleteSearchHistory = ({ commit }, query) =>{
    commit(SET_SEARCH_HISTORY, deleteSearch(query))
}
// 清空搜索历史
export const clearSearchHistory = ({ commit }) =>{
    commit(SET_SEARCH_HISTORY, clearSearch())
}
// 删除歌曲
export const deleteSong = ({ commit, state }, song) =>{
    let playList = state.playList.slice()

    let sequenceList = state.sequenceList.slice()

    let currentIndex = state.currentIndex

    let fpIndex = findIndex(playList, song)

    playList.splice(fpIndex, 1)

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(fsIndex, 1)

    if (currentIndex > fpIndex || currentIndex == playList.length) {
        currentIndex--
    }
    commit(SET_PLAYLIST, playList)

    commit(SET_SEQUENCELIST, sequenceList)

    commit(SET_CURRENTINDEX, currentIndex)

    commit(SET_PLAYING_STATE, playList > 0)
}
// 删除歌曲的列表
export const deleteSongList = ({ commit }) =>{
    commit(SET_PLAYLIST, [])
    commit(SET_SEQUENCELIST, [])
    commit(SET_CURRENTINDEX, -1)
    commit(SET_PLAYING_STATE, false)
}
// 保存播放歌曲的历史
export const savePlayHistory = ({ commit }, song) =>{
    commit(SET_PLAY_HISTORY, savePlay(song))
}

// 保存收藏
export const saveFavoriteList = ({ commit }, song) =>{
    commit(SET_FAVORITE_LIST, saveFavorite(song))
}
// 删除收藏
export const deleteFavoriteList = ({ commit }, song) =>{
    commit(SET_FAVORITE_LIST, deleteFavorites(song))
}
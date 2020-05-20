// 返回 min和max(包括max)之间的随机数
const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    // 洗牌函数
export const shuffle = (arr) => {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

export function debounce(func, delay) {
    let timer

    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            console.log(this)
            console.log(args)
            func.apply(this, args)
        }, delay)
    }
}
// export function nomalNum(num, point) {
//     // 简化数字拆分为字符串
//     let numStr = num.toString().split('.')[0]
//     if (numStr.length < 6) {
//         return numStr
//     } else if (6 <= numStr.length && numStr.length <= 8) {
//         //获取小数点的位数  (4,6)
//         let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
//         return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
//     } else if (numStr.length > 8) {
//         //获取小数点的位数
//         let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
//         return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
//     }
// }
export const getDate = (dt) => {
    // let dt = new Date(dc)
    //获取年
    // let year = dt.getFullYear();
    //获取月
    let month = dt.getMonth() + 1;
    //获取日
    let day = dt.getDate();
    //获取小时
    let hour = dt.getHours();
    //获取分钟
    let minute = dt.getMinutes();
    //获取秒
    let second = dt.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    // hour = hour < 10 ? "0" + hour : hour;
    // minute = minute < 10 ? "0" + minute : minute;
    // second = second < 10 ? "0" + second : second;
    return month + "月" + day + "日 ";
}
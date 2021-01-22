
/*
* 格式化播放量
* */
export const normalNum = (num,point) => {
  let numStr = num.toString();
  if(numStr.length<6) {
    return numStr
  } else if(6<=numStr.length && numStr.length<=8) {
    return parseInt(num/10000)+"万"
  } else if(numStr.length>8) {//(1,3)
    let decimal = numStr.substring(numStr.length-8,numStr.length-8+point)
    return parseFloat(parseInt(num/100000000)+"."+decimal)+"亿"
  }
}

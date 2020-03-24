export function getData(el,name,val) {
  const prefix = 'data-'
  if(val) {
   el.setAttribute(prefix+name,val)
  }
  return el.getAttribute(prefix+name)
}

let elementStyle = document.createElement('div').style
// webkit-，-moz-，-ms-，-o-具体代表的浏览器如下：
//
// -webkit-代表chrome、safari私有属性
//
// -moz-代表firefox浏览器私有属性
//
// -ms-代表IE浏览器私有属性
//
// -o-代表Operai私有属性
let vendor = (() => {
  let transformName = {
    webkit:'webkitTransform',
    Moz:'MozTransform',
    O:'OTransform',
    ms:'msTransform',
    standard:'transform'
  }
  for(let key in transformName) {
    if(elementStyle[transformName[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
   if(vendor == false) {
     return false
   } else if(vendor == 'standard') {
     return style
   } else {
     return vendor + style.charAt(0).toUpperCase() + style.substring(1)
   }
}
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

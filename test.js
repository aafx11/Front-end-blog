// 防抖
function debounce(fn, delay = 200) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
      timer = null
    }, delay);
  }
}

// 节流
function throttle(fn, delay = 1000) {
  let flag = false
  return function (params) {
    if (flag) {
      return
    }
    flag = true
    setTimeout(() => {
      fn.apply(this, args)
      flag = false
    }, delay);
  }
}
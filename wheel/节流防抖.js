/*function debounce(func, wait = 50, immediate = true) {
    let timer, context, args
    // 延迟执行函数
    const later = () => setTimeout(() => {
        // 延迟函数执行完毕，清空缓存的定时器序号
        timer = null
        // 延迟执行的情况下，函数会在延迟函数中执行
        // 使用到之前缓存的参数和上下文
        if (!immediate) {
            func.apply(context, args)
            context = args = null
        }
    }, wait)

    // 这里返回的函数是每次实际调用的函数
    return function (...params) {
        // 如果没有创建延迟执行函数（later），就创建一个
        if (!timer) {
            timer = later()
            // 如果是立即执行，调用函数
            // 否则缓存参数和调用上下文
            if (immediate) {
                func.apply(this, params)
            } else {
                context = this
                args = params
            }
            // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
            // 这样做延迟函数会重新计时
        } else {
            clearTimeout(timer)
            timer = later()
        }
    }
}*/

function debounce(func, wait = 50) {
    // 缓存一个定时器id
    let timer = 0
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

// const log = debounce(a => {
//     console.log(a)
// }, 1000);
// log(1);
// log(1);
// log(1);

// log(1);
// log(1);
// setTimeout(() => {
//     log(1);
// }, 2000);

function throttle(func, wait) {
    let pre = Date.now();
    return function (...args) {
        let cur = Date.now();
        if (cur - pre >= wait) {
            func.apply(this, arguments);
            pre = Date.now();
        }
    }
}

const log = throttle(a => {
    console.log(a)
}, 1000);


log(1);
setTimeout(() => {
    log(1);
},2000);
log(1);
log(1);


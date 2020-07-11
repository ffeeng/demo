//节流防抖的区别，节流1秒内触发一次,防抖在1秒内多次点击，最后点击的那个一秒后执行（不一秒内触发）

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
function debounce(fn, wait) {
    let lastTime = new Date().getTime();
    let timeId;

    return function (...args) {
        let curTime = new Date().getTime();
        if (curTime - lastTime > wait) {
            timeId = setTimeout(() => {
                lastTime = curTime;
                fn.apply(args)
            }, wait)
        } else {
            clearTimeout(timeId);
        }

    }

}

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
}, 2000);
log(1);
log(1);


let add = (...args) => {
    return args.reduce((pre, cur) => pre + cur, 0);
};
//用toString valueOf来调用
let curring1 = (fn) => {
    let arr = [];

    function next() {
        let args = [].slice.call(arguments);
        arr = [...arr, ...args];
        return next;
    };
    next.toString = function () {
        return fn(...arr);
    };
    next.valueOf = function () {
        return fn(...arr);
    };
    return next;
};
// console.log(curring1(add)(1)(2)(3) + '');
// console.log(curring1(add)(1)(2)(3) + 0);
let max = (a, b, c) => {
    let t = a > b ? a : b;
    t = t > c ? t : c;
    return t;
};
//根据函数的长度调用
let curring2 = (fn, len) => {
    let arr = [];

    function next() {
        let args = [].slice.call(arguments);
        arr = [...arr, ...args];
        if (arr.length < len)
            return next;
        else return fn(...arr);
    };
    return next;

};

console.log(curring2(max, 3)(1)(2)(3));



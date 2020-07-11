
function  say(...args) {
    console.log(args)
    console.log(this.name,this.age)

}

// getValue.call(a, 'yck', '24');
// getValue.apply(a, ['yck', '24']);
// getValue.bind(a)(['yck', '24']);

Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
};
// let res = getValue.myCall(a, 'feng', 20);
// console.log(res);

Function.prototype.myApply = function (context, args) {
    context = context || window;
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
};
let obj = {name:'feng',age:20};

let res = say.myApply(obj, ['feng', 20]);
// console.log(res);

Function.prototype.myBind = function (context) {
    let _this = this; //_this = getValue
    return function (...args) {
        _this.myApply(context, args);
    }
};

say.myBind(obj)(['yck', '24']);
// 多次band无效，band被棒死了

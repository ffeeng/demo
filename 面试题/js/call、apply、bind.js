let a = {
    value: 1,
    say() {
        console.log('hello');
    }
};

function getValue(name, age) {
    console.log(arguments);
    console.log(name)
    console.log(age)
    console.log(this.value)
    this.say();
    return 2;
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


// let res = getValue.myApply(a, ['feng', 20]);
// console.log(res);

Function.prototype.myBind = function (context) {
    let _this = this; //_this = getValue
    return function (...args) {
        _this.myApply(context, ...args);
    }
};

getValue.myBind(a)(['yck', '24']);
// 多次band无效，band被棒死了

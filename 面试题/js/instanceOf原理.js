//注意必须是new Number(1) 不能直接是1，不会自动装箱
// console.log(new Number(1) instanceof Number);
// console.log(new Boolean(false) instanceof Boolean);
// console.log(new String('') instanceof String);
// console.log([] instanceof Array);
// console.log({} instanceof Object);
// console.log((() => {
// }) instanceof Function);

// 在对象的原型链是否有指向类的指针 找 __proto__  == clazz.prototype
function myInstanceOf(obj, clazz) {
    while (obj.__proto__) {
        if (obj.__proto__ === clazz.prototype) return true;
        obj = obj.__proto__;
    }
    return false;
}

console.log(myInstanceOf(new Number(1), Number));
console.log(myInstanceOf([], Array));
console.log(myInstanceOf([], Object));
console.log(myInstanceOf({}, Object));

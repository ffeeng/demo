// Sub.prototype = Object.create(Super.prototype)
// Sub.prototype.constructor = Sub

// A继承B
function Sub() {

}

Object.setPrototypeOf(A, B.prototype);
A.__proto__ = B.prototype;


// vue事件 参数
const event = {
    name: string,
    once: boolean,
    capture: boolean,
    passive: boolean,
    handler? : Function,
    params? : Array < any >
}

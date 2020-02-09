function Car(color) {
    this.color = color;
}

Car.prototype.start = function () {
    console.log(this.color + ' car start()');
};

// let car = new Car('black');
// car.start();


function MyNew(Con, ...args) {
    let obj = {};  //空对象
    Object.setPrototypeOf(obj, Con.prototype); //设置原型链
    let res = Con.apply(obj, args); //调用构造函数
    if (res == null || typeof res !== 'object') return obj; //处理返回值
    return res;
}

let car = new MyNew(Car, 'black');
car.start();





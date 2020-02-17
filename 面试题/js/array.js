class MyArray {
    MyArray() {

    }

    _forEach(fn) {
        for (let i = 0; i < this.length; i++) {
            fn(this[i], i, this);
        }
    }

    _map(fn) {
        let res = [];
        for (let i = 0; i < this.length; i++) {
            res.push(fn(this[i], i, this));
        }
        return res;
    }

    _reduce(fn, initValue) {
        let pre = initValue;
        for (let i = 0; i < this.length; i++) {
            // let pre = fn() previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U
            pre = fn(pre, this[i], i, this);
        }
        return pre;
    }

    _filter(fn) {
        let res = [];
        for (let i = 0; i < this.length; i++) {
            if (fn(this[i], i, this))
                res.push(this[i]);
        }
        return res;
    }

    _some(fn) {
        for (let i = 0; i < this.length; i++) {
            if (fn(this[i], i, this)) return true;
        }
        return false;
    }

    _every(fn) {
        for (let i = 0; i < this.length; i++) {
            if (!fn(this[i], i, this)) return false;
        }
        return true;
    }
}


Array.prototype._forEach = new MyArray()._forEach;
Array.prototype._map = new MyArray()._map;
Array.prototype._filter = new MyArray()._filter;
Array.prototype._some = new MyArray()._some;
Array.prototype._every = new MyArray()._every;
// reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
//reduce函数传入是个参数 pre cur index arr
Array.prototype._reduce = new MyArray()._reduce;
// Array.prototype._forEach = new MyArray()._forEach;
// [1, 2]._forEach((value, index, array) => console.log(value, index, array));
// const a = [1, 2, 3]._reduce((pre, value, index, array) => {
//     return pre + value;
// }, 0);
// console.log(a);

let a = new MyArray();
a.
for(let key in a.__proto__)
    console.log(key);
console.dir(a.__proto__)
[].reduce()

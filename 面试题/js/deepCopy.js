// 浅拷贝方法
// Object.assign(target, source)
// target = [...source]
// target = {...source}


// 深拷贝注意循环引用的情况 及 a.x = a 或 a.x.y = a;这种情况
//采用数组创建对象的引用 找到改引用直接返回
function deepCopy(obj, refArr) {
    refArr = refArr || [];
    if (obj == null || typeof obj !== 'object') return obj;
    let type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === 'array') {
        let res = [];
        for (let i = 0; i < obj.length; i++) {
            res[i] = deepCopy(obj[i]);
        }
        return res;
    }
    if (type === "Date") return new Date(obj);
    if (type === 'RegExp') return new RegExp(obj);
    let res = {};
    refArr.push(obj);
    for (let key in obj) {
        let ref = refArr.find(ref => ref === obj[key]);
        if (ref) {
            res[key] = ref;
        } else {
            res[key] = deepCopy(obj[key], refArr);
        }
    }
    return res;
}

let data = {
    a: [1, 2, 3],
    b: new Date(),
};
data.a[0] = data;
let data2 = deepCopy(data);
data2.a[0] = {x: 1};
data2.b.setFullYear(1000);
console.log(data);
console.log(data2);

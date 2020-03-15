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


//vuex 中的deepCopy
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
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

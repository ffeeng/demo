function deepClone(value){
    
    if(value===null) return value;
    if(value instanceof Date) return new Date(value);
    if(value instanceof RegExp) return new RegExp(value);
    // 函数不需要拷贝
    if(typeof value !== 'object') return value;
    let obj = new value.constructor(); //[] {}
    for(let key in value){ //in 会遍历对象上的属性和 __proto__上的属性
        if(value.hasOwnProperty(key)){
           obj[key] = deepClone(value[key]);
        }
    }
    return obj;

    //curl
}

let a = {a:123,b:'abc'};
let c = deepClone(a);
console.log(c);
c.a = 22;
console.log(a);

console.log(require('fs'));


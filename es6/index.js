//结构赋值 剩余参数
let [, a, b, c] = [1, 2, 3, 4, 5]
console.log(a, b, c);
a = [1, ...[2, 3]]
[a,b=4] = [1]
console.log(a,b);

console.log(a);
[a, b] = [1, 2, 3]
let { a: c, b=20 } = { a: 'feng', b: 12 };
console.log( b, c);
let a = {...{a:1},...{b:2}}
console.log(a);
let {c,a,...b} = {a:1,b:2,c:'20'}
console.log(b);


//async await Promise
let a = async ()=>{
    await new Promise(resolve=>{
        setTimeout(()=>{
            console.log('2秒后打印');
            resolve();
        },2000)
    })
    console.log('等wait执行完后打印');
}

a();






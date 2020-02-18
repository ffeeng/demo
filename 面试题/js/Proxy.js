let obj = [1, 2, 3];
let proxy = new Proxy(obj, {
    get(target, key) {
        return Reflect.get(target, key);
    },
    set(target, key, value) {
        if (key === 'length') return true;
        console.log(target, key, value);
        console.log('update');
        return Reflect.set(target, key, value);
    }
});
// proxy.c = 100;
// console.log(proxy.c);
obj[0]=10;
console.log(obj);

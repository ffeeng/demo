# 对象属性描述
通过json形式定义的变量 他的对象描述都是true
```
var a = {x:1}
Object.getOwnPropertyDescriptor(location,'href')
=
{
    value: "https://blog.csdn.net", 
    writable: true, 
    enumerable: true,
    configurable: true
}
```
- 因为configurable为true,可以对其进行defineProperty
- 当configurable为false,对其进行defineProperty时会报错
```
Object.getOwnPropertyDescriptor(location,'href')
=
{
    value: "https://blog.csdn.net/weixin_42561383/article/details/90085731", 
    writable: true, 
    enumerable: true,
    configurable: false
}
Object.defineProperty(location,'href',{
    set(){
        console.log('set');
    }
});
VM365:1 Uncaught TypeError: Cannot redefine property: href
```

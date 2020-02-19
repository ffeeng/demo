/**
 *
 * 判断类型方法
 * 1、typeof
 * 2、instanceof
 * 3、Object.prototype.toString.call(obj)
 * 4、construct.name
 */


// 1、可以用来区分基本类型和引用类型，对于是引用类型不能区分是某个类的实例
// typeof 1 ==='number'
// typeof false ==='boolean'
// typeof '' ==='string'
// 其他都是object
// typeof null ==='object'
// typeof new Date() ==='object'
// typeof {} ==='object'
// typeof [] ==='object'

// 2、instancof
// 判断对象是类的实列，是子类的实例一定也是父类的实例，对象 instancof Object一定为true
// new Date() instanceof Date === true
// new Date() instanceof Object === true
// ([]) instanceof Object === true
// ([]) instanceof Array === true
// ({}) instanceof Object === true
// ({}) instanceof Array === false
// 用instanceof来区分数组和对象需要进行两次比较，一次无法区分

// 3、Object.prototype.toString.call(obj)
// 判断类型类型，万能的方法

Object.prototype.toString.call(1) === '[Object Number]'
// Object.prototype.toString.call(false) === '[Object Boolean]'
// Object.prototype.toString.call('1') === '[Object String]'
// Object.prototype.toString.call([]) === '[Object Array]'
// Object.prototype.toString.call({}) === '[Object Object]'
// 如果有Symbol.toStringTag不为空 返回他的值，否则返回对象所属的原型的名称
// var a = {};
// Object.prototype.toString.call(a) === '[Object Object]'
// var a = {[Symbol.toStringTag]: 'A'};
// Object.prototype.toString.call(a) === '[Object A]'
// 原理是读对象上面的Symbol.toStringTag的值




//事件委托是代理模式
//发布订阅是观察者模式
class Singleton {
    constructor() {
    };

    static instance;

    static getInstance() {
        if (this.instance) return this.instance;
        else new Singleton();
    }
}

console.log(Singleton.getInstance() === Singleton.getInstance());

class Factory {
    static create(type) {
        if (type === 'man') {
            return new Man();
        } else if (type === 'woman') {
            return new Woman();
        } else {
            throw Error('type值错误:' + type)
        }

        function Man() {
        }

        function Woman() {
        }
    }
}

console.log(Factory.create('man'));
console.log(Factory.create('woman'));
try {
    Factory.create('a');
} catch (e) {
    console.log(e);

}
console.log(2);

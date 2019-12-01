class Dep {
    constructor() {
        this.subs = []
    }
    //订阅
    addSub(watcher) {
        this.subs.push(watcher);
    }
    //发布 
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        //默认先存放一个老值
        this.oldValue = this.get();
    }
    get() {
        Dep.target = this;
        let value = CompileUtil.getVal(this.vm, this.expr);
        Dep.target = null;
        return value;
    }
    update() {
        let newVal = CompileUtil.getVal(this.vm, this.expr);
        if (newVal !== this.oldValue) {
            this.cb(newVal)
        }
    }
}

class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        if (data && typeof data == 'object') {
            for (let key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }

    defineReactive(data, key, value) {
        this.observer(data[key])
        let dep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                // 创建watcher时 会去到对应的内容，并且把watcher放到了全局上
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set: (newValue) => {
                if (newValue != value) {
                    this.observer(newValue);
                    value = newValue;
                    dep.notify();
                }

            }
        })
    }
}

class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        console.log(this.el);
        let fragment = this.node2fragment(this.el)

        this.compile(fragment)
        this.el.appendChild(fragment);
    }

    isDirective(attrName) {
        return attrName.startsWith('v-');
    }

    compileElement(node) {
        let attributes = node.attributes;
        [...attributes].forEach(attr => {
            const { name, value: expr } = attr;
            if (this.isDirective(name)) {
                let [, directive] = name.split('-'); //v-on:click
                let [directiveName, eventName] = directive.split(":");
                CompileUtil[directiveName](node, expr, this.vm, eventName);
            }
        })

    }

    compileText(node) {
        let content = node.textContent;
        if (/\{\{(.+?)\}\}/.test(content)) {
            CompileUtil['text'](node, content, this.vm);
        }

    }
    compile(node) {
        let childNodes = node.childNodes;

        childNodes.forEach(child => {
            if (this.isElementNode(child)) {
                this.compileElement(child);
                this.compile(child);

            } else {
                this.compileText(child);
            }
        })
    }

    //放到内存中操作没有重绘重排
    node2fragment(node) {
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = node.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }
}

CompileUtil = {
    getVal(vm, expr) {
        return expr.split('.').reduce((data, current) => {
            return data[current];
        }, vm.$data)
    },
    setValue(vm, expr, value) { //vm.$data school.name ='aa'
        return expr.split('.').reduce((data, current, index, arr) => {
            if (index === arr.length - 1) {
                return data[current] = value;
            }
            return data[current];
        }, vm.$data)
    },
    model(node, expr, vm) {
        let fn = this.updater['modelUpdater']
        //给输入框添加一个观察者，数据更新触发此方法 拿新值赋值给输入框
        new Watcher(vm, expr, (newVal) => {
            fn(node, newVal);
        })
        node.addEventListener('input', e => {
            let value = e.target.value;
            this.setValue(vm, expr, value);
        })
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    html(node, expr, vm) {
        let fn = this.updater['htmlUpdater']
        //给输入框添加一个观察者，数据更新触发此方法 拿新值赋值给输入框
        new Watcher(vm, expr, (newVal) => {
            fn(node, newVal);
        })

        let value = this.getVal(vm, expr);
        fn(node, value);

    },
    getContentValue(vm, expr) {
        // 遍历表达式，将内容重新替换成一个完整的内容 返还回去
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    on(node, expr, vm, eventName) {
        node.addEventListener(eventName, (e) => {
            vm[expr].call(vm, e);
        })
    },
    text(node, expr, vm) { //expr =>珠峰 {{b}} {{c}}
        let fn = this.updater['textUpdater'];
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            new Watcher(vm, args[1], (newVal) => {
                fn(node, this.getContentValue(vm, expr));
            })
            return this.getVal(vm, args[1]);
        });
        fn(node, content);

    },
    updater: {
        modelUpdater(node, value) {
            node.value = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value;
        },
        textUpdater(node, value) {
            node.textContent = value;
        }
    }
}
class Vue {
    constructor(option) {
        this.$el = option.el
        this.$data = option.data
        let computed = option.computed;
        let methods = option.methods;
        if (this.$el) {
            new Observer(this.$data);

            for (let key in computed) {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return computed[key].call(this);
                    }
                })
            }
            for (let key in methods) {
                Object.defineProperty(this, key, {
                    get() {
                        return methods[key];
                    }
                });
            }
            this.proxyVm(this.$data);
            new Compiler(this.$el, this)
        }
    }
    //vm来代理data
    proxyVm(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        }
    }
}
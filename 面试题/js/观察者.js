class Observe {
    cb = {};

    add(event, fn) {
        let fns = this.cb[event];
        if (!fns) this.cb[event] = [fn];
        else fns.push(fn);
    }

    remove(event) {
        this.cb[event] = [];
    }

    notify(event) {
        this.cb[event].forEach(fn => fn());
    }

    notifyAll() {
        for (let event in this.cb) {
            this.cb[event].forEach(fn => fn());
        }
    }
}

let a = new Observe();
a.add('a', () => console.log(1));
a.add('a', () => console.log(2));
a.add('b', () => console.log(3));
a.notifyAll('a');

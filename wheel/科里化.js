function add(a) {
    return function s(b) {
        a = a+b;
        return s;
    }
}

let a = add(1)(2);
console.log(a);

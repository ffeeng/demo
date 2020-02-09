function flattenDeep(arr) {
    if (Array.isArray(arr)) {
        return arr.reduce((a, b) => {
            return [...a, ...flattenDeep(b)]
        }, []);
    } else {
        return [arr];
    }
}

const res = flattenDeep([1, [[2], 3]]);
console.log(res);

Function.prototype.uncurring = function() {
    var self = this;
    return function() {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};

var push = Array.prototype.push.uncurring();

//测试一下
(function() {
    push(arguments, 4);
    console.log(arguments); //[1, 2, 3, 4]
})(1, 2, 3)




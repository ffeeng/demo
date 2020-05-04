
//监听文件变化的两种方法：
// 1、轮询 2、通知（回调、钩子）


//监听文件改变
const fs = require('fs')
const filePath = './index.html'
console.log(`正在监听 ${filePath}`);
//采用轮询的方法
fs.watchFile(filePath, (cur, prv) => {
    if (filePath) {
        // 打印出修改时间
        console.log(`cur.mtime>>${cur.mtime.toLocaleString()}`)
        console.log(`prv.mtime>>${prv.mtime.toLocaleString()}`)
        // 根据修改时间判断做下区分，以分辨是否更改
        if (cur.mtime != prv.mtime){
            console.log(`${filePath}文件发生更新`)
        }
    }
})


// const path = require('path');

// module.exports = {
//     //写路径采用绝对路径
//     entry: path.relative(__dirname,'./src/index.js'), 
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     }
// }

module.exports = env => {
    console.log(env);
}
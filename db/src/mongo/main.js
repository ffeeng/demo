var express = require('express')
var app = express()
const userDao = require("./userDao")

app.use((req, res, next) => {
  // 设置是否运行客户端设置 withCredentials
  // 即在不同域名下发出的请求也可以携带 cookie
  res.header("Access-Control-Allow-Credentials", true)
  // 第二个参数表示允许跨域的域名，* 代表所有域名  
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
  // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})



users = [
  { id: '1', name: 'feng', age: 20 },
  { id: '2', name: 'feng2', age: 20 },
  { id: '3', name: 'feng3', age: 20 },
  { id: '4', name: 'feng4', age: 20 },
]

app.get('/', (req, res) => {
  res.send('hello12')
})
app.get('/user/list', (req, res) => {
  res.type('json')
 
  res.send(users)
})
app.get('/user/getDetail', (req, res) => {
  const id = req.query.id
  res.send(users.filter(i => i.id === id))
})

app.get('/302', function (req, res) {
  res.redirect('http://www.baidu.com')
})

app.listen(3000)
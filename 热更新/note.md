# 基本原理
有点类似Vue的响应式原理，数据变化更新试图

express在一个http服务,转发静态资源
起一个websocket 


当监听到文件变化 给浏览器发消息，告诉浏览器刷新页面

HotModuleReplace原理
1、监听文件变化
fs.watch (fs.watchFile) https://juejin.im/post/5cb68b9a6fb9a0688a680b5d
2、文件变化后
重新BUILD项目
给浏览器发通知
3、浏览器收到通知后：
 a["{\"content-changed\":\"ok\"}"] 当前页面更新=>刷新页面 location.reload()
a["{\"type\":\"ok\"}"] 依赖更新=> 执行js(生成新的render方法 执行forceUpdate()) head.appendChild(script)
执行js

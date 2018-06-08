/**
 * response.setHeader(name, value)
 * 设置一个隐式的响应头，如果该响应头已经存在，则值会被覆盖。
 * 如果要发送多个名称相同的响应头，则使用字符串数组
 * 
 * 这个方法设置的响应头会和res.writeHead设置的响应头合并
 * 并且res.writeHead设置的响应头的优先级较高
 */
 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
     res.setHeader('x-foo', 'foo')
     res.setHeader('x-bar', 'bar')
     res.setHeader('Content-Type', 'text/plain')
     res.setHeader('x-foo', 'foo-second')
     res.setHeader('cookie', ['name=saisai', 'age=23'])
    
     assert.strictEqual(res.getHeader('x-foo'), 'foo-second')
     assert.strictEqual(res.getHeader('cookie').length, 2)

     res.writeHead(200, {
         'Content-Type': 'text/html'
     })

     assert.strictEqual(res.getHeader('Content-Type'), 'text/html')

     res.end('Hello World')
 })

 server.listen(3000, () => {
     http.get({
         port: server.address().port
     }).end()
 })
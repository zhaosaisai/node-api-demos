/**
 * response.getHeaders()
 * 这个方法是返回当前响应头文件的浅拷贝
 * 不是继承自Object因此没有Object原型上的方法
 */

 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
     res.setHeader('x-foo', 'foo')
     res.setHeader('x-bar', 'bar')
     res.setHeader('x-boos', 'boos')

     res.writeHead(200)

     assert.strictEqual(Object.keys(res.getHeaders()).length, 3)
     assert.ok('x-foo' in res.getHeaders())
     assert.ok('x-bar' in res.getHeaders())
     assert.ok('x-boos' in res.getHeaders())

     res.end('Hello World')
 })

 server.listen(3000, () => {
     http.get({
         port: server.address().port
     }).end()
 })
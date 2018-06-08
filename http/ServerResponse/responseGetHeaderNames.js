/**
 * response.getHeaderNames()
 * 返回当前http响应的头部信息名称的数组, 
 * 只能获取通过res.setHeader方法添加的头部
 */

const http = require('http')
const assert = require('assert')

const server = http.createServer((req, res) => {
   assert.strictEqual(res.getHeaderNames().length, 0)
   res.setHeader('Server', 'Nodejs')
   res.writeHead(200)
   assert.strictEqual(res.getHeaderNames().length, 1)
   res.end('Hello World')
})

server.listen(3000, () => {
   http.get({
       port: server.address().port
   }).end()
})
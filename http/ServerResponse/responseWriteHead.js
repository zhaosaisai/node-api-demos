/**
 * response.writeHead(statusCode, [statusMessage], [headers])
 * 这个方法主要是显示的设置响应的状态码，状态码描述信息，和响应头
 * 这个方法只能被调用一次，而且只能在response.end方法之前被调用
 * 
 * res.setHeader设置的响应头会和res.writeHead设置的响应头合并，而且res.writeHead
 * 响应头优先
 */

 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
     res.setHeader('Content-Type', 'text/plain')

     res.writeHead(200, 'Success Response', {
         'Content-Type': 'text/html'
     })

     res.end('Hello World')
 })

 server.listen(3000, () => {
     http.get({
         port: server.address().port
     }).on('response', (res) => {
         assert.strictEqual(res.statusCode, 200)
         assert.strictEqual(res.statusMessage, 'Success Response')
         assert.strictEqual(res.headers['content-type'], 'text/html')
         server.close()
     }).end()
 })
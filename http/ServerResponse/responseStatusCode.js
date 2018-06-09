/**
 * response.statusCode
 * 用于隐式的设置响应的状态码
 */

 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
     res.statusCode = 201
     res.end('Hello World')
 })

 server.listen(3000, () => {
     const req = http.get({
         port: server.address().port
     })

     req.on('response', (res) => {
         assert.strictEqual(res.statusCode, 201)
         res.on('data', (chunk) => {
             assert.strictEqual(chunk.toString(), 'Hello World')
         })
     })

     req.end()
 })
/**
 * response.statusMessage
 * 用于隐式的设置状态码的说明信息
 */
 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
     res.statusCode = 201
     res.statusMessage = 'Status Message by own'
     res.end('Hello World')
 })

 server.listen(3000, () => {
     const req = http.get({
         port: server.address().port
     })

     req.on('response', (res) => {
         assert.strictEqual(res.statusCode, 201)
         assert.strictEqual(res.statusMessage, 'Status Message by own')
         res.on('data', (chunk) => {
             console.log(chunk.toString())
             assert.strictEqual(chunk.toString(), 'Hello World')
         })
     })

     req.end()
 })
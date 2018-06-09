/**
 * aborted在请求被终止或者socket已经关闭的时候触发
 * 
 * 在node10的时候可以通过aborted属性来判断是否aborted
 */

 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
    //  req 是http.IncomingMessage
    req.on('aborted', () => {
        // assert.strictEqual(req.aborted, true)
        console.log('Request aborted')
        server.close()
    })
    // 通过 req.aborted来判断是否终止 node10
    // assert.strictEqual(req.aborted, false)
    res.write('Hello World')
 })

 server.listen(3000, () => {
     const req = http.get({
         port: server.address().port,
         headers: {
             'connection': 'keep-alive'
         }
     })

     req.on('response', (res) => {
        //  res 也是 http.IncomingMessage
        res.on('aborted', () => {
            // assert.strictEqual(res.aborted, true)
            console.log('Request aborted')
        })
        // assert.strictEqual(res.aborted, false)
        // 终止请求
        req.abort()
     })
 })
/**
 * res.getHeader(name)
 * 这个方法用于获取已经入队列但是还没有被发送的响应头
 */

 const http = require('http')
 const assert = require('assert')

 const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200)
    
    assert.strictEqual(
        res.getHeader('Content-Type'),
        'text/html'
    )

    res.end('Hello World')
 })

 server.listen(3000, () => {
    http.get({
        port: server.address().port
    }).end()
 })
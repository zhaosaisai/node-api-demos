/**
 * response.headersSent
 * 如果响应头已经发送则返回true，否则返回false
 */

const http = require('http')
const assert = require('assert')

const server = http.createServer((req, res) => {
    assert.ok(!res.headersSent)
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Server': 'Nodejs'
    })
    assert.ok(res.headersSent)
    res.end('Hello World')
})

server.listen(3000, () => {
    http.get({
        port: server.address().port
    }).end()
})
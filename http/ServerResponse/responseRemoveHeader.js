/**
 * response.removeHeader(header)
 * 从待发送的header队列中移除一个响应头
 * 
 * 必须在res.writeHead之前调用
 */
const http = require('http')
const assert = require('assert')

const server = http.createServer((req, res) => {
    res.setHeader('x-foo', 'foo')
    res.setHeader('x-bar', 'bar')
    res.setHeader('x-boos', 'boos')

    assert.ok(res.hasHeader('x-foo'))
    assert.ok(res.hasHeader('x-bar'))
    assert.ok(res.hasHeader('x-boos'))

    res.removeHeader('x-foo')
    
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Server': 'Nodejs'
    })
    
    assert.ok(!res.hasHeader('x-foo'))

    res.end('Hello World')
})

server.listen(3000, () => {
    http.get({
        port: server.address().port
    }).end()
})
/**
 * response.hasHeader(name)
 * 如果设置了当前的响应头则返回true
 */
const http = require('http')
const assert = require('assert')

const server = http.createServer((req, res) => {
    res.setHeader('x-foo', 'foo')
    res.setHeader('x-bar', 'bar')
    res.setHeader('x-boos', 'boos')

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Server': 'Nodejs'
    })

    assert.ok(res.hasHeader('Content-Type'))
    assert.ok(res.hasHeader('Server'))
    assert.ok(res.hasHeader('x-foo'))
    assert.ok(res.hasHeader('x-bar'))
    assert.ok(res.hasHeader('x-boos'))

    res.end('Hello World')
})

server.listen(3000, () => {
    http.get({
        port: server.address().port
    }).end()
})
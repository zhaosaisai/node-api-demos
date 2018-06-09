/**
 * message.headers
 * 这个属性主要是用来获取响应头和请求头的
 */
const http = require('http')
const assert = require('assert')

const _CLIENT_FROM = 'Client From'
const _SERVER_TO = 'Server To'

const server = http.createServer((req, res) => {
    // req.headers 获取请求头
    assert.strictEqual(req.headers.from, _CLIENT_FROM)
    res.writeHead(200, {
        'to': _SERVER_TO
    })
    res.end()
})

server.listen(3000, () => {
    const req = http.get({
        port: server.address().port,
        headers: {
            'from': _CLIENT_FROM
        }
    }, (res) => {
        // res.headers 用来获取响应头
        assert.strictEqual(res.headers.to, _SERVER_TO)
    })

    req.end()
})
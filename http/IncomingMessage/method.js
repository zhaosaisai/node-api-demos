/**
 * message.method
 * 这个方法表示的是客户端所用的请求方法
 */
const http = require('http')
const assert = require('assert')

function testMethod(method, callback) {
    const server = http.createServer((req, res) => {
        assert.strictEqual(req.method, method)
        res.end('hello')
    })

    server.listen(3000, () => {
        const req = http.request({
            port: server.address().port,
            method
        })

        req.on('response', (res) => {
            res.on('end', () => {
                server.close()
                if (callback) {
                    process.nextTick(callback)
                }
            })
            // yyyyyyy
            res.resume()
        })

        req.end()
    })
}

testMethod('GET', () => {
    testMethod('POST', () => {
        testMethod('PUT')
    })
})
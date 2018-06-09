/**
 * 在http的响应中获取状态码
 */

const http = require('http')
const assert = require('assert')

function testHttpStatusCode(code, callback) {
    const server = http.createServer((req, res) => {
        console.log(`Your request url is -> ${req.url}`)
        res.writeHead(code)
        res.end()
    })

    server.listen(3000, () => {
        const req = http.get({
            port: server.address().port,
            path: `/${String(Math.random()).slice(-6)}`
        }, (res) => {
            console.log(`Your code is ${res.statusCode}`)
            console.log(`Your status message is -> ${res.statusMessage}`)
            assert.strictEqual(res.statusCode, code)
            server.close()
            if (callback) {
                process.nextTick(callback)
            }
        })
    })
}

testHttpStatusCode(200, () => {
    testHttpStatusCode(201, () => {
        testHttpStatusCode(404, () => {
            testHttpStatusCode(500)
        })
    })
})
/**
 * message.httpVersion
 * 用于获取http的版本，在服务器的请求中返回的是客户端的http的版本
 * 在客户端中返回的事服务器端的http的版本
 * 
 * message.httpVersionMajor: 返回的是主版本号
 * message.httpVersionMinor: 返回的是次版本号
 */
const http = require('http')
const net = require('net')
const assert = require('assert')

function testVersion(version, callback) {
    const server = net.createServer((conn) => {
        conn.end(
            `HTTP/${version} 200 OK\r\n\r\nMy http version is ${version}`
        )
    })

    server.listen(3000, '127.0.0.1', () => {
        const req = http.get({
            port: server.address().port,
            host: '127.0.0.1'
        })

        req.on('response', (res) => {
            const [major, minor] = res.httpVersion.split('.')
            assert.strictEqual(res.httpVersion, version)
            assert.strictEqual(+major, res.httpVersionMajor)
            assert.strictEqual(+minor, res.httpVersionMinor)

            let body = ''

            res.on('data', (chunk) => {
                body += chunk
            })

            res.on('end', () => {
                assert.strictEqual(body, `My http version is ${version}`)
                server.close()
                if (callback) {
                    process.nextTick(callback)
                }
            })
        })

        req.on('error', (err) => {
            console.error('Client Request Error')
            throw err
        })
    })
}

testVersion('0.9', () => {
    testVersion('1.0', () => {
        testVersion('1.1')
    })
})
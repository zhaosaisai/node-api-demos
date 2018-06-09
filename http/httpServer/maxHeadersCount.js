/**
 * server.maxHeadersCount: 限制响应头的最大数量
 * req.maxHeadersCount: 限制请求头的最大数量
 * 如果为0，表示没有限制
 * 如果超出这个数量，多余的头部会被舍弃
 * 默认是2000
 */
const http = require('http')
const assert = require('assert')

let requests = 0
let responses = 0

const N = 2000
const headers = {}

for (let i = 0; i < N; i++) {
    headers[`key${i}`] = i
}

// 服务器
const maxAndExpected = [
    [50, 50],
    [1500, 1500],
    // 服务器的响应头有两个必须的Host,Connection
    [0, N + 2]
]

let max = maxAndExpected[requests][0]
let expected = maxAndExpected[requests][1]

const server = http.createServer((req, res) => {
    assert.strictEqual(Object.keys(req.headers).length, expected)
    if (++requests < maxAndExpected.length) {
        max = maxAndExpected[requests][0]
        expected = maxAndExpected[requests][1]
        server.maxHeadersCount = max
    }
    res.writeHead(200, headers)
    res.end()
})

server.maxHeadersCount = max

server.listen(3000, () => {
    const maxAndExpected = [
        [20, 20],
        [1200, 1200],
        // 客户端的请求头有三个是必须的：Connection, Date, Transfer-Encoding
        [0, N + 3]
    ]

    doRequest()

    function doRequest() {
        let max = maxAndExpected[responses][0]
        let expected = maxAndExpected[responses][1]
        const req = http.request({
            port: server.address().port,
            headers: headers
        }, (res) => {
            assert.strictEqual(Object.keys(res.headers).length, expected)
            if (++responses < maxAndExpected.length) {
                doRequest()
            } else {
                server.close()
            }
            res.resume()
        })
        req.maxHeadersCount = max
        req.end()
    }
})

process.on('exit', () => {
    assert.strictEqual(requests, maxAndExpected.length)
    assert.strictEqual(responses, maxAndExpected.length)
})
/**
 * message.rawHeaders
 * 获取请求或者响应头的原始值
 * 原始的请求或者响应头是数组形式的
 * [头名称，值，头名称，值]
 */

const http = require('http')
const assert = require('assert')

const server = http.createServer((req, res) => {
    console.log(req.rawHeaders)
    res.end()
})

server.listen(3000, () => {
    const req = http.get({
        port: server.address().port
    })

    req.on('response', (res) => {
        console.log(res.rawHeaders)
    })
})

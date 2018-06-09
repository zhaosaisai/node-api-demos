/**
 * message.destroy([error])
 * 调用底层的destroy方法，如果提供了error，
 * 会触发底层socket的error事件，且把error作为参数传入事件的回调
 */
const http = require('http')
const assert = require('assert')

const server = http.createServer((req, res) => {
    req.connection.on('error', (err) => {
        assert.strictEqual(err, 'Client Request Destroyed')
        server.close()
    })

    res.write('Hello world')

    setImmediate(() => {
        // 销毁底层的socket
        req.destroy('Client Request Destroyed')
    })
})

server.listen(3000, () => {
    const req = http.get({
        port: server.address().port
    }, (res) => {
        res.on('data', (chunk) => {
            console.log(chunk.toString())
        })

        res.on('close', () => {
            // 响应关闭
            console.log('Server Closed and You Should Take Some Action')
        })
    })

    req.end()
})
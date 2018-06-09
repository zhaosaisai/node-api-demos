const assert = require('assert')
const http = require('http')
const net = require('net')

const server = http.createServer((req, res) => {
    res.end()
})

server.on('clientError', (err, socket) => {
    assert.strictEqual(err instanceof Error, true)
    assert.strictEqual(err.code, 'HPE_INVALID_METHOD')
    assert.strictEqual(err.bytesParsed, 1)
    assert.strictEqual(err.message, 'Parse Error')
    assert.strictEqual(err.rawPacket.toString(), 'SaiSai\r\n')
    console.log(`BytesParsed ${err.bytesParsed}`)
    console.log(`Got The Error Request Package ${err.rawPacket.toString()}`)
    // 用400更温和的方式来关闭这个socket连接，而不是突然的关闭
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    server.close()
})

server.listen(3000, () => {
    function next() {
        // 发起一个Bad Request
        const client = net.connect(server.address().port)
        client.end('SaiSai\r\n')
        console.log('Send A Innormal Request')

        let chunks = ''
        client.on('data', (chunk) => {
            chunks += chunk
        })
        client.once('end', () => {
            console.log(chunks)
            assert.strictEqual(chunks, 'HTTP/1.1 400 Bad Request\r\n\r\n')
        })
    }
    
    // 发起一个正常的请求
    http.get({
        port: server.address().port,
        path: '/'
    }, (res) => {
        console.log(`Normal Response With statusCode ${res.statusCode}`)
        assert.strictEqual(res.statusCode, 200)
        // 暂时不明白这个的含义
        res.resume()
        res.once('end', next)
    })
})
const assert = require('assert')
const http = require('http')

const server = new http.Server()

server.on('connect', (req, socket, firstBodyChunk) => {
    // 当触发这个事件的时候，表明客户端是通过connect方法连接的
    assert.strictEqual(req.method, 'CONNECT')
    // 这个就是connect需要连接的url
    assert.strictEqual(req.url, 'localhost:3001')

    console.log('Server Got The Connect Qequest')

    // 可以通过socket对客户端作出响应
    socket.write(
        'HTTP/1.1 200 Connection Established\r\n' + 
        'Date: ' + (new Date()).toString() + '\r\n' +
        `\r\n` +
        // 响应体 也是会作为firstBodyChunk进行发送
        'Connect'
    )
    // http中发送的数据
    let data = firstBodyChunk.toString()
    
    socket.on('data', (chunk) => {
        console.log(chunk.toString())
        data += chunk.toString()
    })
    socket.on('end', () => {
        socket.end(data)
    })
})

server.listen(3000, () => {
    const req = http.request({
        port: server.address().port,
        // 指定connect方法进行连接
        method: 'CONNECT',
        // 指定代理的地址
        path: 'localhost:3001'
    })

    // 请求关闭的时候
    req.on('close', () => {
        console.log('Client Request Closed')
    })

    // 当服务端响应connect请求的时候，就会触发客户端的connect事件
    req.on('connect', (res, socket, firstBodyChunk) => {
        console.log('Client Got The Connect Response')

        // 这个是响应体中的数据
        let data = firstBodyChunk.toString()

        assert.strictEqual(data, 'Connect')

        // 监听socket收到数据
        socket.on('data', (chunk) => {
            data += chunk.toString()
        })

        socket.on('end', () => {
            assert.strictEqual(data, 'ConnectRequestend')
            server.close()
        })

        socket.end('end')
    })

    // 这个是http协议发送的数据，会作为firstBodyChunk进行发送
    req.end('Request')
})
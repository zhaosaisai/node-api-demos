const assert = require('assert')
const util = require('util')
const http = require('http')
const net = require('net')

let requests_recv = 0
let requests_sent = 0
let request_upgradeHead = null

function createTestServer() {
    return new testServer()
}

function testServer() {
    http.Server.call(this, () => {})

    // tcp建立连接的时候触发
    this.on('connection', () => {
        requests_recv++
    })

    // 收到请求的时候触发
    this.on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end('okay')
    })

    // 监听客户端的upgrade，当客户端有upgrade的header的时候会触发这个事件
    this.on('upgrade', (req, socket, head) => {
        // 向socket中写入数据
        socket.write(
            'HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
            'Upgrade: WebSocket\r\n' + 
            'Connection: Upgrade\r\n' + 
            '\r\n\r\n'
        )
        // 保存http发来的body
        request_upgradeHead = head

        // 监听客户端的socket发来的数据
        socket.on('data', (d) => {
            const data = d.toString()
            console.log('收到客户端的信息：', data)
            if (data === 'kill') {
                console.log('收到了客户端的kill信号，即将关闭socket')
                // 结束发送
                socket.end()
            } else {
                socket.write(data, 'utf8')
            }
        })
    })
}

util.inherits(testServer, http.Server)

// 客户端的socket写数据
function writeReq(socket, data, encoding = 'utf8') {
    requests_sent++
    socket.write(data, encoding)
}

function test_upgrade_with_listener() {
    // 创建一个连接
    const conn = net.createConnection(server.address().port)
    conn.setEncoding('utf8')
    let state = 0

    // 监听连接成功的事件
    conn.on('connect', () => {
        writeReq(conn, 
            'GET / HTTP/1.1\r\n' +
            'Upgrade: WebSocket\r\n' + 
            'Connection: Upgrade\r\n' + 
            '\r\n' + 
            'Hello Upgrade'
        )
    })

    // 监听接收数据的事件
    conn.on('data', (data) => {
        state++
        assert.strictEqual('string', typeof data)

        if (state === 1) {
            assert.strictEqual('HTTP/1.1 101', data.substr(0, 12))
            assert.strictEqual('Hello Upgrade', request_upgradeHead.toString('utf8'))
            // 接着向服务器发送数据
            conn.write('first send', 'utf8')
        } else {
            assert.strictEqual(data, 'first send')
            conn.write('kill', 'utf8')
        }
    })

    conn.on('end', () => {
        server.close()
    })
}

const server = createTestServer()

server.listen(3000, () => {
    test_upgrade_with_listener()
})

process.on('exit', () => {
    assert.strictEqual(requests_sent, 1)
    assert.strictEqual(requests_recv, 1)
    assert.strictEqual(request_upgradeHead.toString(), 'Hello Upgrade')
})
/**
 * 当主进程壳工作进程进行通信的时候，就会在触发进程中的message事件
 */
const cluster = require('cluster')
const net = require('net')
const assert = require('assert')

const WORKER_MSG = 'message from worker'
const WORKER_CODE = 'worker reply to master'
const MASTER_MSG = 'message from master'

if (cluster.isWorker) {
    // 创建一个tcp服务器，这个服务器将会在工作进程和主进程之间共享
    const server = net.Server()
    // 收到的socket和message的标识
    let _socket, _message

    // 是否可以响应客户端的socket
    function maybeReply() {
        if (!_socket || !_message) return

        // 向主进程发送socket响应
        _socket.end(JSON.stringify({
            echo: _message,
            code: WORKER_CODE
        }))
    }

    server.on('connection', socket => {
        _socket = socket
        maybeReply()

        // 向master发送信息
        process.send(WORKER_MSG)
    })

    process.on('message', message => {
        _message = message
        maybeReply()
    })

    server.listen(0, '127.0.0.1')
} else if (cluster.isMaster) {
    const worker = cluster.fork()

    // 当接收到ipc发过来的信息的时候会触发这个事件
    worker.on('message', message => {
        console.log(message)
        assert.strictEqual(message, WORKER_MSG)
    })

    // 监听cluster的message事件
    cluster.on('message', (worker_, message) => {
        assert.strictEqual(worker, worker_)
        assert.strictEqual(message, WORKER_MSG)
    })

    // 监听工作进程的端口连接事件
    worker.on('listening', (address) => {
        const client = net.connect(address.port, () => {
            console.log('连接成功')
            // 连接成功后，向工作进程发送信息
            worker.send(MASTER_MSG)
        })
        client.on('data', data => {
            data = JSON.parse(data)
            if (data.code === WORKER_CODE) {
                assert.strictEqual(MASTER_MSG, data.echo)
            } else {
                console.log('Receive data error')
            }
        })
    
        client.on('end', () => {
            worker.kill()
        })

        client.on('error', (err) => {
            console.log('连接出错')
            console.log(err)
        })
    })

    worker.on('exit', () => {
        console.log('进程退出')
        process.exit(0)
    })
}
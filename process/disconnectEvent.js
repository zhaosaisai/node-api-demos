/**
 * 如果nodejs的进程是通过ipc来创建的，比如子进程或者cluster。
 * 那么当这个通道关闭的时候就会触发进程的disconnect事件
 */
const fork = require('child_process').fork
const net = require('net')
const assert = require('assert')

if (process.argv[2] === 'child') {
    // 子进程程序
    // Check that the 'disconnect' event is deferred to the next event loop tick.
    const disconnect = process.disconnect
    process.disconnect = function() {
        disconnect.apply(this, arguments)
        process.once('disconnect', () => {
            console.log('child process disconnected')
        })
    }

    const server = net.createServer()

    server.on('connection', (socket) => {
        socket.resume()
        
        process.on('disconnect', () => {
            console.log('子进程断开')
            socket.end(process.connected.toString())
        })

        // when the socket is closed, we will close the server
        // allowing the process to self terminate
        socket.on('end', () => {
            server.close()
        })

        socket.write('ready')
    })

    server.on('listening', () => {
        //  向父进程发送数据
        process.send({
            msg: 'ready',
            port: server.address().port
        })
    })

    server.listen(0)
} else {
    // 父进程程序
    const child = fork(process.argv[1], ['child'])

    let childFlag = false
    let parentFlag = false

    // when calling .disconnect the event should emit
    // and the disconnected flag should be true.
    child.on('disconnect', () => {
        console.log('父进程断开')
        parentFlag = child.connected
    })

    // 接收来自子进程的信息
    child.on('message', (obj) => {
        if (obj && obj.msg === 'ready') {
            // 连接子进程创建的服务器
            const socket = net.connect(obj.port)

            socket.on('data', (data) => {
                data = data.toString()
                console.log(data)

                if (data === 'ready') {
                    child.disconnect()
                    assert.throws(child.disconnect.bind(child), Error)
                    return
                }

                // 子进程的服务器end方法传递过来的数据
                childFlag = (data === 'true')
            })
        }
    })
    process.on('exit', () => {
        assert.strictEqual(childFlag, false)
        assert.strictEqual(parentFlag, false)
    })
}
/**
 * subprocess.send(message[,sendHandle][,options][,callback])
 * 这个方法主要用于父进程发送消息到子进程
 * 
 * sendHandle参数可以传递给send方法，它主要用于传递一个tcp服务器或者socket对象给子进程
 * 子进程会接收对象作为第二个参数，并传递个process.on('message')事件上的回调函数。
 * socket上接收或者缓冲的任何数据都不会发给子进程。
 * 
 * options如果存在的话是一个用于发送处理数据参数的对象，支持以下的属性：
 *  keepOpen: 一个 Boolean 值，当传入 net.Socket 实例时可用。 当为 true 时，socket 在发送进程中保持打开。 默认为 false。
 * 
 *  callback是一个可选的参数，它在消息发送之后，子进程接收到数据之前被调用。这个函数调用的时候只有一个参数
 *  成功的时候为null，失败的时候是一个error对象。这个回调函数也可以看作和error事件的事件处理函数等价
 * 
 * 如果通道已经关闭，或者未发送的消息积压超过阈值的时候这个方法会返回false，否则会返回true。
 * calback参数可以用于实现流量控制
 */

//  发送一个server对象
const fork = require('child_process').fork
const net = require('net')

let MAX_CONNECTIONS = 10

function bindEvent(socket, server) {
    socket.setEncoding('utf8')
    socket.on('end', chunk => {
        if (chunk === 'end') {
            setImmediate(() => {
                console.log('server close')
                server.close()
            })
        }
    })
}

if (process.argv[2] === 'child') {
    process.on('message', (msg, server) => {
        if (msg === 'server') {
            process.send('Got')
            server.on('connection', socket => {
                socket.end('子进程处理')
                bindEvent(socket, server)
            })
        }
    })
} else {
    const child = fork(__filename, ['child'])

    const server = net.createServer()

    server.on('connection', socket => {
        socket.end('父进程处理')
        bindEvent(socket, server)
    })

    server.listen(1337, () => {
        child.send('server', server)
        child.on('message', msg => {
            if (msg === 'Got') {
                while (MAX_CONNECTIONS--) {
                    // 创建连接
                    const client = net.connect(server.address().port)
                    client.setEncoding('utf8')
                    client.on('data', chunk => {
                        console.log(`Got the message ${chunk}`)
                    })
                }
            }
        })
    })
}
// 发送一个socket对象
const fork = require('child_process').fork
const net = require('net')

if (process.argv[2] === 'child') {
    process.on('message', (msg, socket) => {
        if (msg === 'socket') {
            if (socket) {
                // 防止socket在被发送与被子进程接收这段时间内被关闭。
                socket.end('请求被子进程处理')
            }
        }
    })
} else {
    // 使用 `pauseOnConnect` 防止 socket 在被发送到子进程之前被读取。
    const server = net.createServer({ pauseOnConnect: true });
    const child = fork(__filename, ['child'])

    server.on('connection', (socket) => {
        child.send('socket', socket);
    })

    server.listen(1337, () => {
        const client = net.connect(server.address().port)
        client.setEncoding('utf8')
        client.on('data', chunk => {
            console.log(`Got the message ${chunk}`)
        })
    });
}
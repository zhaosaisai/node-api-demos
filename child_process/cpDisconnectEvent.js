/**
 * 当我们在父进程中调用subprocess.disconnect()或者在子进程中调用process.disconnect()
 * 方法，就会触发disconnect事件。当这个事件出发后，我们就不能在父子进程之间传递数据了。
 * 这个时候subprocess.connected属性会被设置为false
 */
const assert = require('assert')
const fork = require('child_process').fork
const net = require('net')

// 子进程
if (process.argv[2] === 'child') {
    const server = net.createServer()

    server.on('connection', socket => {
        socket.resume()

        process.on('disconnect', () => {
            socket.end(process.connected.toString())
        })

        socket.on('end', () => {
            server.close()
        })

        socket.write('ready')
    })

    server.on('listening', () => {
        process.send({
            port: server.address().port
        })
    })

    server.listen(0)
} else {
    const child = fork(__filename, ['child'])

    child.on('message', msg => {
        if (msg && msg.port) {
            const client = net.connect(msg.port)

            client.on('data', chunk => {
                if (chunk.toString() === 'ready') {
                    child.disconnect()
                } else {
                    console.log(`Got the end data ${chunk.toString()}`)
                }
            })
        }
    })

    child.on('disconnect', () => {
        console.log(`Child in parent ${child.connected}`)
    })

    child.on('exit', (code) => {
        console.log(`Child exited with code ${code}`)
    })
}
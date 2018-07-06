/**
 * 当工作进程调用listen方法后，server将触发listening事件。通过cluster上也会触发listening事件。
 * 这个事件的回调函数接收两个参数，第一个参数就是发生listening事件的工作进程worker，第二个就是address 包含了以下连接属性： address、port 和 addressType。当工作进程同时监听多个地址时，这些参数非常有用。
 */
const cluster = require('cluster')
const assert = require('assert')
const http = require('http')

if (cluster.isMaster) {
    const worker = cluster.fork()

    cluster.on('listening', (w, address) => {
        console.log('cluster is listening')
        assert.strictEqual(worker, w)
        assert.strictEqual(address.port, 8000)
    })
} else {
    const server = http.createServer()

    server.on('listening', () => {
        console.log('工作进程正在listening')
    })

    server.listen(8000)
}
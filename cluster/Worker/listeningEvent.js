/**
 * 当工作进程监听了端口的时候会触发这个事件
 */
const net = require('net')
const cluster = require('cluster')
const assert = require('assert')

if (cluster.isMaster) {
    const worker = cluster.fork()
    let port = null

    worker.on('listening', (address) => {
        console.log('worker is listening')
        assert(address.port)
        assert.strictEqual(typeof address.port, 'number')
        port = address.port
        process.nextTick(() => {
            worker.kill()
        })
    })

    cluster.on('listening', (worker, address) => {
        console.log('cluster is listening')
        assert(address.port)
        assert.strictEqual(typeof address.port, 'number')
        assert.strictEqual(address.port, port)
    })
} else {
    net.createServer().listen(0)
}
/**
 * 当工作进程通过IPC管道连接到工作进程的时候，这个方法返回true，否则返回false
 * 
 * 一旦工作进程创建后就会自动连接到它的主进程，当disconnect事件被触发的时候才会断开连接
 */
const cluster = require('cluster')
const assert = require('assert')

if (cluster.isMaster) {
    const worker = cluster.fork()
    assert.strictEqual(worker.isConnected(), true)

    worker.on('disconnect', () => {
        console.log('worker disconnect')
        assert.strictEqual(worker.isConnected(), false)
    })

    setTimeout(() => {
        worker.disconnect()
    }, 2000)
}
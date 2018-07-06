/**
 * cluster.worker
 * 这个属性是在主进程中获取对当前工作进程对象的引用。
 */
const cluster = require('cluster')
const assert = require('assert')

if (cluster.isMaster) {
    const worker = cluster.fork()

    worker.on('message', msg => {
        console.log(`收到消息 ${msg}`)
        assert.strictEqual(worker.id, msg)
    })
} else {
    process.send(cluster.worker.id)
}
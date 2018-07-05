/**
 * worker.isDead()
 * 当工作进程被终止的时候(包括自动退出或者发送信号),这个属性是true
 */
const cluster = require('cluster')
const assert = require('assert')

if (cluster.isMaster) {
    const worker = cluster.fork()
    assert.strictEqual(worker.isDead(), false)

    worker.on('disconnect', () => {
        console.log('worker disconnect')
    })

    worker.on('exit', () => {
        console.log('worker exited')
        assert.strictEqual(worker.isDead(), true)
    })
} else {
    setTimeout(() => {
        process.exit()
    }, 2000)
}
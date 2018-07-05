/**
 * 当我们调用kill或者disconnect方法的之前，这个方法的值是undefined
 * 
 * worker.exitedAfterDisconnect可以用于区分自发退出还是被动退出，
 * 主进程可以根据这个值决定是否重新衍生新的工作进程。
 */
const cluster = require('cluster')
const assert = require('assert')

if (cluster.isMaster) {
    const worker = cluster.fork()
    assert.strictEqual(worker.exitedAfterDisconnect, void 0);
    
    cluster.on('exit', (worker, code) => {
        assert.strictEqual(code, 0, `worker exited with code: ${code}, expected 0`)
    })

    worker.on('disconnect', () => {
        console.log(worker.exitedAfterDisconnect)
        assert.strictEqual(worker.exitedAfterDisconnect, false);
    })

    // 通过这种方式断开exitedAfterDisconnect的值为true。
    // worker.disconnect()

    return worker
} else {
    setTimeout(() => {
        // 通过这种方式断开exitedAfterDisconnect的值为false
        process.disconnect()
    }, 1000)
}
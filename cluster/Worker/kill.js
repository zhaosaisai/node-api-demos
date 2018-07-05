/**
 * worker.kill([SIGNAL])
 *  SIGNAL：被发送kill信号的工作进程的名称
 * 
 * 这个方法会kill工作进程。在主进程中，通过断开与worker.process的连接来实现。一旦断开连接
 * 后，将通过signal来杀死工作进程。在工作进程中，通过断开IPC管道来实现，然后以code为0退出。
 * 
 * 这个方法和worker.destroy()同义
 */
const assert = require('assert')
const cluster = require('cluster')
const http = require('http')

if (cluster.isMaster) {
    const worker = cluster.fork()
    const KILL_SIGNAL = 'SIGKILL'

    cluster.on('listening', () => {
        console.log('Cluster got the listening')
        process.nextTick(() => {
            worker.process.kill(KILL_SIGNAL)
        })
    })

    worker.on('disconnect', () => {
        console.log('Worker disconnected')
    })

    worker.on('exit', (code, signal) => {
        console.log('Worker exited')
        assert.strictEqual(signal, KILL_SIGNAL)
        process.exit(code)
    })

} else {
    const server = http.createServer()

    server.on('listening', () => {
        console.log('Worker is listening server')
    })

    server.listen(0)
}

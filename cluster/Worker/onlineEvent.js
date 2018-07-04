/**
 * worker进程一旦启动成功就会触发online事件
 */
const cluster = require('cluster')
const cpus = require('os').cpus()

if (cluster.isMaster) {
    for (let i = 0; i < cpus.length; i++) {
        const worker = cluster.fork()
        worker.on('online', () => {
            console.log(`${worker.process.pid} 已经启动成功`)
        })
        worker.on('exit', (code, signal) => {
            console.log(`${worker.process.pid} 退出`)
            console.log('正在启动...')
            cluster.fork()
        })
    }
} else {
    setTimeout(() => {
        process.exit(0)
    }, 2000)
}
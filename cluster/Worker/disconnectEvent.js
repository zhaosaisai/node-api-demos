/**
 * 监听worker的disconnect事件
 */

 const cluster = require('cluster')
 const cpus = require('os').cpus()

 if (cluster.isMaster) {
    //  主进程
    for (let i = 0; i < cpus.length; i++) {
        const worker = cluster.fork()

        worker.on('disconnect', () => {
            console.log(`工作进程${worker.process.pid}断开`)
        })
    }
 } else {
    //  工作进程
    console.log(`正在启动工作进程${process.pid}`)
    setTimeout(() => {
        cluster.worker.disconnect()
    }, 1000)
 }